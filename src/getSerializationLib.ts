import type * as wasm from '@emurgo/cardano-serialization-lib-browser';

let _wasm: typeof wasm;

const getSerializationLib = async () => {
  if (!_wasm) {
    _wasm = await import('@emurgo/cardano-serialization-lib-browser');
  }

  return _wasm;
};

export default getSerializationLib;
