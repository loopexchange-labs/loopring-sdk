/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// @ts-nocheck
// eslint-disable-next-line @nx/enforce-module-boundaries
import wasmfile from '../../../../../dist/packages/loopring-wasm/wasm-release.wasm?url';

export default async function (go: any) {
  let wasm;
  if ('instantiateStreaming' in WebAssembly) {
    const obj = await WebAssembly.instantiateStreaming(
      fetch(wasmfile),
      go.importObject
    );
    wasm = obj.instance;
  } else {
    const resp = await fetch(wasmfile);
    const bytes = resp.arrayBuffer();
    wasm = await WebAssembly.instantiate(bytes, go.importObject);
  }

  return wasm;
}
