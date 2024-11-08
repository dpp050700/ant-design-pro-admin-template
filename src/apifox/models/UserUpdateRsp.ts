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
 * @interface UserUpdateRsp
 */
export interface UserUpdateRsp {
  /**
   *
   * @type {boolean}
   * @memberof UserUpdateRsp
   */
  reward?: boolean;
}

/**
 * Check if a given object implements the UserUpdateRsp interface.
 */
export function instanceOfUserUpdateRsp(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UserUpdateRspFromJSON(json: any): UserUpdateRsp {
  return UserUpdateRspFromJSONTyped(json, false);
}

export function UserUpdateRspFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserUpdateRsp {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    reward: !exists(json, 'reward') ? undefined : json['reward'],
  };
}

export function UserUpdateRspToJSON(value?: UserUpdateRsp | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    reward: value.reward,
  };
}
