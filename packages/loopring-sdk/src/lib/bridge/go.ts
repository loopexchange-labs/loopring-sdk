/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore
const encoder = new TextEncoder('utf-8');
const decoder = new TextDecoder('utf-8');
let logLine: number[] = [];

type Event = {
  id: unknown;
  this: unknown;
  args: IArguments;
  result?: unknown;
};

export type Instance = Omit<WebAssembly.Instance, 'exports'> & {
  exports: {
    memory: WebAssembly.Memory;
    _start: () => void;
    resume: () => void;
    go_scheduler: () => void;
  };
};

export class Go {
  private _callbackTimeouts: Map<number, any>;
  private _nextCallbackTimeoutID: number;
  private _resolveCallbackPromise?: () => void;
  private _resolveExitPromise!: () => void;

  private _inst!: Instance;

  public importObject: WebAssembly.Imports;

  private _values!: any[];
  private _goRefCounts!: number[];
  private _ids!: Map<any, number>;
  private _idPool!: number[];

  public exited!: boolean;

  private _pendingEvent?: Event;

  constructor() {
    this._callbackTimeouts = new Map();
    this._nextCallbackTimeoutID = 1;

    const mem = () => {
      // The buffer may change when requesting more memory.
      return new DataView(this._inst.exports.memory.buffer);
    };

    const setInt64 = (addr: number, v: number) => {
      mem().setUint32(addr + 0, v, true);
      mem().setUint32(addr + 4, Math.floor(v / 4294967296), true);
    };

    const getInt64 = (addr: number) => {
      const low = mem().getUint32(addr + 0, true);
      const high = mem().getInt32(addr + 4, true);
      return low + high * 4294967296;
    };

    const loadValue = (addr: number) => {
      const f = mem().getFloat64(addr, true);
      if (f === 0) {
        return undefined;
      }
      if (!isNaN(f)) {
        return f;
      }

      const id = mem().getUint32(addr, true);
      return this._values[id];
    };

    const storeValue = (addr: number, v: unknown) => {
      const nanHead = 0x7ff80000;

      if (typeof v === 'number') {
        if (isNaN(v)) {
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 0, true);
          return;
        }
        if (v === 0) {
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 1, true);
          return;
        }
        mem().setFloat64(addr, v, true);
        return;
      }

