/* tslint:disable */
/* eslint-disable */
/**
 * chameleon service
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0
 * Contact: none@example.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
  HttpBody,
  RpcStatus,
  S3GetRsp,
  TemporarySignUrlReq,
  TemporarySignUrlRsp,
  V1ErrCode,
} from '../models/index';
import {
  HttpBodyFromJSON,
  HttpBodyToJSON,
  RpcStatusFromJSON,
  RpcStatusToJSON,
  S3GetRspFromJSON,
  S3GetRspToJSON,
  TemporarySignUrlReqFromJSON,
  TemporarySignUrlReqToJSON,
  TemporarySignUrlRspFromJSON,
  TemporarySignUrlRspToJSON,
  V1ErrCodeFromJSON,
  V1ErrCodeToJSON,
} from '../models/index';

export interface S3ServiceFileRequest {
  key?: string;
}

export interface S3ServiceFileObjectRequest {
  key: string;
}

export interface S3ServiceGetRequest {
  key?: string;
}

export interface S3ServiceTemporarySignUrlRequest {
  body: TemporarySignUrlReq;
}

/**
 *
 */
export class S3ServiceApi extends runtime.BaseAPI {
  /**
   * 获取文件
   */
  async s3ServiceFileRaw(
    requestParameters: S3ServiceFileRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<HttpBody>> {
    const queryParameters: any = {};

    if (requestParameters.key !== undefined) {
      queryParameters['key'] = requestParameters.key;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/s3/object`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => HttpBodyFromJSON(jsonValue));
  }

  /**
   * 获取文件
   */
  async s3ServiceFile(
    requestParameters: S3ServiceFileRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<HttpBody> {
    const response = await this.s3ServiceFileRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 获取文件对象
   */
  async s3ServiceFileObjectRaw(
    requestParameters: S3ServiceFileObjectRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<HttpBody>> {
    if (requestParameters.key === null || requestParameters.key === undefined) {
      throw new runtime.RequiredError(
        'key',
        'Required parameter requestParameters.key was null or undefined when calling s3ServiceFileObject.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/s3/object/{key}`.replace(
          `{${'key'}}`,
          encodeURIComponent(String(requestParameters.key)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => HttpBodyFromJSON(jsonValue));
  }

  /**
   * 获取文件对象
   */
  async s3ServiceFileObject(
    requestParameters: S3ServiceFileObjectRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<HttpBody> {
    const response = await this.s3ServiceFileObjectRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 获取s3签名
   */
  async s3ServiceGetRaw(
    requestParameters: S3ServiceGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<S3GetRsp>> {
    const queryParameters: any = {};

    if (requestParameters.key !== undefined) {
      queryParameters['key'] = requestParameters.key;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/s3`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => S3GetRspFromJSON(jsonValue));
  }

  /**
   * 获取s3签名
   */
  async s3ServiceGet(
    requestParameters: S3ServiceGetRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<S3GetRsp> {
    const response = await this.s3ServiceGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 用来上传临时的图片和文件, 24小时后过期
   * 创建临时签名 url
   */
  async s3ServiceTemporarySignUrlRaw(
    requestParameters: S3ServiceTemporarySignUrlRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TemporarySignUrlRsp>> {
    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling s3ServiceTemporarySignUrl.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/s3/sign_obj_url`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TemporarySignUrlReqToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TemporarySignUrlRspFromJSON(jsonValue),
    );
  }

  /**
   * 用来上传临时的图片和文件, 24小时后过期
   * 创建临时签名 url
   */
  async s3ServiceTemporarySignUrl(
    requestParameters: S3ServiceTemporarySignUrlRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TemporarySignUrlRsp> {
    const response = await this.s3ServiceTemporarySignUrlRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
