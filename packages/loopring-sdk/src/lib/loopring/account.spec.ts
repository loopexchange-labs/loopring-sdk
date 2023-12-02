import {
  AccountApi,
  AccountInfo,
  Configuration,
  CounterfactualWalletInfo,
  FetchError,
  NextStorageIdInfo,
  NextStorageIdInfoToJSON,
  UserApiKey,
} from '../openapi';
import { AccountAPI } from './account';

const fetchApi = jest.fn();

export class AccountAPIMock extends AccountAPI {
  constructor() {
    super('http://localhost');
    this.api = new AccountApi(
      new Configuration({
        basePath: 'http://localhost',
        fetchApi,
      })
    );
  }
}

describe('getAccount', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: AccountInfo = {
      accountId: 11329,
      owner: '0x8656920c85342d646E5286Cb841F90209272ABeb',
      frozen: false,
      publicKey: {
        x: '0x20ba7bd404f259c3d49853d6a849425a983c24fc3c01be177f719e84ba776a8c',
        y: '0x266d7e40dba375c90816287814f20b8e187227a6d05f17d2d329fefac9b782af',
      },
      tags: '',
      nonce: 1,
      keyNonce: 1,
      keySeed:
        'Sign this message to access Loopring Exchange: 0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e with key nonce: 0',
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 200 })
    );

    await expect(api.getAccount({ accountId: 1234 })).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/account?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
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

    await expect(api.getAccount({ accountId: 1234 })).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/account?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });

  it('internal error', async () => {
    const api = new AccountAPIMock();

    fetchApi.mockRejectedValueOnce(
      new FetchError(new Error(), 'request failed')
    );

    await expect(api.getAccount({ accountId: 1234 })).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/account?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });
});

describe('getCounterFactualInfo', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: CounterfactualWalletInfo = {
      accountId: 245463,
      wallet: '0xb5b6afb26c9b13168cce315210eb1ace6ab487c9',
      walletFactory: '0x68414b6ef86301433e37347b68b89e25b1bec208',
      walletSalt: '1677413884217',
      walletOwner: '0xc6adf1c452ac8d63900684e7925da5a8c4a0c7f0',
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 200 })
    );

    await expect(
      api.getCounterFactualInfo({ accountId: 1234 })
    ).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/counterFactualInfo?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });

  it('not found', async () => {
    const api = new AccountAPIMock();

    const data = {
      resultInfo: {
        code: 100000,
        message: 'None.get',
      },
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 400 })
    );

    await expect(
      api.getCounterFactualInfo({ accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/counterFactualInfo?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
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
      api.getCounterFactualInfo({ accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/counterFactualInfo?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });
});

describe('getUserApiKey', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: UserApiKey = {
      apiKey: 'asdf',
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 200 })
    );

    await expect(
      api.getUserApiKey('0x1234', { accountId: 1234 })
    ).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/apiKey?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-SIG':
            '0x21492035857e8d7eda20504b18bcfa510be62ba485fbe3df8505473d2d3a5ee019fe53d2d64d638b31fbcadcf7117da0a7dc4ebccadd963e8cec104aaef085090518edd02c02b6969f71df6f87c6e2e35259b7cf36c3b4823b3bed794de546bd',
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
      api.getUserApiKey('0x1234', { accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/apiKey?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-SIG':
            '0x21492035857e8d7eda20504b18bcfa510be62ba485fbe3df8505473d2d3a5ee019fe53d2d64d638b31fbcadcf7117da0a7dc4ebccadd963e8cec104aaef085090518edd02c02b6969f71df6f87c6e2e35259b7cf36c3b4823b3bed794de546bd',
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
      api.getUserApiKey('0x1234', { accountId: 1234 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/apiKey?accountId=1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {
          'X-API-SIG':
            '0x21492035857e8d7eda20504b18bcfa510be62ba485fbe3df8505473d2d3a5ee019fe53d2d64d638b31fbcadcf7117da0a7dc4ebccadd963e8cec104aaef085090518edd02c02b6969f71df6f87c6e2e35259b7cf36c3b4823b3bed794de546bd',
        },
        method: 'GET',
      }
    );
  });
});

describe('getNextStorageId', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new AccountAPIMock();

    const data: NextStorageIdInfo = {
      orderId: 0,
      offchainId: 1,
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(NextStorageIdInfoToJSON(data)), {
        status: 200,
      })
    );

    await expect(
      api.getNextStorageId('someApiKey', { accountId: 1234, sellTokenId: 5678 })
    ).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/storageId?accountId=1234&sellTokenId=5678',
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
      api.getNextStorageId('someApiKey', { accountId: 1234, sellTokenId: 5678 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/storageId?accountId=1234&sellTokenId=5678',
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
      api.getNextStorageId('someApiKey', { accountId: 1234, sellTokenId: 5678 })
    ).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/v3/storageId?accountId=1234&sellTokenId=5678',
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
