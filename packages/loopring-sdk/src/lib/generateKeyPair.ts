import type { ChainId } from './constants';
import { personalSign } from './personalSign';
import { generateKeyPair as generateKeyPairWasm } from './bridge/signature';
import type { VerifyMessage, SignMessageAsync } from './personalSign';

export interface KeyPairParams {
  signMessageAsync: SignMessageAsync;
  verifyMessage: VerifyMessage;
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
