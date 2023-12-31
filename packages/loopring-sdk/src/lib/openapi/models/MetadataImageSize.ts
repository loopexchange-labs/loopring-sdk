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
 * @interface MetadataImageSize
 */
export interface MetadataImageSize {
    /**
     * 240x240
     * @type {string}
     * @memberof MetadataImageSize
     */
    _240240: string;
    /**
     * 332x332
     * @type {string}
     * @memberof MetadataImageSize
     */
    _332332: string;
    /**
     * Original
     * @type {string}
     * @memberof MetadataImageSize
     */
    original: string;
}

/**
 * Check if a given object implements the MetadataImageSize interface.
 */
export function instanceOfMetadataImageSize(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "_240240" in value;
    isInstance = isInstance && "_332332" in value;
    isInstance = isInstance && "original" in value;

    return isInstance;
}

export function MetadataImageSizeFromJSON(json: any): MetadataImageSize {
    return MetadataImageSizeFromJSONTyped(json, false);
}

export function MetadataImageSizeFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataImageSize {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_240240': json['240-240'],
        '_332332': json['332-332'],
        'original': json['original'],
    };
}

export function MetadataImageSizeToJSON(value?: MetadataImageSize | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        '240-240': value._240240,
        '332-332': value._332332,
        'original': value.original,
    };
}

