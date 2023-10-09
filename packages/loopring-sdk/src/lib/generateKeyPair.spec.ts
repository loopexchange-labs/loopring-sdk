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
        publicKey: {
          x: '0x001b9a7064d6f1b27979170f9a5ce2fa32cefb77e2ac81583404e544943d620948',
          y: '0x001bb27243185bc780f46f964ad2011d55d0ff3ed0177b62bbe400d88ce9bc8f65',
        },
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

  it('generateKeyPair - leading 0s', async () => {
    const signMessageAsync = jest.fn();
    const verifyMessage = jest.fn();
    const signature =
      '0x00c4fafca785d8b4da5e15265e4e58767a3f2502cdea2fcc4408cee5149e2a697fb7aaba14dceb096abd78cd4e9576859dcef262a4b51f2bb4554ebfd4fb72f5cf02';

    signMessageAsync.mockResolvedValueOnce(signature);
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
          '13177128602008476316648007186770414467529839960903001891999762356783519376339',
        publicKeyY:
          '12345804151819755343032722751269003874303422211927604135345729794881772258791',
        secretKey:
          '110363126876775936939184191137732252584845853294910358210190810231166593026',
      },
      formatedPx:
        '0x1d21fd9096f5e99a270d0692b2e88127669a6980029513b1ca1459bea0e423d3',
      formatedPy:
        '0x1b4b7a3ef37cb12bdd53c1dd25e71c032c6a06ab1490dbafc7c304bbbf1305e7',
      sk: '0x3e769be3e46e6ca29d3b493f3ddfd7b66b18f404f4bd6e9f3d51a791f9e802',
    });

    expect(signMessageAsync.mock.calls).toHaveLength(1);
    expect(verifyMessage.mock.calls).toHaveLength(1);

    expect(signMessageAsync.mock.calls[0]).toStrictEqual([
      { message: '0x3456' },
    ]);
    expect(verifyMessage.mock.calls[0]).toStrictEqual([
      { address: '0x2345', message: '0x3456', signature: signature },
    ]);
  });
});
