import type { ChainId } from './loopring';
import { personalSign } from './personal_sign';
import { generateKeyPair as generateKeyPairWasm } from './signature';

export interface KeyPairParams {
  signMessageAsync: (args: { message: string }) => Promise<`0x${string}`>;
  verifyMessage: ({
    address,
    message,
    signature,
  }: {
    address: `0x${string}`;
    message: string;
    signature: `0x${string}`;
  }) => Promise<boolean>;
  account: `0x${string}`;
  accountId: number;
  keySeed: string;
  chainId: ChainId;
  publicKey?: { x: string; y: string };
  // accountId?: number;
}

export function hexEqual(hex1: string, hex2: string) {
  return hex1.toLowerCase() === hex2.toLowerCase();
}

export async function generateKeyPair({
  signMessageAsync,
  verifyMessage,
  keySeed,
  account,
  accountId,
  chainId,
  publicKey,
}: KeyPairParams) {
  const result = await personalSign(
    signMessageAsync,
    verifyMessage,
    account,
    accountId,
    keySeed,
    chainId
  );

  let generatedKeyPair = await generateKeyPairWasm(result.signature);

  if (
    publicKey &&
    result.signature.length > 3 &&
    publicKey.x &&
    publicKey.y &&
    (!hexEqual(generatedKeyPair.formatedPx, publicKey.x) ||
      !hexEqual(generatedKeyPair.formatedPy, publicKey.y))
  ) {
    const value = result.signature.split('');
    let end = value.splice(result.signature.length - 2, 2).join('');
    end = end == '1c' ? '01' : '1c';
    generatedKeyPair = await generateKeyPairWasm(
      value.concat(end.split('')).join('')
    );
  }

  return {
    counterFactualInfo: result.counterFactualInfo,
    ...generatedKeyPair,
  };
}
