type Paginate = {
  page: number,
  limit: number,
};

type DataSignature = {
  signature: string,
  key: string,
};

export type CIP30WalletAPI = {
  getNetworkId: () => Promise<number>,
  getUtxos: (amount?: string, paginate?: Paginate) => Promise<Array<string> | undefined>,
  getCollateral: (params: { amount: string }) => Promise<string | null>,
  getBalance: () => Promise<string>,
  getUsedAddresses: (paginate?: Paginate) => Promise<string[]>,
  getUnusedAddresses: () => Promise<Array<string>>,
  getChangeAddress: () => Promise<string>,
  getRewardAddresses: () => Promise<Array<string>>,
  signTx: (tx: string, partialSign: boolean) => Promise<string>,
  signData: (addr: string, payload: string) => Promise<DataSignature>,
  submitTx: (tx: string) => Promise<string>,
};

export type CIP30Wallet = {
  enable: () => Promise<CIP30WalletAPI>,
  isEnabled: () => Promise<boolean>,
  apiVersion: string,
  name: string,
  icon: string,
};
