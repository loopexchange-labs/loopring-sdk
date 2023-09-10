/* eslint-disable @typescript-eslint/no-var-requires */

jest.mock('./src/lib/instantiateWasm', () => {
  return {
    __esModule: true,
    default: async (go: any) => {
      const fs = require('fs');
      const path = require('path');
      const wasmBuffer = fs.readFileSync(
        path.resolve(__dirname, './src/lib/wasm-release.wasm')
      );
      const obj = await WebAssembly.instantiate(wasmBuffer, go.importObject);

      return obj.instance;
    },
  };
});
