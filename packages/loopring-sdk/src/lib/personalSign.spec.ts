import { personalSign } from './personalSign';
import { AccountAPI } from './loopring/account';

const counterFactualInfo = {
  accountId: 1,
  wallet: '0x2345',
  walletFactory: '0x5432',
  walletSalt: '0x6543',
  walletOwner: '0x7654',
};

const getCounterFactualInfoMock = jest
  .spyOn(AccountAPI.prototype, 'getCounterFactualInfo')
  .mockImplementation(async () => {
    return counterFactualInfo;
  });

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  getCounterFactualInfoMock.mockClear();
});

describe('personalSign', () => {
  it('personalSign - signature error', async () => {
    const signMessageAsync = jest.fn(async (): Promise<`0x${string}`> => {
      throw new Error('signature error');
    });
    const verifyMessage = jest.fn(async (): Promise<boolean> => false);

    await expect(
      personalSign(signMessageAsync, verifyMessage, '0x2345', 1, '0x3456', 1)
    ).rejects.toThrowError('signature error');

    expect(signMessageAsync.mock.calls).toHaveLength(1);
    expect(verifyMessage.mock.calls).toHaveLength(0);

    expect(signMessageAsync.mock.calls[0]).toStrictEqual([
      { message: '0x3456' },
    ]);
  });

  it('personalSign - ecRecover / eip-1271 - correct signature', async () => {
    const signMessageAsync = jest.fn(
      async (): Promise<`0x${string}`> => '0x1234'
    );
    const verifyMessage = jest.fn(async (): Promise<boolean> => true);

    await expect(
      personalSign(signMessageAsync, verifyMessage, '0x2345', 1, '0x3456', 1)
    ).resolves.toEqual({
      signature: '0x1234',
      counterFactualInfo: undefined,
    });

    expect(signMessageAsync.mock.calls).toHaveLength(1);
    expect(verifyMessage.mock.calls).toHaveLength(1);

    expect(signMessageAsync.mock.calls[0]).toStrictEqual([
      { message: '0x3456' },
    ]);
    expect(verifyMessage.mock.calls[0]).toStrictEqual([
      { address: '0x2345', message: '0x3456', signature: '0x1234' },
    ]);
  });

  it('personalSign - counterFactual - correct signature', async () => {
    const signMessageAsync = jest.fn(
      async (): Promise<`0x${string}`> => '0x1234'
    );
    const verifyMessage = jest.fn();

    verifyMessage.mockRejectedValueOnce(new Error('verification error'));
    verifyMessage.mockResolvedValueOnce(true);

    await expect(
      personalSign(signMessageAsync, verifyMessage, '0x2345', 1, '0x3456', 1)
    ).resolves.toEqual({
      signature: '0x1234',
      counterFactualInfo,
    });

    expect(signMessageAsync.mock.calls).toHaveLength(1);
    expect(verifyMessage.mock.calls).toHaveLength(2);
    expect(getCounterFactualInfoMock.mock.calls).toHaveLength(1);

    expect(signMessageAsync.mock.calls[0]).toStrictEqual([
      { message: '0x3456' },
    ]);
    expect(verifyMessage.mock.calls[0]).toStrictEqual([
      { address: '0x2345', message: '0x3456', signature: '0x1234' },
    ]);
    expect(verifyMessage.mock.calls[1]).toStrictEqual([
      { address: '0x7654', message: '0x3456', signature: '0x1234' },
    ]);
    expect(getCounterFactualInfoMock.mock.calls[0]).toStrictEqual([
      {
        accountId: 1,
      },
    ]);
  });

  it('personalSign - no valid signature', async () => {
    const signMessageAsync = jest.fn(
      async (): Promise<`0x${string}`> => '0x1234'
    );
    const verifyMessage = jest.fn();

    verifyMessage.mockRejectedValueOnce(new Error('verification error'));
    verifyMessage.mockResolvedValueOnce(false);

    await expect(
      personalSign(signMessageAsync, verifyMessage, '0x2345', 1, '0x3456', 1)
    ).rejects.toThrowError('could not validate signature');

    expect(signMessageAsync.mock.calls).toHaveLength(1);
    expect(verifyMessage.mock.calls).toHaveLength(2);
    expect(getCounterFactualInfoMock.mock.calls).toHaveLength(1);

    expect(signMessageAsync.mock.calls[0]).toStrictEqual([
      { message: '0x3456' },
    ]);
    expect(verifyMessage.mock.calls[0]).toStrictEqual([
      { address: '0x2345', message: '0x3456', signature: '0x1234' },
    ]);
    expect(verifyMessage.mock.calls[1]).toStrictEqual([
      { address: '0x7654', message: '0x3456', signature: '0x1234' },
    ]);
    expect(getCounterFactualInfoMock.mock.calls[0]).toStrictEqual([
      {
        accountId: 1,
      },
    ]);
  });
});
