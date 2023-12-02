import { OffchainNFTFeeReqType } from '../constants';
import {
  Configuration,
  FetchError,
  NftApi,
  NftDataInfo,
  NftDataInfoToJSON,
  OffchainFeeInfo,
  OffchainFeeInfoToJSON,
  UserNftBalancesInfo,
  UserNftBalancesInfoToJSON,
} from '../openapi';
import { NftAPI } from './nft';

const fetchApi = jest.fn();

export class AccountAPIMock extends NftAPI {
  constructor() {
    super('http://localhost');
    this.api = new NftApi(
      new Configuration({
        basePath: 'http://localhost',
        fetchApi,
      })
    );
  }
}

describe('getUserNftBalances', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: UserNftBalancesInfo = {
      totalNum: 11,
      data: [
        {
          id: 2543512,
          accountId: 245463,
          tokenId: 32778,
          nftData:
            '0x172aa7cb6a0ae2c29c754cff24eff7eafdc2ac3c744020e74c076218a18440e1',
          tokenAddress: '0x1cACC96e5F01e2849E6036F25531A9A064D2FB5f',
          nftId:
            '0x0134afd6000000000000000002386f26fc100000000000000000000000000168',
          nftType: 'ERC1155',
          total: '1',
          locked: '0',
          pending: {
            withdraw: '0',
            deposit: '0',
          },
          deploymentStatus: 'NOT_DEPLOYED',
          isCounterFactualNFT: false,
          metadata: {
            uri: 'ipfs://Qma2txD7Y52RKCTx4NxA2AaKd7jp9eGzeLi1rfuzfckTh2/545402470991017492411372771258622510532290436671693912484879107909885100392/2_2/metadata.json',
            base: {
              name: 'Loophead #5360',
              decimals: -1,
              description:
                'Loopheads is a Loopring &apos;Moody Brains&apos; NFT collection',
              image:
                'ipfs://QmVaNLiFBQnB6XrJwkMhxkqkQk8C7x24cV9yuFfkMMtSjo/loophead59_300_2_2.png',
              properties: '',
              localization: '',
              createdAt: 1684097156354,
              updatedAt: 1684097158062,
            },
            imageSize: {
              _240240:
                'https://d2y691019xyzhi.cloudfront.net/04e524708414d93ba46406369918206085b1131d0a50542fe0997c006f3619db1684097156774-240-240.png',
              _332332:
                'https://d2y691019xyzhi.cloudfront.net/04e524708414d93ba46406369918206085b1131d0a50542fe0997c006f3619db1684097156774-332-332.png',
              original:
                'https://d2y691019xyzhi.cloudfront.net/04e524708414d93ba46406369918206085b1131d0a50542fe0997c006f3619db1684097156774-original.png',
            },
            extra: {
              imageData: '',
              externalUrl: '',
              attributes:
                '[{"trait_type":"Ticker","value":"LRC"},{"trait_type":"Designer","value":"Storymorpha &lt;farkhanamin7@gmail.com&gt;"},{"trait_type":"Minter","value":"Loopring"}]',
              backgroundColor: '',
              animationUrl: '',
              youtubeUrl: '',
              minter: '',
            },
            status: 1,
            nftType: 1,
            network: 0,
            tokenAddress: '0x1cACC96e5F01e2849E6036F25531A9A064D2FB5f',
            nftId:
              '0x545402470991017492411372771258622510532290436671693912484879107909885100392',
          },
          minter: '0x88f8Dbd3dC44c6E2e368258D3eee8EB9A07aF191',
          royaltyPercentage: 0,
          preference: {
            favourite: false,
            hide: false,
          },
          collectionInfo: {
            id: 4537,
            owner: '0x88f8Dbd3dC44c6E2e368258D3eee8EB9A07aF191',
            name: 'Moody Brains',
            contractAddress: '0x1cacc96e5f01e2849e6036f25531a9a064d2fb5f',
            collectionAddress:
              'ipfs://QmeqGqDhuo2MoDc5z8GEFUxFvh5QCygMjd75ApVrm6gDTF',
            baseUri: '',
            nftFactory: '',
            description:
              ' Loopheads are not an art collection, rather they represent a way of life on L2. Like many crypto investors, their moods and appearances change frequently based on market prices. Line go up? Check price, bad price? One look at Loopheads and you&apos;ll know the answer.\n\nMoody Brains is the 1st collection in this series. Their brain size and environment changes as the price of LRC fluctuates in the market. Their IQs have been known to change rapidly. In one moment they&apos;re writing ZK circuits to scale Ethereum and the next, they&apos;re shilling sidechains. The lower the price of $LRC, the smaller their brain gets.',
            avatar: 'ipfs://QmccVpvUdR9yy7C74FQC8bSfu7PyfBSeqxoNbUv9hUSNbC',
            banner: 'ipfs://QmXAdn96EuuiW4efqi2AKtFUhArjxLU542DZVSasbxMex9',
            thumbnail: 'ipfs://QmRF5zcMt4BxkzygchBvfNbjfYgJHBtLuZufsXsANwk1Ts',
            tileUri: 'ipfs://QmRF5zcMt4BxkzygchBvfNbjfYgJHBtLuZufsXsANwk1Ts',
            cached: {
              avatar:
                'https://d2y691019xyzhi.cloudfront.net/ceacb00ba08b764d90a985946196dac077ef9f0576f10680427c0c031d6c013d-original',
              banner:
                'https://d2y691019xyzhi.cloudfront.net/9c74af6244f0d030a4c8ed6db938031c0e0c401fa4cef6f7c4c0205fca2571b1-original',
              tileUri:
                'https://d2y691019xyzhi.cloudfront.net/6cc8dadc4acd1398b1625b1d5b65a9cb9b09bea171e8687e1c0502b66e35f4a7-original',
              thumbnail:
                'https://d2y691019xyzhi.cloudfront.net/6cc8dadc4acd1398b1625b1d5b65a9cb9b09bea171e8687e1c0502b66e35f4a7-original',
            },
            deployStatus: 'NOT_DEPLOYED',
            nftType: 'ERC1155',
            times: {
              createdAt: 1671108128594,
              updatedAt: 1689166688143,
            },
            extra: {
              properties: {
                isLegacy: false,
                isPublic: false,
                isCounterFactualNFT: true,
                isMintable: false,
                isEditable: false,
                isDeletable: false,
              },
              mintChannel: 'UNKNOWN_CHANNEL',
            },
          },
          updatedAt: 1684097159571,
          balanceUpdatedAt: 1684097159571,
        },
      ],
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(UserNftBalancesInfoToJSON(data)), {
        status: 200,
      })
    );

    await expect(
      api.getUserNftBalances('someApiKey', { accountId: 1234 })
    ).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/balances?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });

  it('not found', async () => {
    const api = new AccountAPIMock();

    const data = {
      resultInfo: {
        code: 104007,
        message: 'Invalid accountId',
      },
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 400 })
    );

    await expect(
      api.getUserNftBalances('someApiKey', { accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/balances?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });

  it('internal error', async () => {
    const api = new AccountAPIMock();

    fetchApi.mockRejectedValueOnce(
      new FetchError(new Error(), 'request failed')
    );

    await expect(
      api.getUserNftBalances('someApiKey', { accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/balances?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });
});

describe('getNFTOffchainFee', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: OffchainFeeInfo = {
      gasPrice: '59677783480',
      fees: [
        {
          token: 'ETH',
          tokenId: 0,
          fee: '41800000000000',
          discount: 1,
        },
        {
          token: 'LRC',
          tokenId: 1,
          fee: '397000000000000000',
          discount: 1,
        },
        {
          token: 'USDT',
          tokenId: 3,
          fee: '86300',
          discount: 1,
        },
        {
          token: 'DAI',
          tokenId: 5,
          fee: '86300000000000000',
          discount: 1,
        },
        {
          token: 'USDC',
          tokenId: 6,
          fee: '86300',
          discount: 1,
        },
      ],
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(OffchainFeeInfoToJSON(data)), {
        status: 200,
      })
    );

    await expect(
      api.getNFTOffchainFee('someApiKey', {
        accountId: 1234,
        requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
      })
    ).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/offchainFee?accountId=1234&requestType=11',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });

  it('not found', async () => {
    const api = new AccountAPIMock();

    const data = {
      resultInfo: {
        code: 104007,
        message: 'Invalid accountId',
      },
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 400 })
    );

    await expect(
      api.getNFTOffchainFee('someApiKey', {
        accountId: 1234,
        requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
        deployInWithdraw: true,
        tokenAddress: '0x1234',
      })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/offchainFee?accountId=1234&requestType=11&tokenAddress=0x1234&deployInWithdraw=true',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });

  it('internal error', async () => {
    const api = new AccountAPIMock();

    fetchApi.mockRejectedValueOnce(
      new FetchError(new Error(), 'request failed')
    );

    await expect(
      api.getNFTOffchainFee('someApiKey', {
        accountId: 1234,
        requestType: OffchainNFTFeeReqType.NFT_TRANSFER,
      })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/user/nft/offchainFee?accountId=1234&requestType=11',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-KEY': 'someApiKey',
        },
        method: 'GET',
      }
    );
  });

  describe('getNftData', () => {
    afterEach(() => {
      fetchApi.mockReset();
    });

    it('success', async () => {
      const api = new AccountAPIMock();

      const data: NftDataInfo = {
        nftData:
          '0x0e9e600dab82794168edc773cc99efe580b4b928f20b5691d30b9b25a1bad01e',
        minter: '0x83fcF5241eD5795b8f07C503C25B4c4481928348',
        nftType: 'ERC1155',
        tokenAddress: '0xced2e00488dbcafcb93849f44e9af474ae5b81cb',
        nftId:
          '0x0cd579aee8d306a1ca281c244ecd27309e5b388fbe60a044ed8a308ca4da426b',
        royaltyPercentage: 10,
        originalRoyaltyPercentage: 10,
        status: true,
        nftFactory: '0x97BE94250AEF1Df307749aFAeD27f9bc8aB911db',
        nftOwner: '0x83fcF5241eD5795b8f07C503C25B4c4481928348',
        nftBaseUri:
          'ipfs://0x7d2865e615b9242689ad01f787df0d84de24944ea635d88b77ae54c710ab565e',
        royaltyAddress: '0x83fcF5241eD5795b8f07C503C25B4c4481928348',
        originalMinter: '0x83fcF5241eD5795b8f07C503C25B4c4481928348',
        createdAt: 1700775842277,
      };

      fetchApi.mockResolvedValueOnce(
        new Response(JSON.stringify(NftDataInfoToJSON(data)), {
          status: 200,
        })
      );

      await expect(
        api.getNftData('someApiKey', {
          minter: '0x1',
          tokenAddress: '0x2',
          nftId: '0x3',
        })
      ).resolves.toEqual(data);

      expect(fetchApi).toHaveBeenCalledTimes(1);
      expect(fetchApi).toBeCalledWith(
        'http://localhost/api/v3/nft/info/nftData?minter=0x1&tokenAddress=0x2&nftId=0x3',
        {
          body: undefined,
          credentials: undefined,
          headers: {
            'X-API-KEY': 'someApiKey',
          },
          method: 'GET',
        }
      );
    });

    it('not found', async () => {
      const api = new AccountAPIMock();

      const data = {
        resultInfo: {
          code: 108002,
          message:
            'ErrorException(ERR_NFT_METADATA_NOT_EXISTS: nft not exists)',
        },
      };

      fetchApi.mockResolvedValueOnce(
        new Response(JSON.stringify(data), { status: 400 })
      );

      await expect(
        api.getNftData('someApiKey', {
          minter: '0x1',
          tokenAddress: '0x2',
          nftId: '0x3',
        })
      ).rejects.toThrowError();

      expect(fetchApi).toHaveBeenCalledTimes(1);
      expect(fetchApi).toBeCalledWith(
        'http://localhost/api/v3/nft/info/nftData?minter=0x1&tokenAddress=0x2&nftId=0x3',
        {
          body: undefined,
          credentials: undefined,
          headers: {
            'X-API-KEY': 'someApiKey',
          },
          method: 'GET',
        }
      );
    });

    it('internal error', async () => {
      const api = new AccountAPIMock();

      fetchApi.mockRejectedValueOnce(
        new FetchError(new Error(), 'request failed')
      );

      await expect(
        api.getNftData('someApiKey', {
          minter: '0x1',
          tokenAddress: '0x2',
          nftId: '0x3',
        })
      ).rejects.toThrowError();

      expect(fetchApi).toHaveBeenCalledTimes(1);
      expect(fetchApi).toBeCalledWith(
        'http://localhost/api/v3/nft/info/nftData?minter=0x1&tokenAddress=0x2&nftId=0x3',
        {
          body: undefined,
          credentials: undefined,
          headers: {
            'X-API-KEY': 'someApiKey',
          },
          method: 'GET',
        }
      );
    });
  });
});
