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
 * @interface TxHashInfo
 */
export interface TxHashInfo {
    /**
     * The hash identifier set by the user at the time of submission, can use this hash to get the transfer info
     * @type {string}
     * @memberof TxHashInfo
     */
    hash?: string;
}

/**
 * Check if a given object implements the TxHashInfo interface.
 */
export function instanceOfTxHashInfo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TxHashInfoFromJSON(json: any): TxHashInfo {
    return TxHashInfoFromJSONTyped(json, false);
}

export function TxHashInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): TxHashInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'hash': !exists(json, 'hash') ? undefined : json['hash'],
    };
}

export function TxHashInfoToJSON(value?: TxHashInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'hash': value.hash,
    };
}

