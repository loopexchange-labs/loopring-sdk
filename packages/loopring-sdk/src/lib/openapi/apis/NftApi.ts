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


import * as runtime from '../runtime';
import type {
  NFTMintRequestV3,
  NftDataInfo,
  OffchainFeeInfo,
  ResultInfo,
  TransferNftRequest,
  TxHashInfo,
  UserNftBalancesInfo,
} from '../models/index';
import {
    NFTMintRequestV3FromJSON,
    NFTMintRequestV3ToJSON,
    NftDataInfoFromJSON,
    NftDataInfoToJSON,
    OffchainFeeInfoFromJSON,
    OffchainFeeInfoToJSON,
    ResultInfoFromJSON,
    ResultInfoToJSON,
    TransferNftRequestFromJSON,
    TransferNftRequestToJSON,
    TxHashInfoFromJSON,
    TxHashInfoToJSON,
    UserNftBalancesInfoFromJSON,
    UserNftBalancesInfoToJSON,
} from '../models/index';

export interface GetNFTOffchainFeeRequest {
    accountId: number;
    requestType: GetNFTOffchainFeeRequestTypeEnum;
    tokenAddress?: string;
    deployInWithdraw?: boolean;
    xAPIKEY: string;
}

export interface GetNftDataRequest {
    xAPIKEY: string;
    minter: string;
    tokenAddress: string;
    nftId: string;
}

export interface GetUserNftBalancesRequest {
    accountId: number;
    nftDatas?: string;
    tokenAddrs?: string;
    tokenIds?: string;
    offset?: number;
    limit?: number;
    nonZero?: boolean;
    metadata?: boolean;
    xAPIKEY: string;
}

export interface MintNftRequest {
    xAPIKEY: string;
    nFTMintRequestV3: NFTMintRequestV3;
}

export interface TransferNftOperationRequest {
    xAPIKEY: string;
    xAPISIG: string;
    transferNftRequest: TransferNftRequest;
}

/**
 * 
 */
export class NftApi extends runtime.BaseAPI {

    /**
     * GET NFT Offchain Fee
     */
    async getNFTOffchainFeeRaw(requestParameters: GetNFTOffchainFeeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OffchainFeeInfo>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getNFTOffchainFee.');
        }

        if (requestParameters.requestType === null || requestParameters.requestType === undefined) {
            throw new runtime.RequiredError('requestType','Required parameter requestParameters.requestType was null or undefined when calling getNFTOffchainFee.');
        }

        if (requestParameters.xAPIKEY === null || requestParameters.xAPIKEY === undefined) {
            throw new runtime.RequiredError('xAPIKEY','Required parameter requestParameters.xAPIKEY was null or undefined when calling getNFTOffchainFee.');
        }

        const queryParameters: any = {};

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

        if (requestParameters.requestType !== undefined) {
            queryParameters['requestType'] = requestParameters.requestType;
        }

        if (requestParameters.tokenAddress !== undefined) {
            queryParameters['tokenAddress'] = requestParameters.tokenAddress;
        }

        if (requestParameters.deployInWithdraw !== undefined) {
            queryParameters['deployInWithdraw'] = requestParameters.deployInWithdraw;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xAPIKEY !== undefined && requestParameters.xAPIKEY !== null) {
            headerParameters['X-API-KEY'] = String(requestParameters.xAPIKEY);
        }

        const response = await this.request({
            path: `/api/v3/user/nft/offchainFee`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OffchainFeeInfoFromJSON(jsonValue));
    }

