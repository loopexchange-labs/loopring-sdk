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
 * @interface ExtraProperties
 */
export interface ExtraProperties {
    /**
     * If this collection was created from a legacy NFT token address, see Create collection from legacy NFTs
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isLegacy?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isPublic?: boolean;
    /**
     * Whether the NFT token address was counter-factual
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isCounterFactualNFT?: boolean;
    /**
     * Whether the user can mint more nfts under this token address
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isMintable?: boolean;
    /**
     * Whether the user can edit collection info
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isEditable?: boolean;
    /**
     * User can delete one collection only if he is the creator of that collection and the collection is empty
     * @type {boolean}
     * @memberof ExtraProperties
     */
    isDeletable?: boolean;
}

/**
 * Check if a given object implements the ExtraProperties interface.
 */
export function instanceOfExtraProperties(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ExtraPropertiesFromJSON(json: any): ExtraProperties {
    return ExtraPropertiesFromJSONTyped(json, false);
}

export function ExtraPropertiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExtraProperties {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isLegacy': !exists(json, 'isLegacy') ? undefined : json['isLegacy'],
        'isPublic': !exists(json, 'isPublic') ? undefined : json['isPublic'],
        'isCounterFactualNFT': !exists(json, 'isCounterFactualNFT') ? undefined : json['isCounterFactualNFT'],
        'isMintable': !exists(json, 'isMintable') ? undefined : json['isMintable'],
        'isEditable': !exists(json, 'isEditable') ? undefined : json['isEditable'],
        'isDeletable': !exists(json, 'isDeletable') ? undefined : json['isDeletable'],
    };
}

export function ExtraPropertiesToJSON(value?: ExtraProperties | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isLegacy': value.isLegacy,
        'isPublic': value.isPublic,
        'isCounterFactualNFT': value.isCounterFactualNFT,
        'isMintable': value.isMintable,
        'isEditable': value.isEditable,
        'isDeletable': value.isDeletable,
    };
}
