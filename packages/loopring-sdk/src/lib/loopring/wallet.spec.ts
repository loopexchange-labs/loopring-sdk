import {
  Configuration,
  FetchError,
  ResolveNameInfo,
  WalletApi,
} from '../openapi';
import { WalletAPI } from './wallet';

const fetchApi = jest.fn();

export class WalletAPIMock extends WalletAPI {
  constructor() {
    super('http://localhost');
    this.api = new WalletApi(
      new Configuration({
        basePath: 'http://localhost',
        fetchApi,
      })
    );
  }
}

describe('resolveName', () => {
  afterEach(() => {
    fetchApi.mockReset();
  });

  it('success', async () => {
    const api = new WalletAPIMock();

    const data: ResolveNameInfo = {
      // "resultInfo": {
      //   "code": 0,
      //   "message": "SUCCESS"
      // },
      data: 'result.loopring.eth',
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), {
        status: 200,
      })
    );

    await expect(api.resolveName({ owner: '0x1234' })).resolves.toEqual(data);

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/wallet/v3/resolveName?owner=0x1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });

  it('not found', async () => {
    const api = new WalletAPIMock();

    const data = {
      resultInfo: {
        code: 100001,
        message: 'Invalid owner:0x1234',
      },
    };

    fetchApi.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 400 })
    );

    await expect(api.resolveName({ owner: '0x1234' })).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/wallet/v3/resolveName?owner=0x1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });

  it('internal error', async () => {
    const api = new WalletAPIMock();

    fetchApi.mockRejectedValueOnce(
      new FetchError(new Error(), 'request failed')
    );

    await expect(api.resolveName({ owner: '0x1234' })).rejects.toThrowError();

    expect(fetchApi).toHaveBeenCalledTimes(1);
    expect(fetchApi).toBeCalledWith(
      'http://localhost/api/wallet/v3/resolveName?owner=0x1234',
      {
        body: undefined,
        credentials: undefined,
        headers: {},
        method: 'GET',
      }
    );
  });
});
