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
import type { AuthProvider } from './AuthProvider';
import {
  AuthProviderFromJSON,
  AuthProviderFromJSONTyped,
  AuthProviderToJSON,
} from './AuthProvider';

/**
 *
 * @export
 * @interface AuthorizeProviderRsp
 */
export interface AuthorizeProviderRsp {
  /**
   *
   * @type {Array<AuthProvider>}
   * @memberof AuthorizeProviderRsp
   */
  providers?: Array<AuthProvider>;
}

/**
 * Check if a given object implements the AuthorizeProviderRsp interface.
 */
export function instanceOfAuthorizeProviderRsp(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function AuthorizeProviderRspFromJSON(json: any): AuthorizeProviderRsp {
  return AuthorizeProviderRspFromJSONTyped(json, false);
}

export function AuthorizeProviderRspFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): AuthorizeProviderRsp {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    providers: !exists(json, 'providers')
      ? undefined
      : (json['providers'] as Array<any>).map(AuthProviderFromJSON),
  };
}

export function AuthorizeProviderRspToJSON(value?: AuthorizeProviderRsp | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    providers:
      value.providers === undefined
        ? undefined
        : (value.providers as Array<any>).map(AuthProviderToJSON),
  };
}
