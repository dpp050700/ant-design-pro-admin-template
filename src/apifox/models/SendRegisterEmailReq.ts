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
 * @interface SendRegisterEmailReq
 */
export interface SendRegisterEmailReq {
  /**
   *
   * @type {string}
   * @memberof SendRegisterEmailReq
   */
  email: string;
}

/**
 * Check if a given object implements the SendRegisterEmailReq interface.
 */
export function instanceOfSendRegisterEmailReq(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'email' in value;

  return isInstance;
}

export function SendRegisterEmailReqFromJSON(json: any): SendRegisterEmailReq {
  return SendRegisterEmailReqFromJSONTyped(json, false);
}

export function SendRegisterEmailReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SendRegisterEmailReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    email: json['email'],
  };
}

export function SendRegisterEmailReqToJSON(value?: SendRegisterEmailReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    email: value.email,
  };
}
