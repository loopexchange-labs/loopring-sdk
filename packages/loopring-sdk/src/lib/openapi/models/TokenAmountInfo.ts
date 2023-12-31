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
 * @interface TokenAmountInfo
 */
export interface TokenAmountInfo {
    /**
     * The Loopring's ERC20 token identifier.
     * @type {number}
     * @memberof TokenAmountInfo
     */
    tokenId: number;
    /**
     * The amount of the ERC20 token
     * @type {string}
     * @memberof TokenAmountInfo
     */
    amount: string;
}

/**
 * Check if a given object implements the TokenAmountInfo interface.
 */
export function instanceOfTokenAmountInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tokenId" in value;
    isInstance = isInstance && "amount" in value;

    return isInstance;
}

export function TokenAmountInfoFromJSON(json: any): TokenAmountInfo {
    return TokenAmountInfoFromJSONTyped(json, false);
}

export function TokenAmountInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokenAmountInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tokenId': json['tokenId'],
        'amount': json['amount'],
    };
}

export function TokenAmountInfoToJSON(value?: TokenAmountInfo | null): any {
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

