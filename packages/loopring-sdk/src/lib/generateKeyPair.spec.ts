import { generateKeyPair } from './generateKeyPair';

describe('generateKeyPair', () => {
  it('generateKeyPair - happy path', async () => {
    const signMessageAsync = jest.fn();
    const verifyMessage = jest.fn();

    signMessageAsync.mockResolvedValueOnce('0x1234');
    verifyMessage.mockResolvedValueOnce(true);

    await expect(
      generateKeyPair({
        signMessageAsync,
        verifyMessage,
        keySeed: '0x3456',
        account: '0x2345',
        accountId: 1,
        chainId: 1,
      })
    ).resolves.toEqual({
      keyPair: {
        publicKeyX:
          '12485317073945829795163901166283443631921547304790744867554182714098609949000',
        publicKeyY:
          '12527734297243956538968023182262726317403413118463934434378426571924900188005',
        secretKey:
          '2280752172643637060311335108033819750862509663263550628348196500509381754787',
      },
      formatedPx:
        '0x1b9a7064d6f1b27979170f9a5ce2fa32cefb77e2ac81583404e544943d620948',
      formatedPy:
        '0x1bb27243185bc780f46f964ad2011d55d0ff3ed0177b62bbe400d88ce9bc8f65',
      sk: '0x50adc27dea06292802e0696cecf816f4d141ad9fa80a877948b0251be51ffa3',
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
});
