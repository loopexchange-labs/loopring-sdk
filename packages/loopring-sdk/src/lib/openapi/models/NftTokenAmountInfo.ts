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
 * @interface NftTokenAmountInfo
 */
export interface NftTokenAmountInfo {
    /**
     * the Loopring's NFT token identifier
     * @type {number}
     * @memberof NftTokenAmountInfo
     */
    tokenId: number;
    /**
     * the Loopring's NFT token data identifier which is a hash string of NFT token address and NFT_ID
     * @type {string}
     * @memberof NftTokenAmountInfo
     */
    nftData?: string;
    /**
     * the amount of the NFT token
     * @type {string}
     * @memberof NftTokenAmountInfo
     */
    amount: string;
}

/**
 * Check if a given object implements the NftTokenAmountInfo interface.
 */
export function instanceOfNftTokenAmountInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tokenId" in value;
    isInstance = isInstance && "amount" in value;

    return isInstance;
}

export function NftTokenAmountInfoFromJSON(json: any): NftTokenAmountInfo {
    return NftTokenAmountInfoFromJSONTyped(json, false);
}

export function NftTokenAmountInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftTokenAmountInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tokenId': json['tokenId'],
        'nftData': !exists(json, 'nftData') ? undefined : json['nftData'],
        'amount': json['amount'],
    };
}

export function NftTokenAmountInfoToJSON(value?: NftTokenAmountInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tokenId': value.tokenId,
        'nftData': value.nftData,
        'amount': value.amount,
    };
}
