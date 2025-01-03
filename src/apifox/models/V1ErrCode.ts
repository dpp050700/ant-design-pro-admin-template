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

import { exists, mapValues } from '../runtime';
import type { Any } from './Any';
import { AnyFromJSON, AnyFromJSONTyped, AnyToJSON } from './Any';
import type { ErrorsCode } from './ErrorsCode';
import { ErrorsCodeFromJSON, ErrorsCodeFromJSONTyped, ErrorsCodeToJSON } from './ErrorsCode';

/**
 *
 * @export
 * @interface V1ErrCode
 */
export interface V1ErrCode {
  /**
   *
   * @type {ErrorsCode}
   * @memberof V1ErrCode
   */
  statusCode?: ErrorsCode;
  /**
   *
   * @type {number}
   * @memberof V1ErrCode
   */
  code: number;
  /**
   *
   * @type {string}
   * @memberof V1ErrCode
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof V1ErrCode
   */
  message?: string;
  /**
   *
   * @type {Array<Any>}
   * @memberof V1ErrCode
   */
  details?: Array<Any>;
}

/**
 * Check if a given object implements the V1ErrCode interface.
 */
export function instanceOfV1ErrCode(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'code' in value;
  isInstance = isInstance && 'name' in value;

  return isInstance;
}

export function V1ErrCodeFromJSON(json: any): V1ErrCode {
  return V1ErrCodeFromJSONTyped(json, false);
}

export function V1ErrCodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1ErrCode {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    statusCode: !exists(json, 'statusCode') ? undefined : ErrorsCodeFromJSON(json['statusCode']),
    code: json['code'],
    name: json['name'],
    message: !exists(json, 'message') ? undefined : json['message'],
    details: !exists(json, 'details')
      ? undefined
      : (json['details'] as Array<any>).map(AnyFromJSON),
  };
}

export function V1ErrCodeToJSON(value?: V1ErrCode | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    statusCode: ErrorsCodeToJSON(value.statusCode),
    code: value.code,
    name: value.name,
    message: value.message,
    details: value.details === undefined ? undefined : (value.details as Array<any>).map(AnyToJSON),
  };
}
