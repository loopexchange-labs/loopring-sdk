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
/**
 * 
 * @export
 * @interface NextStorageIdInfo
 */
export interface NextStorageIdInfo {
    /**
     * Next storage ID for order request, must be even
     * @type {number}
     * @memberof NextStorageIdInfo
     */
    orderId: number;
    /**
     * Next storage ID for off-chain requests, i.e., transfer/withdraw/updateAccount, must be odd
     * @type {number}
     * @memberof NextStorageIdInfo
     */
    offchainId: number;
}

/**
 * Check if a given object implements the NextStorageIdInfo interface.
 */
export function instanceOfNextStorageIdInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "orderId" in value;
    isInstance = isInstance && "offchainId" in value;

    return isInstance;
}

export function NextStorageIdInfoFromJSON(json: any): NextStorageIdInfo {
    return NextStorageIdInfoFromJSONTyped(json, false);
}

export function NextStorageIdInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NextStorageIdInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'orderId': json['orderId'],
        'offchainId': json['offchainId'],
    };
}

export function NextStorageIdInfoToJSON(value?: NextStorageIdInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'orderId': value.orderId,
        'offchainId': value.offchainId,
    };
}