      switch (v) {
        case undefined:
          mem().setFloat64(addr, 0, true);
          return;
        case null:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 2, true);
          return;
        case true:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 3, true);
          return;
        case false:
          mem().setUint32(addr + 4, nanHead, true);
          mem().setUint32(addr, 4, true);
          return;
      }

      let id = this._ids.get(v);
      if (id === undefined) {
        id = this._idPool.pop();
        if (id === undefined) {
          id = this._values.length;
        }
        this._values[id] = v;
        this._goRefCounts[id] = 0;
        this._ids.set(v, id);
      }
      this._goRefCounts[id]++;
      let typeFlag = 1;
      switch (typeof v) {
        case 'string':
          typeFlag = 2;
          break;
        case 'symbol':
          typeFlag = 3;
          break;
        case 'function':
          typeFlag = 4;
          break;
      }
      mem().setUint32(addr + 4, nanHead | typeFlag, true);
      mem().setUint32(addr, id, true);
    };

    const loadSlice = (array: number, len: number, cap?: unknown) => {
      return new Uint8Array(this._inst.exports.memory.buffer, array, len);
    };

    const loadSliceOfValues = (array: number, len: number, cap?: unknown) => {
      const a = new Array(len);
      for (let i = 0; i < len; i++) {
        a[i] = loadValue(array + i * 8);
      }
      return a;
    };

    const loadString = (ptr: number, len: number) => {
      return decoder.decode(
        new DataView(this._inst.exports.memory.buffer, ptr, len)
      );
    };

    const timeOrigin = Date.now() - performance.now();
    this.importObject = {
      wasi_snapshot_preview1: {
        // https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md#fd_write
        fd_write: function (
          fd: number,
          iovs_ptr: number,
          iovs_len: number,
          nwritten_ptr: number
        ) {
          let nwritten = 0;
          if (fd == 1) {
            for (let iovs_i = 0; iovs_i < iovs_len; iovs_i++) {
              const iov_ptr = iovs_ptr + iovs_i * 8; // assuming wasm32
              const ptr = mem().getUint32(iov_ptr + 0, true);
              const len = mem().getUint32(iov_ptr + 4, true);
              nwritten += len;
              for (let i = 0; i < len; i++) {
                const c = mem().getUint8(ptr + i);
                if (c == 13) {
                  // CR
                  // ignore
                } else if (c == 10) {
                  // LF
                  // write line
                  const line = decoder.decode(new Uint8Array(logLine));
                  logLine = [];
                  console.log(line);
                } else {
                  logLine.push(c);
                }
              }
            }
          } else {
            console.error('invalid file descriptor:', fd);
          }
          mem().setUint32(nwritten_ptr, nwritten, true);
          return 0;
        },
        fd_close: () => 0, // dummy
        fd_fdstat_get: () => 0, // dummy
        fd_seek: () => 0, // dummy
        proc_exit: (code: number) => {
          if (typeof global !== 'undefined' && global.process) {
            // Node.js
            process.exit(code);
          } else {
            // Can't exit in a browser.
            throw 'trying to exit with code ' + code;
          }
        },
        random_get: (bufPtr: number, bufLen: number) => {
          crypto.getRandomValues(loadSlice(bufPtr, bufLen));
          return 0;
        },
      },
      env: {
        // func ticks() float64
        'runtime.ticks': () => {
          return timeOrigin + performance.now();
        },

        // func sleepTicks(timeout float64)
        'runtime.sleepTicks': (timeout: number) => {
          // Do not sleep, only reactivate scheduler after the given timeout.
          setTimeout(this._inst.exports.go_scheduler, timeout);
        },

        // func finalizeRef(v ref)
        'syscall/js.finalizeRef': (v_addr: number) => {
          // Note: TinyGo does not support finalizers so this is only called
          // for one specific case, by js.go:jsString.
          const id = mem().getUint32(v_addr, true);
          this._goRefCounts[id]--;
          if (this._goRefCounts[id] === 0) {
            const v = this._values[id];
            this._values[id] = null;
            this._ids.delete(v);
            this._idPool.push(id);
          }
        },

        // func stringVal(value string) ref
        'syscall/js.stringVal': (
          ret_ptr: number,
          value_ptr: number,
          value_len: number
        ) => {
          const s = loadString(value_ptr, value_len);
          storeValue(ret_ptr, s);
        },

        // func valueGet(v ref, p string) ref
        'syscall/js.valueGet': (
          retval: number,
          v_addr: number,
          p_ptr: number,
          p_len: number
        ) => {
          const prop = loadString(p_ptr, p_len);
          const value = loadValue(v_addr);
          const result = Reflect.get(value, prop);
          storeValue(retval, result);
        },

        // func valueSet(v ref, p string, x ref)
        'syscall/js.valueSet': (
          v_addr: number,
          p_ptr: number,
          p_len: number,
          x_addr: number
        ) => {
          const v = loadValue(v_addr);
          const p = loadString(p_ptr, p_len);
          const x = loadValue(x_addr);
          Reflect.set(v, p, x);
        },

        // func valueDelete(v ref, p string)
        'syscall/js.valueDelete': (
          v_addr: number,
          p_ptr: number,
          p_len: number
        ) => {
          const v = loadValue(v_addr);
          const p = loadString(p_ptr, p_len);
          Reflect.deleteProperty(v, p);
        },

        // func valueIndex(v ref, i int) ref
        'syscall/js.valueIndex': (
          ret_addr: number,
          v_addr: number,
          i: number
        ) => {
          storeValue(ret_addr, Reflect.get(loadValue(v_addr), i));
        },

        // valueSetIndex(v ref, i int, x ref)
        'syscall/js.valueSetIndex': (
          v_addr: number,
          i: number,
          x_addr: number
        ) => {
          Reflect.set(loadValue(v_addr), i, loadValue(x_addr));
        },

        // func valueCall(v ref, m string, args []ref) (ref, bool)
        'syscall/js.valueCall': (
          ret_addr: number,
          v_addr: number,
          m_ptr: number,
          m_len: number,
          args_ptr: number,
          args_len: number,
          args_cap: unknown
        ) => {
          const v = loadValue(v_addr);
          const name = loadString(m_ptr, m_len);
          const args = loadSliceOfValues(args_ptr, args_len, args_cap);
          try {
            const m = Reflect.get(v, name);
            storeValue(ret_addr, Reflect.apply(m, v, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },

        // func valueInvoke(v ref, args []ref) (ref, bool)
        'syscall/js.valueInvoke': (
          ret_addr: number,
          v_addr: number,
          args_ptr: number,
          args_len: number,
          args_cap: number
        ) => {
          try {
            const v = loadValue(v_addr);
            const args = loadSliceOfValues(args_ptr, args_len, args_cap);
            storeValue(ret_addr, Reflect.apply(v, undefined, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },

        // func valueNew(v ref, args []ref) (ref, bool)
        'syscall/js.valueNew': (
          ret_addr: number,
          v_addr: number,
          args_ptr: number,
          args_len: number,
          args_cap: number
        ) => {
          const v = loadValue(v_addr);
          const args = loadSliceOfValues(args_ptr, args_len, args_cap);
          try {
            storeValue(ret_addr, Reflect.construct(v, args));
            mem().setUint8(ret_addr + 8, 1);
          } catch (err) {
            storeValue(ret_addr, err);
            mem().setUint8(ret_addr + 8, 0);
          }
        },

        // func valueLength(v ref) int
        'syscall/js.valueLength': (v_addr: number) => {
          return loadValue(v_addr).length;
        },

        // valuePrepareString(v ref) (ref, int)
        'syscall/js.valuePrepareString': (ret_addr: number, v_addr: number) => {
          const s = String(loadValue(v_addr));
          const str = encoder.encode(s);
          storeValue(ret_addr, str);
          setInt64(ret_addr + 8, str.length);
        },

        // valueLoadString(v ref, b []byte)
        'syscall/js.valueLoadString': (
          v_addr: number,
          slice_ptr: number,
          slice_len: number,
          slice_cap: unknown
        ) => {
          const str = loadValue(v_addr);
          loadSlice(slice_ptr, slice_len, slice_cap).set(str);
        },

        // func valueInstanceOf(v ref, t ref) bool
        'syscall/js.valueInstanceOf': (v_addr: number, t_addr: number) => {
          return loadValue(v_addr) instanceof loadValue(t_addr);
        },

        // func copyBytesToGo(dst []byte, src ref) (int, bool)
        'syscall/js.copyBytesToGo': (
          ret_addr: number,
          dest_addr: number,
          dest_len: number,
          dest_cap: unknown,
          source_addr: number
        ) => {
          const num_bytes_copied_addr = ret_addr;
          const returned_status_addr = ret_addr + 4; // Address of returned boolean status variable

          const dst = loadSlice(dest_addr, dest_len);
          const src = loadValue(source_addr);
          if (
            !(src instanceof Uint8Array || src instanceof Uint8ClampedArray)
          ) {
            mem().setUint8(returned_status_addr, 0); // Return "not ok" status
            return;
          }
          const toCopy = src.subarray(0, dst.length);
          dst.set(toCopy);
          setInt64(num_bytes_copied_addr, toCopy.length);
          mem().setUint8(returned_status_addr, 1); // Return "ok" status
        },

        // copyBytesToJS(dst ref, src []byte) (int, bool)
        // Originally copied from upstream Go project, then modified:
        //   https://github.com/golang/go/blob/3f995c3f3b43033013013e6c7ccc93a9b1411ca9/misc/wasm/wasm_exec.js#L404-L416
        'syscall/js.copyBytesToJS': (
          ret_addr: number,
          dest_addr: number,
          source_addr: number,
          source_len: number,
          source_cap: unknown
        ) => {
          const num_bytes_copied_addr = ret_addr;
          const returned_status_addr = ret_addr + 4; // Address of returned boolean status variable

          const dst = loadValue(dest_addr);
          const src = loadSlice(source_addr, source_len);
          if (
            !(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)
          ) {
            mem().setUint8(returned_status_addr, 0); // Return "not ok" status
            return;
          }
          const toCopy = src.subarray(0, dst.length);
          dst.set(toCopy);
          setInt64(num_bytes_copied_addr, toCopy.length);
          mem().setUint8(returned_status_addr, 1); // Return "ok" status
        },
      },
    };
  }

  async run(instance: Instance, globalRef: unknown) {
    this._inst = instance;
    this._values = [
      // JS values that Go currently has references to, indexed by reference id
      NaN,
      0,
      null,
      true,
      false,
      globalRef,
      this,
    ];
    this._goRefCounts = []; // number of references that Go has to a JS value, indexed by reference id
    this._ids = new Map(); // mapping from JS values to reference ids
    this._idPool = []; // unused ids that have been garbage collected
    this.exited = false; // whether the Go program has exited

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mem = new DataView(this._inst.exports.memory.buffer);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const callbackPromise = new Promise((resolve) => {
        this._resolveCallbackPromise = () => {
          if (this.exited) {
            throw new Error('bad callback: Go program has already exited');
          }
          setTimeout(resolve, 0); // make sure it is asynchronous
        };
      });
      this._inst.exports._start();
      if (this.exited) {
        break;
      }
      await callbackPromise;
    }
  }

  _resume() {
    if (this.exited) {
      throw new Error('Go program has already exited');
    }
    this._inst.exports.resume();
    if (this.exited) {
      this._resolveExitPromise();
    }
  }

  _makeFuncWrapper(id: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const go = this;
    return function () {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      const event: Event = { id: id, this: this, args: arguments };
      go._pendingEvent = event;
      go._resume();
      return event.result;
    };
  }
}

export default Go;
