import { AccountAPI } from './loopring/account';
import { ChainId, getBaseUrlByChainId } from './constants';
import { NftAPI } from './loopring/nft';
import { WalletAPI } from './loopring/wallet';

export class LoopringAPI {
  private baseUrl: string;

  public accountApi: AccountAPI;
  public nftApi: NftAPI;
  public walletApi: WalletAPI;

  constructor(chainId: ChainId) {
    this.baseUrl = getBaseUrlByChainId(chainId);
    this.accountApi = new AccountAPI(this.baseUrl);
    this.nftApi = new NftAPI(this.baseUrl);
    this.walletApi = new WalletAPI(this.baseUrl);
  }
}

export default LoopringAPI;
