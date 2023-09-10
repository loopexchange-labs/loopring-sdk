import {
  Configuration,
  ResolveNameInfo,
  ResolveNameRequest,
  WalletApi,
} from '../openapi';

export class WalletAPI {
  protected api: WalletApi;

  constructor(baseUrl: string) {
    this.api = new WalletApi(
      new Configuration({
        basePath: baseUrl,
      })
    );
  }

  async resolveName(
    requestParameters: ResolveNameRequest
  ): Promise<ResolveNameInfo> {
    return this.api.resolveName(requestParameters);
  }
}
