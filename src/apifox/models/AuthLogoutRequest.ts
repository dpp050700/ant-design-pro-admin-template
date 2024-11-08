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
 * @interface AuthLogoutRequest
 */
export interface AuthLogoutRequest {
  /**
   *
   * @type {string}
   * @memberof AuthLogoutRequest
   */
  token: string;
}

/**
 * Check if a given object implements the AuthLogoutRequest interface.
 */
export function instanceOfAuthLogoutRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'token' in value;

  return isInstance;
}

export function AuthLogoutRequestFromJSON(json: any): AuthLogoutRequest {
  return AuthLogoutRequestFromJSONTyped(json, false);
}

export function AuthLogoutRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): AuthLogoutRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    token: json['token'],
  };
}

export function AuthLogoutRequestToJSON(value?: AuthLogoutRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    token: value.token,
  };
}