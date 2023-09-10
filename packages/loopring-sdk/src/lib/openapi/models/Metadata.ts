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
import type { MetadataBase } from './MetadataBase';
import {
    MetadataBaseFromJSON,
    MetadataBaseFromJSONTyped,
    MetadataBaseToJSON,
} from './MetadataBase';
import type { MetadataExtra } from './MetadataExtra';
import {
    MetadataExtraFromJSON,
    MetadataExtraFromJSONTyped,
    MetadataExtraToJSON,
} from './MetadataExtra';
import type { MetadataImageSize } from './MetadataImageSize';
import {
    MetadataImageSizeFromJSON,
    MetadataImageSizeFromJSONTyped,
    MetadataImageSizeToJSON,
} from './MetadataImageSize';

/**
 * 
 * @export
 * @interface Metadata
 */
export interface Metadata {
    /**
     * IPFS uri
     * @type {string}
     * @memberof Metadata
     */
    uri: string;
    /**
     * Token Address
     * @type {string}
     * @memberof Metadata
     */
    tokenAddress: string;
    /**
     * Network
     * @type {number}
     * @memberof Metadata
     */
    network: MetadataNetworkEnum;
    /**
     * Status
     * @type {number}
     * @memberof Metadata
     */
    status: number;
    /**
     * NFT Type
     * @type {number}
     * @memberof Metadata
     */
    nftType: MetadataNftTypeEnum;
    /**
     * Nft ID
     * @type {string}
     * @memberof Metadata
     */
    nftId?: string;
    /**
     * 
     * @type {MetadataBase}
     * @memberof Metadata
     */
    base: MetadataBase;
    /**
     * 
     * @type {MetadataExtra}
     * @memberof Metadata
     */
    extra?: MetadataExtra;
    /**
     * 
     * @type {MetadataImageSize}
     * @memberof Metadata
     */
    imageSize?: MetadataImageSize;
}


/**
 * @export
 */
export const MetadataNetworkEnum = {
    NUMBER_0: 0
} as const;
export type MetadataNetworkEnum = typeof MetadataNetworkEnum[keyof typeof MetadataNetworkEnum];

/**
 * @export
 */
export const MetadataNftTypeEnum = {
    NUMBER_0: 0,
    NUMBER_1: 1
} as const;
export type MetadataNftTypeEnum = typeof MetadataNftTypeEnum[keyof typeof MetadataNftTypeEnum];


/**
 * Check if a given object implements the Metadata interface.
 */
export function instanceOfMetadata(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uri" in value;
    isInstance = isInstance && "tokenAddress" in value;
    isInstance = isInstance && "network" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "nftType" in value;
    isInstance = isInstance && "base" in value;

    return isInstance;
}

export function MetadataFromJSON(json: any): Metadata {
    return MetadataFromJSONTyped(json, false);
}

export function MetadataFromJSONTyped(json: any, ignoreDiscriminator: boolean): Metadata {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uri': json['uri'],
        'tokenAddress': json['tokenAddress'],
        'network': json['network'],
        'status': json['status'],
        'nftType': json['nftType'],
        'nftId': !exists(json, 'nftId') ? undefined : json['nftId'],
        'base': MetadataBaseFromJSON(json['base']),
        'extra': !exists(json, 'extra') ? undefined : MetadataExtraFromJSON(json['extra']),
        'imageSize': !exists(json, 'imageSize') ? undefined : MetadataImageSizeFromJSON(json['imageSize']),
    };
}

export function MetadataToJSON(value?: Metadata | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uri': value.uri,
        'tokenAddress': value.tokenAddress,
        'network': value.network,
        'status': value.status,
        'nftType': value.nftType,
        'nftId': value.nftId,
        'base': MetadataBaseToJSON(value.base),
        'extra': MetadataExtraToJSON(value.extra),
        'imageSize': MetadataImageSizeToJSON(value.imageSize),
    };
}

