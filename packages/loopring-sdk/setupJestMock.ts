/* eslint-disable @typescript-eslint/no-var-requires */

import 'whatwg-fetch';

if (!global.TextEncoder) {
  global.TextEncoder = require('util').TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = require('util').TextDecoder;
}

jest.mock('./src/lib/bridge/instantiateWasm', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: async (go: any) => {
      const fs = require('fs');
      const path = require('path');
      const wasmBuffer = fs.readFileSync(
        path.resolve(
          __dirname,
          '../../dist/packages/loopring-wasm/wasm-release.wasm'
        )
      );
      const obj = await WebAssembly.instantiate(wasmBuffer, go.importObject);

      return obj.instance;
    },
  };
});
