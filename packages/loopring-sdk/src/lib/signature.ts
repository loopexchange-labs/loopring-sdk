import bridge from './bridge';

interface Bridge {
  getEddsaSigNftOrder: (
    privateKey: string,
    exchangeAddress: string,
    storageId: string,
    accountId: string,
    sellTokenId: string,
    buyTokenId: string,
    sellTokenAmount: string,
    buyTokenAmount: string,
    validUntil: string,
    maxFeeBips: string,
    fillAmountBOrS: string,
    takerAddress: string
  ) => Promise<string>;

  getLockHashAndEddsaSignature: (
    privateKey: string,
    exchangeAddress: string,
    accountId: string,
    tokenId: string,
    volume: string,
    timestamp: string
  ) => Promise<string>;

  generateKeyPair: (signature: string) => Promise<{
    keyPair: {
      publicKeyX: string;
      publicKeyY: string;
      secretKey: string;
    };
    formatedPx: string;
    formatedPy: string;
    sk: string;
  }>;

  signRequest: (
    privateKey: string,
    method: string,
    baseUrl: string,
    path: string,
    data: string
  ) => Promise<string>;
}

const b = bridge();

const {
  getEddsaSigNftOrder: getEddsaSigNftOrderBridge,
  getLockHashAndEddsaSignature: getLockHashAndEddsaSignatureBridge,
  generateKeyPair: generateKeyPairBridge,
  signRequest: signRequestBridge,
} = b as unknown as Bridge;

export const getEddsaSigNftOrder = async (
  privateKey: string,
  exchangeAddress: string,
  storageId: string,
  accountId: string,
  sellTokenId: string,
  buyTokenId: string,
  sellTokenAmount: string,
  buyTokenAmount: string,
  validUntil: string,
  maxFeeBips: string,
  fillAmountBOrS: string,
  takerAddress: string
) => {
  return getEddsaSigNftOrderBridge(
    privateKey,
    exchangeAddress,
    storageId,
    accountId,
    sellTokenId,
    buyTokenId,
    sellTokenAmount,
    buyTokenAmount,
    validUntil,
    maxFeeBips,
    fillAmountBOrS,
    takerAddress
  );
};

export const getLockHashAndEddsaSignature = async (
  privateKey: string,
  exchangeAddress: string,
  accountId: string,
  tokenId: string,
  volume: string,
  timestamp: string
) => {
  return getLockHashAndEddsaSignatureBridge(
    privateKey,
    exchangeAddress,
    accountId,
    tokenId,
    volume,
    timestamp
  );
};

export const generateKeyPair = async (signature: string) => {
  return generateKeyPairBridge(signature);
};

export const signRequest = async (
  privateKey: string,
  method: string,
  baseUrl: string,
  path: string,
  data: string
) => {
  return signRequestBridge(privateKey, method, baseUrl, path, data);
};

export const makeRequestParamStr = (request: Map<string, string>) => {
  const arrObj = Array.from(request);
  arrObj.sort(function (a, b) {
    return a[0].localeCompare(b[0]);
  });
  const orderedMap = new Map(arrObj.map((i) => [i[0], i[1]]));

  const paramlist: Array<string> = [];

  const keys = Object.keys(Object.fromEntries(orderedMap));

  if (keys) {
    keys.forEach((key: string) => {
      const value = request.get(key);
      if (value !== undefined && value !== '')
        paramlist.push(`${key}=${value}`);
    });
  }

  // force to change encode ',' due to different encode rules between server and client
  return encodeURIComponent(paramlist.join('&')).replace(/%2C/g, '%252C');
};
