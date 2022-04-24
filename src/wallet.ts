import { Buffer } from 'buffer';

import type * as wasm from '@emurgo/cardano-serialization-lib-browser';
import type { CIP30Wallet, CIP30WalletAPI } from '../types/wallet.types';

class Wallet {
  s11nLib: typeof wasm;
  wallet: CIP30Wallet;
  walletApi?: CIP30WalletAPI;

  constructor(serilizationLib: typeof wasm, wallet: CIP30Wallet) {
    this.wallet = wallet;
    this.s11nLib = serilizationLib;
  }

  async isInstalled() {
    return !!this.wallet;
  }

  async isEnabled() {
    return await this.wallet.isEnabled();
  }

  async enable() {
    this.walletApi = await this.wallet.enable();
    return this.walletApi;
  }

  async getHexAddress() {
    if (!this.walletApi) {
      throw new Error('Not connected');
    }

    const [addressCbor] = await this.walletApi.getUsedAddresses();
    return Buffer.from(addressCbor, 'hex');
  }

  async getAddress() {
    if (!this.walletApi) {
      throw new Error('Not connected');
    }

    const addressHex = await this.getHexAddress();
    const address = this.s11nLib.BaseAddress.from_address(
      this.s11nLib.Address.from_bytes(addressHex),
    )
      ?.to_address()
      .to_bech32();

    return address;
  }

  async getNetworkId() {
    if (!this.walletApi) {
      throw new Error('Not connected');
    }

    const id = await this.walletApi.getNetworkId();
    return {
      id,
      network: id === 1 ? 'mainnet' : 'testnet',
    };
  }

  getValue(valueCbor: string) {
    return this.s11nLib.Value.from_bytes(Buffer.from(valueCbor, 'hex'));
  }
}

export default Wallet;
