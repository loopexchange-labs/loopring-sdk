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
 * @interface NftDataInfo
 */
export interface NftDataInfo {
    /**
     * nftData
     * @type {string}
     * @memberof NftDataInfo
     */
    nftData: string;
    /**
     * minter
     * @type {string}
     * @memberof NftDataInfo
     */
    minter: string;
    /**
     * nftType
     * @type {string}
     * @memberof NftDataInfo
     */
    nftType: NftDataInfoNftTypeEnum;
    /**
     * tokenAddress
     * @type {string}
     * @memberof NftDataInfo
     */
    tokenAddress: string;
    /**
     * nftId
     * @type {string}
     * @memberof NftDataInfo
     */
    nftId: string;
    /**
     * royaltyPercentage
     * @type {number}
     * @memberof NftDataInfo
     */
    royaltyPercentage: number;
    /**
     * status
     * @type {boolean}
     * @memberof NftDataInfo
     */
    status?: boolean;
    /**
     * nftFactory
     * @type {string}
     * @memberof NftDataInfo
     */
    nftFactory?: string;
    /**
     * nftOwner
     * @type {string}
     * @memberof NftDataInfo
     */
    nftOwner?: string;
    /**
     * nftBaseUri
     * @type {string}
     * @memberof NftDataInfo
     */
    nftBaseUri?: string;
    /**
     * royaltyAddress
     * @type {string}
     * @memberof NftDataInfo
     */
    royaltyAddress?: string;
    /**
     * originalMinter
     * @type {string}
     * @memberof NftDataInfo
     */
    originalMinter?: string;
    /**
     * royaltyPercentage
     * @type {number}
     * @memberof NftDataInfo
     */
    originalRoyaltyPercentage?: number;
    /**
     * Unix timestamp in milliseconds
     * @type {number}
     * @memberof NftDataInfo
     */
    createdAt?: number;
}


/**
 * @export
 */
export const NftDataInfoNftTypeEnum = {
    Erc1155: 'ERC1155',
    Erc721: 'ERC721'
} as const;
export type NftDataInfoNftTypeEnum = typeof NftDataInfoNftTypeEnum[keyof typeof NftDataInfoNftTypeEnum];


/**
 * Check if a given object implements the NftDataInfo interface.
 */
export function instanceOfNftDataInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nftData" in value;
    isInstance = isInstance && "minter" in value;
    isInstance = isInstance && "nftType" in value;
    isInstance = isInstance && "tokenAddress" in value;
    isInstance = isInstance && "nftId" in value;
    isInstance = isInstance && "royaltyPercentage" in value;

    return isInstance;
}

export function NftDataInfoFromJSON(json: any): NftDataInfo {
    return NftDataInfoFromJSONTyped(json, false);
}

export function NftDataInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftDataInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nftData': json['nftData'],
        'minter': json['minter'],
        'nftType': json['nftType'],
        'tokenAddress': json['tokenAddress'],
        'nftId': json['nftId'],
        'royaltyPercentage': json['royaltyPercentage'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'nftFactory': !exists(json, 'nftFactory') ? undefined : json['nftFactory'],
        'nftOwner': !exists(json, 'nftOwner') ? undefined : json['nftOwner'],
        'nftBaseUri': !exists(json, 'nftBaseUri') ? undefined : json['nftBaseUri'],
        'royaltyAddress': !exists(json, 'royaltyAddress') ? undefined : json['royaltyAddress'],
        'originalMinter': !exists(json, 'originalMinter') ? undefined : json['originalMinter'],
        'originalRoyaltyPercentage': !exists(json, 'originalRoyaltyPercentage') ? undefined : json['originalRoyaltyPercentage'],
        'createdAt': !exists(json, 'createdAt') ? undefined : json['createdAt'],
    };
}

export function NftDataInfoToJSON(value?: NftDataInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nftData': value.nftData,
        'minter': value.minter,
        'nftType': value.nftType,
        'tokenAddress': value.tokenAddress,
        'nftId': value.nftId,
        'royaltyPercentage': value.royaltyPercentage,
        'status': value.status,
        'nftFactory': value.nftFactory,
        'nftOwner': value.nftOwner,
        'nftBaseUri': value.nftBaseUri,
        'royaltyAddress': value.royaltyAddress,
        'originalMinter': value.originalMinter,
        'originalRoyaltyPercentage': value.originalRoyaltyPercentage,
        'createdAt': value.createdAt,
    };
}

