import type { ChainId } from './constants';
import { LoopringAPI } from './loopring';
import type { CounterfactualWalletInfo } from './openapi';

export type SignMessageAsync = (args: {
  message: string;
}) => Promise<`0x${string}`>;

export type VerifyMessage = ({
  address,
  message,
  signature,
}: {
  address: `0x${string}`;
  message: string;
  signature: `0x${string}`;
}) => Promise<boolean>;

export async function personalSign(
  signMessageAsync: SignMessageAsync,
  verifyMessage: VerifyMessage,
  account: `0x${string}`,
  accountId: number,
  msg: string,
  chainId: ChainId
): Promise<{
  signature: `0x${string}`;
  counterFactualInfo: CounterfactualWalletInfo | undefined;
}> {
  try {
    const signature = await signMessageAsync({
      message: msg,
    });

    // ecRecover (MetaMask, ...) + eip-1271 (Loopring L2, deployed on L1, ...)
    try {
      const valid = await verifyMessage({
        address: account,
        message: msg,
        signature,
      });

      if (valid) {
        return {
          signature,
          counterFactualInfo: undefined,
        };
      }
    } catch (e) {
      console.error(e);
    }

    // Counterfactual Wallet (Loopring L2, not deployed on L1)
    try {
      const counterFactualInfo = await new LoopringAPI(
        chainId
      ).accountApi.getCounterFactualInfo({ accountId });

      if (counterFactualInfo && counterFactualInfo.walletOwner) {
        let _signature = signature;
        if (signature.startsWith('0x')) {
          _signature = signature.slice(0, 132) as `0x${string}`;
        }

        const valid = await verifyMessage({
          address: counterFactualInfo.walletOwner as `0x${string}`,
          message: msg,
          signature: _signature,
        });

        if (valid) {
          return {
            signature,
            counterFactualInfo: counterFactualInfo,
          };
        }
      }
    } catch (e) {
      console.error(e);
    }

    throw new Error('could not validate signature');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
