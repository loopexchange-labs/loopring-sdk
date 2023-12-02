import { makeRequestParamStr, signRequest } from '../bridge/signature';
import {
  AccountApi,
  AccountInfo,
  Configuration,
  CounterfactualWalletInfo,
  GetAccountRequest,
  GetCounterFactualInfoRequest,
  GetNextStorageIdRequest,
  GetUserApiKeyRequest,
  UserApiKey,
} from '../openapi';

export class AccountAPI {
  private baseUrl: string;
  protected api: AccountApi;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.api = new AccountApi(
      new Configuration({
        basePath: baseUrl,
      })
    );
  }

  async getAccount(
    requestParameters: GetAccountRequest = {}
  ): Promise<AccountInfo> {
    return this.api.getAccount(requestParameters);
  }

  async getCounterFactualInfo(
    requestParameters: GetCounterFactualInfoRequest
  ): Promise<CounterfactualWalletInfo> {
    return this.api.getCounterFactualInfo(requestParameters);
  }

  async getUserApiKey(
    privateKey: string,
    requestParameters: Omit<GetUserApiKeyRequest, 'xAPISIG'>
  ): Promise<UserApiKey> {
    const dataToSig: Map<string, string | number> = new Map();

    dataToSig.set('accountId', requestParameters.accountId);

    const sig = await signRequest(
      privateKey,
      'GET',
      this.baseUrl,
      '/api/v3/apiKey',
      makeRequestParamStr(dataToSig)
    );

    return this.api.getUserApiKey({
      ...requestParameters,
      xAPISIG: sig,
    });
  }

  async getNextStorageId(
    apiKey: string,
    requestParameters: Omit<GetNextStorageIdRequest, 'xAPIKEY'>
  ) {
    return this.api.getNextStorageId({
      ...requestParameters,
      xAPIKEY: apiKey,
    });
  }
}
