/* eslint-disable prefer-spread, no-async-promise-executor */

// Initially, the __go_wasm__ object will be an empty object.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var __go_wasm__: any | undefined;
}

import Go from './go';
import instantiateWasm from './instantiateWasm';

let globalObject: typeof globalThis;

// Check if globalThis is defined (modern environments)
if (typeof globalThis !== 'undefined') {
  globalObject = globalThis;
}
// Check if window is defined (browser environment)
else if (typeof window !== 'undefined') {
  globalObject = window;
}
// Check if self is defined (web workers)
else if (typeof self !== 'undefined') {
  globalObject = self;
}
// Fallback to global (Node.js environment)
else if (typeof global !== 'undefined') {
  globalObject = global;
} else {
  throw new Error(
    'cannot export Go (neither globalThis, global, window nor self is defined)'
  );
}

if (!globalObject.__go_wasm__) {
  globalObject.__go_wasm__ = {};
}

/**
 * The maximum amount of time that we would expect Wasm to take to initialize.
 * If it doesn't initialize after this time, we send a warning to console.
 * Most likely something has gone wrong if it takes more than 3 seconds to initialize.
 */
const maxTime = 3 * 1000;

/**
 * bridge is an easier way to refer to the Go WASM object.
 */
const bridge = globalObject.__go_wasm__;

/**
 * Wrapper is used by Go to run all Go functions in JS.
 *
 * @param {Function} goFunc a function that is expected to return an object of the following specification:
 * {
 *  result:  undefined | any         // undefined when error is returned, or function returns undefined.
 *  error:       Error | undefined   // undefined when no error is present.
 * }
 *
 * @returns {Function} returns a function that take arguments which are used to call the Go function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapper(goFunc: any) {
  return (...args: unknown[]) => {
    const result = goFunc.apply(undefined, args);
    if (result.error instanceof Error) {
      throw result.error;
    }
    return result.result;
  };
}

/**
 * Sleep is used when awaiting for Go Wasm to initialize.
 * It uses the lowest possible sane delay time (via requestAnimationFrame).
 * However, if the window is not focused, requestAnimationFrame never returns.
 * A timeout will ensure to be called after 50 ms, regardless of whether or not the tab is in focus.
 *
 * @returns {Promise} an always-resolving promise when a tick has been completed.
 */
function sleep() {
  return new Promise<void>((res) => {
    requestAnimationFrame(() => res());
    setTimeout(() => {
      res();
    }, 50);
  });
}

/**
 * @param {ArrayBuffer} getBytes a promise that is bytes of the Go Wasm object.
 *
 * @returns {Proxy} an object that can be used to call WASM's objects and properly parse their results.
 *
 * All values that want to be retrieved from the proxy, regardless of if they are a function or not, must be retrieved
 * as if they are from a function call.
 *
 * If a non-function value is returned however arguments are provided, a warning will be printed.
 */
export default function () {
  let go: Go;

  async function init() {
    bridge.__wrapper__ = wrapper;

    go = new Go();

    const wasm = await instantiateWasm(go);

    go.run(wasm, globalObject);
  }

  init();
  setTimeout(() => {
    if (bridge.__ready__ !== true) {
      console.warn(
        'Golang WASM Bridge (__go_wasm__.__ready__) still not true after max time'
      );
    }
  }, maxTime);

  const proxy = new Proxy(
    {},
    {
      get: (_, key) => {
        return (...args: unknown[]) => {
          return new Promise(async (res, rej) => {
            if (!go || go.exited) {
              return rej(new Error('The Go instance is not active.'));
            }
            while (bridge.__ready__ !== true) {
              await sleep();
            }

            if (typeof bridge[key] !== 'function') {
              res(bridge[key]);

              if (args.length !== 0) {
                console.warn(
                  'Retrieved value from WASM returned function type, however called with arguments.'
                );
              }
              return;
            }

            try {
              res(bridge[key].apply(undefined, args));
            } catch (e) {
              rej(e);
            }
          });
        };
      },
    }
  );

  bridge.__proxy__ = proxy;
  return proxy;
}
