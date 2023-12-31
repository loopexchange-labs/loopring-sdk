/* tslint:disable */
/* eslint-disable */
/**
 * SDK for Loopring Layer 2
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface NftOrderErc20Token
 */
export interface NftOrderErc20Token {
    /**
     * the Loopring's erc20 token identifier
     * @type {number}
     * @memberof NftOrderErc20Token
     */
    tokenId: number;
    /**
     * the amount of the erc20 token
     * @type {string}
     * @memberof NftOrderErc20Token
     */
    amount: string;
}

/**
 * Check if a given object implements the NftOrderErc20Token interface.
 */
export function instanceOfNftOrderErc20Token(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tokenId" in value;
    isInstance = isInstance && "amount" in value;

    return isInstance;
}

export function NftOrderErc20TokenFromJSON(json: any): NftOrderErc20Token {
    return NftOrderErc20TokenFromJSONTyped(json, false);
}

export function NftOrderErc20TokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftOrderErc20Token {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tokenId': json['tokenId'],
        'amount': json['amount'],
    };
}

export function NftOrderErc20TokenToJSON(value?: NftOrderErc20Token | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tokenId': value.tokenId,
        'amount': value.amount,
    };
}

