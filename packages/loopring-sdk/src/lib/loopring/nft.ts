import { Configuration, GetUserNftBalancesRequest, NftApi } from '../openapi';

export class NftAPI {
  // private baseUrl: string;
  protected api: NftApi;

  constructor(baseUrl: string) {
    // this.baseUrl = baseUrl;
    this.api = new NftApi(
      new Configuration({
        basePath: baseUrl,
      })
    );
  }

  async getUserNftBalances(
    apiKey: string,
    requestParameters: Omit<GetUserNftBalancesRequest, 'xAPIKEY'>
  ) {
    return this.api.getUserNftBalances({
      ...requestParameters,
      xAPIKEY: apiKey,
    });
  }
}
