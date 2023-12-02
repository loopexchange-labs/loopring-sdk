import {
  Configuration,
  GetNFTOffchainFeeRequest,
  GetNftDataRequest,
  GetUserNftBalancesRequest,
  NftApi,
} from '../openapi';

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

  async getNFTOffchainFee(
    apiKey: string,
    requestParameters: Omit<GetNFTOffchainFeeRequest, 'xAPIKEY'>
  ) {
    return this.api.getNFTOffchainFee({
      ...requestParameters,
      xAPIKEY: apiKey,
    });
  }

  async getNftData(
    apiKey: string,
    requestParameters: Omit<GetNftDataRequest, 'xAPIKEY'>
  ) {
    return this.api.getNftData({
      ...requestParameters,
      xAPIKEY: apiKey,
    });
  }
}
