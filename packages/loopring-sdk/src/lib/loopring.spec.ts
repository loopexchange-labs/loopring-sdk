import { afterEach, describe, expect, it, vi } from 'vitest';

import { Configuration, FetchError } from '../lib/openapi/runtime';
import { ChainId, LoopringAPI } from './loopring';
import { AccountInfo, CounterfactualWalletInfo, DefaultApi } from './openapi';

const fetchApi = vi.fn();

export class LoopringAPIMock extends LoopringAPI {
  constructor(chainId: ChainId) {
    super(chainId);
    this.defaultApi = new DefaultApi(
      new Configuration({
        basePath: 'http://localhost',
        fetchApi,
      })
    );
  }
}

describe('getAccount', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('success', async () => {
    const api = new LoopringAPIMock(1);

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
    const api = new LoopringAPIMock(1);

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
    const api = new LoopringAPIMock(1);

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
    vi.restoreAllMocks();
  });

  it('success', async () => {
    const api = new LoopringAPIMock(1);

    const data: CounterfactualWalletInfo = {
      accountId: 256825,
      wallet: '0x135a4d287e26954e47743eb4b23a95a37a7e996a',
      walletFactory: '0x68414b6ef86301433e37347b68b89e25b1bec208',
      walletSalt: '1684601578715',
      walletOwner: '0xac85e2827eae13e51f2929e00aadf5c6086b737e',
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

  it('not counterfactual account', async () => {
    const api = new LoopringAPIMock(1);

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
});
