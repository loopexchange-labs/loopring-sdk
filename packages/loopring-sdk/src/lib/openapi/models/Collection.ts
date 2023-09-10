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
import type { Cached } from './Cached';
import {
    CachedFromJSON,
    CachedFromJSONTyped,
    CachedToJSON,
} from './Cached';
import type { Extra } from './Extra';
import {
    ExtraFromJSON,
    ExtraFromJSONTyped,
    ExtraToJSON,
} from './Extra';
import type { Times } from './Times';
import {
    TimesFromJSON,
    TimesFromJSONTyped,
    TimesToJSON,
} from './Times';

/**
 * 
 * @export
 * @interface Collection
 */
export interface Collection {
    /**
     * Unique collection Id
     * @type {number}
     * @memberof Collection
     */
    id?: number;
    /**
     * Owner address
     * @type {string}
     * @memberof Collection
     */
    owner?: string;
    /**
     * Collection name
     * @type {string}
     * @memberof Collection
     */
    name?: string;
    /**
     * ERC1155 nft token address to be deployed on L1
     * @type {string}
     * @memberof Collection
     */
    contractAddress?: string;
    /**
     * URL of collection metadata, if this collection is created via loopring.io web app, collectionAddress will start with 0x, and it can be visited on the browser via appending prefix https://nftinfos.loopring.io/ to the collectionAddress, for example, https://nftinfos.loopring.io/0x9717fa2a7d827b3db111be23938c95d14b875863. Otherwise, it may be the format of ipfs ipfs://... or https https://...
     * @type {string}
     * @memberof Collection
     */
    collectionAddress?: string;
    /**
     * Generated by Loopring
     * @type {string}
     * @memberof Collection
     */
    baseUri?: string;
    /**
     * NFT factory contract address of this collection
     * @type {string}
     * @memberof Collection
     */
    nftFactory?: string;
    /**
     * Text
     * @type {string}
     * @memberof Collection
     */
    description?: string;
    /**
     * Ipfs URI or URL of collection image
     * @type {string}
     * @memberof Collection
     */
    avatar?: string;
    /**
     * Ipfs URI or URL of collection banner
     * @type {string}
     * @memberof Collection
     */
    banner?: string;
    /**
     * Ipfs URI or URL of collection thumbnail
     * @type {string}
     * @memberof Collection
     */
    thumbnail?: string;
    /**
     * Ipfs URI or URL of collection tile
     * @type {string}
     * @memberof Collection
     */
    tileUri?: string;
    /**
     * 
     * @type {Cached}
     * @memberof Collection
     */
    cached?: Cached;
    /**
     * L1 ERC1155 NFT contract deploy status
     * @type {string}
     * @memberof Collection
     */
    deployStatus?: CollectionDeployStatusEnum;
    /**
     * Collections created from loopring.io are all ERC1155
     * @type {string}
     * @memberof Collection
     */
    nftType?: CollectionNftTypeEnum;
    /**
     * is public
     * @type {boolean}
     * @memberof Collection
     */
    isPublic?: boolean;
    /**
     * 
     * @type {Times}
     * @memberof Collection
     */
    times?: Times;
    /**
     * 
     * @type {Extra}
     * @memberof Collection
     */
    extra?: Extra;
}


/**
 * @export
 */
export const CollectionDeployStatusEnum = {
    NotDeployed: 'NOT_DEPLOYED',
    DeployFailed: 'DEPLOY_FAILED',
    Deploying: 'DEPLOYING',
    Deployed: 'DEPLOYED'
} as const;
export type CollectionDeployStatusEnum = typeof CollectionDeployStatusEnum[keyof typeof CollectionDeployStatusEnum];

/**
 * @export
 */
export const CollectionNftTypeEnum = {
    Erc1155: 'ERC1155',
    Erc721: 'ERC721'
} as const;
export type CollectionNftTypeEnum = typeof CollectionNftTypeEnum[keyof typeof CollectionNftTypeEnum];


/**
 * Check if a given object implements the Collection interface.
 */
export function instanceOfCollection(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CollectionFromJSON(json: any): Collection {
    return CollectionFromJSONTyped(json, false);
}

export function CollectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Collection {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'owner': !exists(json, 'owner') ? undefined : json['owner'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'contractAddress': !exists(json, 'contractAddress') ? undefined : json['contractAddress'],
        'collectionAddress': !exists(json, 'collectionAddress') ? undefined : json['collectionAddress'],
        'baseUri': !exists(json, 'baseUri') ? undefined : json['baseUri'],
        'nftFactory': !exists(json, 'nftFactory') ? undefined : json['nftFactory'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'avatar': !exists(json, 'avatar') ? undefined : json['avatar'],
        'banner': !exists(json, 'banner') ? undefined : json['banner'],
        'thumbnail': !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
        'tileUri': !exists(json, 'tileUri') ? undefined : json['tileUri'],
        'cached': !exists(json, 'cached') ? undefined : CachedFromJSON(json['cached']),
        'deployStatus': !exists(json, 'deployStatus') ? undefined : json['deployStatus'],
        'nftType': !exists(json, 'nftType') ? undefined : json['nftType'],
        'isPublic': !exists(json, 'isPublic') ? undefined : json['isPublic'],
        'times': !exists(json, 'times') ? undefined : TimesFromJSON(json['times']),
        'extra': !exists(json, 'extra') ? undefined : ExtraFromJSON(json['extra']),
    };
}

export function CollectionToJSON(value?: Collection | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'owner': value.owner,
        'name': value.name,
        'contractAddress': value.contractAddress,
        'collectionAddress': value.collectionAddress,
        'baseUri': value.baseUri,
        'nftFactory': value.nftFactory,
        'description': value.description,
        'avatar': value.avatar,
        'banner': value.banner,
        'thumbnail': value.thumbnail,
        'tileUri': value.tileUri,
        'cached': CachedToJSON(value.cached),
        'deployStatus': value.deployStatus,
        'nftType': value.nftType,
        'isPublic': value.isPublic,
        'times': TimesToJSON(value.times),
        'extra': ExtraToJSON(value.extra),
    };
}

