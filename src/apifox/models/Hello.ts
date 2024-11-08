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
/**
 *
 * @export
 * @interface Hello
 */
export interface Hello {
  /**
   *
   * @type {string}
   * @memberof Hello
   */
  hello?: string;
  /**
   *
   * @type {string}
   * @memberof Hello
   */
  helloRsp?: string;
  /**
   *
   * @type {string}
   * @memberof Hello
   */
  now?: string;
}

/**
 * Check if a given object implements the Hello interface.
 */
export function instanceOfHello(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function HelloFromJSON(json: any): Hello {
  return HelloFromJSONTyped(json, false);
}

export function HelloFromJSONTyped(json: any, ignoreDiscriminator: boolean): Hello {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    hello: !exists(json, 'hello') ? undefined : json['hello'],
    helloRsp: !exists(json, 'helloRsp') ? undefined : json['helloRsp'],
    now: !exists(json, 'now') ? undefined : json['now'],
  };
}

export function HelloToJSON(value?: Hello | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    hello: value.hello,
    helloRsp: value.helloRsp,
    now: value.now,
  };
}