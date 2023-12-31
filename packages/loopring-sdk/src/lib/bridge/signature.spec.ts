import {
  generateKeyPair,
  getEddsaSigNftOrder,
  getLockHashAndEddsaSignature,
  signRequest,
} from './signature';

describe('signature', () => {
  it('getEddsaSigNftOrder 0x1234', () => {
    return expect(
      getEddsaSigNftOrder(
        '0x50adc27dea06292802e0696cecf816f4d141ad9fa80a877948b0251be51ffa3',
        '0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '0',
        '0'
      )
    ).resolves.toEqual(
      '0x261f1193386bd5dc75354ce694d010861dc58192de2a28d680ab3b502a1c80350f813a46674b3cb46474384b6621b6f20266aa813b5035df9c5ce014d9b228ad10531be659b6f250ec664a6630d82b41c66fc27fcfb3a485b7cbbd36a59070bf'
    );
  });

  it('getLockHashAndEddsaSignature 0x1234', () => {
    return expect(
      getLockHashAndEddsaSignature(
        '0x1234',
        '0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4',
        '1',
        '2',
        '3',
        '4'
      )
    ).resolves.toEqual(
      '0x022428e3204dad3b254707870f34628ad7c39380e58df348c50fb76395c3817411455a961e4afefe1818ef03f8604d964ec39dce3cf738b1bfbb8f700ff88e241fa1c0270eab96779e8ed616b150e2b73ada382ac10003657c1fdbfb119118d1'
    );
  });

  it('generateKeyPair 0x1234', () => {
    return expect(generateKeyPair('0x1234')).resolves.toEqual({
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
  });

  it('generateKeyPair 0x12345', () => {
    return expect(generateKeyPair('0x12345')).resolves.toEqual({
      keyPair: {
        publicKeyX:
          '17150263012821040753302789854468952052284392848527137254990915027830228822755',
        publicKeyY:
          '4967225526344074395340056881251792399893955194356541630701296482692946284746',
        secretKey:
          '1211277797918594114398771323365461492872742227233686142033366613988626417152',
      },
      formatedPx:
        '0x25eab47287d73b063cefe42d3fc585f4006132133635604e6f87599ba4daaae3',
      formatedPy:
        '0x0afb599abdde1699590e16c4097fbff168b8e82e5db4fb3e39e07d55d2b150ca',
      sk: '0x2ad8f1695121d2e424c19cd7da6281b35d5933fe4f800b29447dccc58684600',
    });
  });

  it('signRequest 0x1234', () => {
    return expect(
      signRequest(
        '0x1234',
        'GET',
        'https://api3.loopring.io',
        '/api/v3/apiKey',
        'accountId%3D12345'
      )
    ).resolves.toEqual(
      '0x0b29b2bacc6718d86e55822e689735b11c78785846045644dfc9875fd1eff63b1497bfb8ffb3dc24023d93877ea003602c4d45664c14322047e88404a3f5770009694914fb154906f3819fdb469f02920d6f83b58d1348b5cdbb1ae98f211562'
    );
  });
});
