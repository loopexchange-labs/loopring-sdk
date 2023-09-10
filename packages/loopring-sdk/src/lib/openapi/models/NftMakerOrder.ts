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
import type { NftOrderErc20Token } from './NftOrderErc20Token';
import {
    NftOrderErc20TokenFromJSON,
    NftOrderErc20TokenFromJSONTyped,
    NftOrderErc20TokenToJSON,
} from './NftOrderErc20Token';
import type { NftOrderNftToken } from './NftOrderNftToken';
import {
    NftOrderNftTokenFromJSON,
    NftOrderNftTokenFromJSONTyped,
    NftOrderNftTokenToJSON,
} from './NftOrderNftToken';

/**
 * 
 * @export
 * @interface NftMakerOrder
 */
export interface NftMakerOrder {
    /**
     * exchangeAddress in exchange info
     * @type {string}
     * @memberof NftMakerOrder
     */
    exchange: string;
    /**
     * accountId
     * @type {number}
     * @memberof NftMakerOrder
     */
    accountId: number;
    /**
     * storageId
     * @type {number}
     * @memberof NftMakerOrder
     */
    storageId: number;
    /**
     * 
     * @type {NftOrderNftToken}
     * @memberof NftMakerOrder
     */
    sellToken: NftOrderNftToken;
    /**
     * 
     * @type {NftOrderErc20Token}
     * @memberof NftMakerOrder
     */
    buyToken: NftOrderErc20Token;
    /**
     * allOrNone
     * @type {boolean}
     * @memberof NftMakerOrder
     */
    allOrNone: boolean;
    /**
     * fillAmountBOrS
     * @type {boolean}
     * @memberof NftMakerOrder
     */
    fillAmountBOrS: boolean;
    /**
     * timestamp for transfer to become invalid, seconds
     * @type {number}
     * @memberof NftMakerOrder
     */
    validUntil: number;
    /**
     * maximum order fee that the user can accept, value range (in ten thousandths) 1 ~ 5000
     * @type {number}
     * @memberof NftMakerOrder
     */
    maxFeeBips: number;
    /**
     * eddsa signature of the eddsa hash
     * @type {string}
     * @memberof NftMakerOrder
     */
    eddsaSignature: string;
    /**
     * taker address
     * @type {string}
     * @memberof NftMakerOrder
     */
    taker?: string;
}

/**
 * Check if a given object implements the NftMakerOrder interface.
 */
export function instanceOfNftMakerOrder(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "exchange" in value;
    isInstance = isInstance && "accountId" in value;
    isInstance = isInstance && "storageId" in value;
    isInstance = isInstance && "sellToken" in value;
    isInstance = isInstance && "buyToken" in value;
    isInstance = isInstance && "allOrNone" in value;
    isInstance = isInstance && "fillAmountBOrS" in value;
    isInstance = isInstance && "validUntil" in value;
    isInstance = isInstance && "maxFeeBips" in value;
    isInstance = isInstance && "eddsaSignature" in value;

    return isInstance;
}

export function NftMakerOrderFromJSON(json: any): NftMakerOrder {
    return NftMakerOrderFromJSONTyped(json, false);
}

export function NftMakerOrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): NftMakerOrder {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'exchange': json['exchange'],
        'accountId': json['accountId'],
        'storageId': json['storageId'],
        'sellToken': NftOrderNftTokenFromJSON(json['sellToken']),
        'buyToken': NftOrderErc20TokenFromJSON(json['buyToken']),
        'allOrNone': json['allOrNone'],
        'fillAmountBOrS': json['fillAmountBOrS'],
        'validUntil': json['validUntil'],
        'maxFeeBips': json['maxFeeBips'],
        'eddsaSignature': json['eddsaSignature'],
        'taker': !exists(json, 'taker') ? undefined : json['taker'],
    };
}

export function NftMakerOrderToJSON(value?: NftMakerOrder | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'exchange': value.exchange,
        'accountId': value.accountId,
        'storageId': value.storageId,
        'sellToken': NftOrderNftTokenToJSON(value.sellToken),
        'buyToken': NftOrderErc20TokenToJSON(value.buyToken),
        'allOrNone': value.allOrNone,
        'fillAmountBOrS': value.fillAmountBOrS,
        'validUntil': value.validUntil,
        'maxFeeBips': value.maxFeeBips,
        'eddsaSignature': value.eddsaSignature,
        'taker': value.taker,
    };
}

