import {
  AccountInfo,
  Configuration,
  CounterfactualWalletInfo,
  DefaultApi,
  GetAccountRequest,
  GetCounterFactualInfoRequest,
  GetUserApiKeyRequest,
  GetUserNftBalancesRequest,
  ResolveNameInfo,
  ResolveNameRequest,
  UserApiKey,
} from './openapi';
import { makeRequestParamStr, signRequest } from './signature';

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

const getBaseUrlByChainId = (id: ChainId) => {
  if (id === ChainId.MAINNET) {
    return 'https://api3.loopring.io';
  }

  return 'https://uat2.loopring.io';
};

export class LoopringAPI {
  private baseUrl: string;
  protected defaultApi: DefaultApi;

  constructor(chainId: ChainId) {
    this.baseUrl = getBaseUrlByChainId(chainId);
    this.defaultApi = new DefaultApi(
      new Configuration({
        basePath: this.baseUrl,
      })
    );
  }

  async getAccount(
    requestParameters: GetAccountRequest = {}
  ): Promise<AccountInfo> {
    return this.defaultApi.getAccount(requestParameters);
  }

  async getCounterFactualInfo(
    requestParameters: GetCounterFactualInfoRequest
  ): Promise<CounterfactualWalletInfo> {
    return this.defaultApi.getCounterFactualInfo(requestParameters);
  }

  async getUserApiKey(
    privateKey: string,
    requestParameters: Omit<GetUserApiKeyRequest, 'xAPISIG'>
  ): Promise<UserApiKey> {
    const dataToSig: Map<string, any> = new Map();

    dataToSig.set('accountId', requestParameters.accountId);

    const sig = await signRequest(
      privateKey,
      'GET',
      this.baseUrl,
      '/api/v3/apiKey',
      makeRequestParamStr(dataToSig)
    );

    return this.defaultApi.getUserApiKey({
      ...requestParameters,
      xAPISIG: sig,
    });
  }

  async getUserNftBalances(
    apiKey: string,
    requestParameters: Omit<GetUserNftBalancesRequest, 'xAPIKEY'>
  ) {
    return this.defaultApi.getUserNftBalances({
      ...requestParameters,
      xAPIKEY: apiKey,
    });
  }

  async resolveName(
    requestParameters: ResolveNameRequest
  ): Promise<ResolveNameInfo> {
    return this.defaultApi.resolveName(requestParameters);
  }
}
