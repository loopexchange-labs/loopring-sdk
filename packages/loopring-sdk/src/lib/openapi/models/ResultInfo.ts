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
import type { ResultInfoResultInfo } from './ResultInfoResultInfo';
import {
    ResultInfoResultInfoFromJSON,
    ResultInfoResultInfoFromJSONTyped,
    ResultInfoResultInfoToJSON,
} from './ResultInfoResultInfo';

/**
 * 
 * @export
 * @interface ResultInfo
 */
export interface ResultInfo {
    /**
     * 
     * @type {ResultInfoResultInfo}
     * @memberof ResultInfo
     */
    resultInfo?: ResultInfoResultInfo;
}

/**
 * Check if a given object implements the ResultInfo interface.
 */
export function instanceOfResultInfo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ResultInfoFromJSON(json: any): ResultInfo {
    return ResultInfoFromJSONTyped(json, false);
}

export function ResultInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResultInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resultInfo': !exists(json, 'ResultInfo') ? undefined : ResultInfoResultInfoFromJSON(json['ResultInfo']),
    };
}

export function ResultInfoToJSON(value?: ResultInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ResultInfo': ResultInfoResultInfoToJSON(value.resultInfo),
    };
}

