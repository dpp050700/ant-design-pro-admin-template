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
import type { Method } from './Method';
import { MethodFromJSON, MethodFromJSONTyped, MethodToJSON } from './Method';

/**
 *
 * @export
 * @interface TemporarySignUrlReq
 */
export interface TemporarySignUrlReq {
  /**
   *
   * @type {string}
   * @memberof TemporarySignUrlReq
   */
  key?: string;
  /**
   *
   * @type {Method}
   * @memberof TemporarySignUrlReq
   */
  method: Method;
}

/**
 * Check if a given object implements the TemporarySignUrlReq interface.
 */
export function instanceOfTemporarySignUrlReq(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'method' in value;

  return isInstance;
}

export function TemporarySignUrlReqFromJSON(json: any): TemporarySignUrlReq {
  return TemporarySignUrlReqFromJSONTyped(json, false);
}

export function TemporarySignUrlReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): TemporarySignUrlReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    key: !exists(json, 'key') ? undefined : json['key'],
    method: MethodFromJSON(json['method']),
  };
}

export function TemporarySignUrlReqToJSON(value?: TemporarySignUrlReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    key: value.key,
    method: MethodToJSON(value.method),
  };
}
