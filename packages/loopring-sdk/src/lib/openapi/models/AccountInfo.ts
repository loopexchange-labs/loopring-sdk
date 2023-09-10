/* tslint:disable */
/* eslint-disable */
/**
 * SDK for Loopring Layer 2
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { PublicKey } from './PublicKey';
import {
    PublicKeyFromJSON,
    PublicKeyFromJSONTyped,
    PublicKeyToJSON,
} from './PublicKey';

/**
 * 
 * @export
 * @interface AccountInfo
 */
export interface AccountInfo {
    /**
     * Account ID
     * @type {number}
     * @memberof AccountInfo
     */
    accountId: number;
    /**
     * Ethereum address
     * @type {string}
     * @memberof AccountInfo
     */
    owner: string;
    /**
     * The frozen state of the account, true stands for frozen, if the account is frozen, the user cannot submit an order.
     * @type {boolean}
     * @memberof AccountInfo
     */
    frozen: boolean;
    /**
     * 
     * @type {PublicKey}
     * @memberof AccountInfo
     */
    publicKey: PublicKey;
    /**
     * Comma separated list of tags such as VIP levels, etc
     * @type {string}
     * @memberof AccountInfo
     */
    tags?: string;
    /**
     * nonce
     * @type {number}
     * @memberof AccountInfo
     */
    nonce: number;
    /**
     * Nonce of users key change request, for backward compatible
     * @type {number}
     * @memberof AccountInfo
     */
    keyNonce: number;
    /**
     * KeySeed of users L2 eddsaKey, the L2 key should be generated from this seed, i.e., L2_EDDSA_KEY=eth.sign(keySeed). Otherwise, users may receive an error when logging into the Loopring DEX
     * @type {string}
     * @memberof AccountInfo
     */
    keySeed: string;
}

/**
 * Check if a given object implements the AccountInfo interface.
 */
export function instanceOfAccountInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "owner" in value;
    isInstance = isInstance && "frozen" in value;
    isInstance = isInstance && "publicKey" in value;
    isInstance = isInstance && "nonce" in value;
    isInstance = isInstance && "keyNonce" in value;
    isInstance = isInstance && "keySeed" in value;

    return isInstance;
}

export function AccountInfoFromJSON(json: any): AccountInfo {
    return AccountInfoFromJSONTyped(json, false);
}

export function AccountInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accountId': json['accountId'],
        'owner': json['owner'],
        'frozen': json['frozen'],
        'publicKey': PublicKeyFromJSON(json['publicKey']),
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'nonce': json['nonce'],
        'keyNonce': json['keyNonce'],
        'keySeed': json['keySeed'],
    };
}

export function AccountInfoToJSON(value?: AccountInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accountId': value.accountId,
        'owner': value.owner,
        'frozen': value.frozen,
        'publicKey': PublicKeyToJSON(value.publicKey),
        'tags': value.tags,
        'nonce': value.nonce,
        'keyNonce': value.keyNonce,
        'keySeed': value.keySeed,
    };
}

