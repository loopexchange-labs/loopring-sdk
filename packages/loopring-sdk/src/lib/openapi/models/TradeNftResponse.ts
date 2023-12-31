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
import type { NftTradeFill } from './NftTradeFill';
import {
    NftTradeFillFromJSON,
    NftTradeFillFromJSONTyped,
    NftTradeFillToJSON,
} from './NftTradeFill';

/**
 * 
 * @export
 * @interface TradeNftResponse
 */
export interface TradeNftResponse {
    /**
     * 
     * @type {NftTradeFill}
     * @memberof TradeNftResponse
     */
    makerFills?: NftTradeFill;
    /**
     * 
     * @type {NftTradeFill}
     * @memberof TradeNftResponse
     */
    takerFills?: NftTradeFill;
    /**
     * the trade hash which can be queried in loopring scan web
     * @type {string}
     * @memberof TradeNftResponse
     */
    tradeHash?: string;
}

/**
 * Check if a given object implements the TradeNftResponse interface.
 */
export function instanceOfTradeNftResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TradeNftResponseFromJSON(json: any): TradeNftResponse {
    return TradeNftResponseFromJSONTyped(json, false);
}

export function TradeNftResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TradeNftResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'makerFills': !exists(json, 'makerFills') ? undefined : NftTradeFillFromJSON(json['makerFills']),
        'takerFills': !exists(json, 'takerFills') ? undefined : NftTradeFillFromJSON(json['takerFills']),
        'tradeHash': !exists(json, 'tradeHash') ? undefined : json['tradeHash'],
    };
}

export function TradeNftResponseToJSON(value?: TradeNftResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'makerFills': NftTradeFillToJSON(value.makerFills),
        'takerFills': NftTradeFillToJSON(value.takerFills),
        'tradeHash': value.tradeHash,
    };
}

