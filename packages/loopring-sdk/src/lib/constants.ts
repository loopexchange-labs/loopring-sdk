export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const LoopringExchangeAddress: { [index in ChainId]: string } = {
  [ChainId.MAINNET]: '0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4',
  [ChainId.GOERLI]: '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e',
};

export function isLoopringChain(chainId: number): chainId is ChainId {
  // eslint-disable-next-line no-prototype-builtins
  return LoopringExchangeAddress.hasOwnProperty(chainId);
}

export const KEY_MESSAGE =
  // eslint-disable-next-line no-template-curly-in-string
  'Sign this message to access Loopring Exchange: ' +
  '${exchangeAddress}' +
  ' with key nonce: ' +
  '${nonce}';

export const getBaseUrlByChainId = (id: ChainId) => {
  if (id === ChainId.MAINNET) {
    return 'https://api3.loopring.io';
  }

  return 'https://uat2.loopring.io';
};