    /**
     * GET NFT Offchain Fee
     */
    async getNFTOffchainFee(requestParameters: GetNFTOffchainFeeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OffchainFeeInfo> {
        const response = await this.getNFTOffchainFeeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Query nftDatas by minter, tokenAddress and nftID.
     */
    async getNftDataRaw(requestParameters: GetNftDataRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<NftDataInfo>> {
        if (requestParameters.xAPIKEY === null || requestParameters.xAPIKEY === undefined) {
            throw new runtime.RequiredError('xAPIKEY','Required parameter requestParameters.xAPIKEY was null or undefined when calling getNftData.');
        }

        if (requestParameters.minter === null || requestParameters.minter === undefined) {
            throw new runtime.RequiredError('minter','Required parameter requestParameters.minter was null or undefined when calling getNftData.');
        }

        if (requestParameters.tokenAddress === null || requestParameters.tokenAddress === undefined) {
            throw new runtime.RequiredError('tokenAddress','Required parameter requestParameters.tokenAddress was null or undefined when calling getNftData.');
        }

        if (requestParameters.nftId === null || requestParameters.nftId === undefined) {
            throw new runtime.RequiredError('nftId','Required parameter requestParameters.nftId was null or undefined when calling getNftData.');
        }

        const queryParameters: any = {};

        if (requestParameters.minter !== undefined) {
            queryParameters['minter'] = requestParameters.minter;
        }

        if (requestParameters.tokenAddress !== undefined) {
            queryParameters['tokenAddress'] = requestParameters.tokenAddress;
        }

        if (requestParameters.nftId !== undefined) {
            queryParameters['nftId'] = requestParameters.nftId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xAPIKEY !== undefined && requestParameters.xAPIKEY !== null) {
            headerParameters['X-API-KEY'] = String(requestParameters.xAPIKEY);
        }

        const response = await this.request({
            path: `/api/v3/nft/info/nftData`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => NftDataInfoFromJSON(jsonValue));
    }

    /**
     * Query nftDatas by minter, tokenAddress and nftID.
     */
    async getNftData(requestParameters: GetNftDataRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<NftDataInfo> {
        const response = await this.getNftDataRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get users NFT balance, besides amount, it also includes tokenId and nftData
     */
    async getUserNftBalancesRaw(requestParameters: GetUserNftBalancesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserNftBalancesInfo>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getUserNftBalances.');
        }

        if (requestParameters.xAPIKEY === null || requestParameters.xAPIKEY === undefined) {
            throw new runtime.RequiredError('xAPIKEY','Required parameter requestParameters.xAPIKEY was null or undefined when calling getUserNftBalances.');
        }

        const queryParameters: any = {};

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

        if (requestParameters.nftDatas !== undefined) {
            queryParameters['nftDatas'] = requestParameters.nftDatas;
        }

        if (requestParameters.tokenAddrs !== undefined) {
            queryParameters['tokenAddrs'] = requestParameters.tokenAddrs;
        }

        if (requestParameters.tokenIds !== undefined) {
            queryParameters['tokenIds'] = requestParameters.tokenIds;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.nonZero !== undefined) {
            queryParameters['nonZero'] = requestParameters.nonZero;
        }

        if (requestParameters.metadata !== undefined) {
            queryParameters['metadata'] = requestParameters.metadata;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xAPIKEY !== undefined && requestParameters.xAPIKEY !== null) {
            headerParameters['X-API-KEY'] = String(requestParameters.xAPIKEY);
        }

        const response = await this.request({
            path: `/api/v3/user/nft/balances`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserNftBalancesInfoFromJSON(jsonValue));
    }

    /**
     * Get users NFT balance, besides amount, it also includes tokenId and nftData
     */
    async getUserNftBalances(requestParameters: GetUserNftBalancesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserNftBalancesInfo> {
        const response = await this.getUserNftBalancesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * mint nft in Loopring layer2, only can mint ERC1155 in layer2 now.
     * Mint NFT
     */
    async mintNftRaw(requestParameters: MintNftRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TxHashInfo>> {
        if (requestParameters.xAPIKEY === null || requestParameters.xAPIKEY === undefined) {
            throw new runtime.RequiredError('xAPIKEY','Required parameter requestParameters.xAPIKEY was null or undefined when calling mintNft.');
        }

        if (requestParameters.nFTMintRequestV3 === null || requestParameters.nFTMintRequestV3 === undefined) {
            throw new runtime.RequiredError('nFTMintRequestV3','Required parameter requestParameters.nFTMintRequestV3 was null or undefined when calling mintNft.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xAPIKEY !== undefined && requestParameters.xAPIKEY !== null) {
            headerParameters['X-API-KEY'] = String(requestParameters.xAPIKEY);
        }

        const response = await this.request({
            path: `/api/v3/nft/mint`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NFTMintRequestV3ToJSON(requestParameters.nFTMintRequestV3),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TxHashInfoFromJSON(jsonValue));
    }

    /**
     * mint nft in Loopring layer2, only can mint ERC1155 in layer2 now.
     * Mint NFT
     */
    async mintNft(requestParameters: MintNftRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TxHashInfo> {
        const response = await this.mintNftRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * transfer nft
     * Transfer NFT
     */
    async transferNftRaw(requestParameters: TransferNftOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TxHashInfo>> {
        if (requestParameters.xAPIKEY === null || requestParameters.xAPIKEY === undefined) {
            throw new runtime.RequiredError('xAPIKEY','Required parameter requestParameters.xAPIKEY was null or undefined when calling transferNft.');
        }

        if (requestParameters.xAPISIG === null || requestParameters.xAPISIG === undefined) {
            throw new runtime.RequiredError('xAPISIG','Required parameter requestParameters.xAPISIG was null or undefined when calling transferNft.');
        }

        if (requestParameters.transferNftRequest === null || requestParameters.transferNftRequest === undefined) {
            throw new runtime.RequiredError('transferNftRequest','Required parameter requestParameters.transferNftRequest was null or undefined when calling transferNft.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xAPIKEY !== undefined && requestParameters.xAPIKEY !== null) {
            headerParameters['X-API-KEY'] = String(requestParameters.xAPIKEY);
        }

        if (requestParameters.xAPISIG !== undefined && requestParameters.xAPISIG !== null) {
            headerParameters['X-API-SIG'] = String(requestParameters.xAPISIG);
        }

        const response = await this.request({
            path: `/api/v3/nft/transfer`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TransferNftRequestToJSON(requestParameters.transferNftRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TxHashInfoFromJSON(jsonValue));
    }

    /**
     * transfer nft
     * Transfer NFT
     */
    async transferNft(requestParameters: TransferNftOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TxHashInfo> {
        const response = await this.transferNftRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const GetNFTOffchainFeeRequestTypeEnum = {
    NUMBER_9: 9,
    NUMBER_10: 10,
    NUMBER_11: 11,
    NUMBER_13: 13,
    NUMBER_19: 19
} as const;
export type GetNFTOffchainFeeRequestTypeEnum = typeof GetNFTOffchainFeeRequestTypeEnum[keyof typeof GetNFTOffchainFeeRequestTypeEnum];
