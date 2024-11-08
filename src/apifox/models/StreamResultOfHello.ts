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
import type { Hello } from './Hello';
import { HelloFromJSON, HelloFromJSONTyped, HelloToJSON } from './Hello';
import type { RpcStatus } from './RpcStatus';
import { RpcStatusFromJSON, RpcStatusFromJSONTyped, RpcStatusToJSON } from './RpcStatus';

/**
 *
 * @export
 * @interface StreamResultOfHello
 */
export interface StreamResultOfHello {
  /**
   *
   * @type {Hello}
   * @memberof StreamResultOfHello
   */
  result?: Hello;
  /**
   *
   * @type {RpcStatus}
   * @memberof StreamResultOfHello
   */
  error?: RpcStatus;
}

/**
 * Check if a given object implements the StreamResultOfHello interface.
 */
export function instanceOfStreamResultOfHello(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function StreamResultOfHelloFromJSON(json: any): StreamResultOfHello {
  return StreamResultOfHelloFromJSONTyped(json, false);
}

export function StreamResultOfHelloFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): StreamResultOfHello {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    result: !exists(json, 'result') ? undefined : HelloFromJSON(json['result']),
    error: !exists(json, 'error') ? undefined : RpcStatusFromJSON(json['error']),
  };
}

export function StreamResultOfHelloToJSON(value?: StreamResultOfHello | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    result: HelloToJSON(value.result),
    error: RpcStatusToJSON(value.error),
  };
}