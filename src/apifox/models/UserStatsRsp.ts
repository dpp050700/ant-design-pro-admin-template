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
import type { UserInfo } from './UserInfo';
import { UserInfoFromJSON, UserInfoFromJSONTyped, UserInfoToJSON } from './UserInfo';

/**
 *
 * @export
 * @interface UserStatsRsp
 */
export interface UserStatsRsp {
  /**
   *
   * @type {Date}
   * @memberof UserStatsRsp
   */
  joinTime?: Date;
  /**
   *
   * @type {number}
   * @memberof UserStatsRsp
   */
  travelCount?: number;
  /**
   *
   * @type {number}
   * @memberof UserStatsRsp
   */
  sharingCount?: number;
  /**
   *
   * @type {Array<string>}
   * @memberof UserStatsRsp
   */
  scenic?: Array<string>;
  /**
   *
   * @type {UserInfo}
   * @memberof UserStatsRsp
   */
  user?: UserInfo;
}

/**
 * Check if a given object implements the UserStatsRsp interface.
 */
export function instanceOfUserStatsRsp(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UserStatsRspFromJSON(json: any): UserStatsRsp {
  return UserStatsRspFromJSONTyped(json, false);
}

export function UserStatsRspFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserStatsRsp {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    joinTime: !exists(json, 'joinTime') ? undefined : new Date(json['joinTime']),
    travelCount: !exists(json, 'travelCount') ? undefined : json['travelCount'],
    sharingCount: !exists(json, 'sharingCount') ? undefined : json['sharingCount'],
    scenic: !exists(json, 'scenic') ? undefined : json['scenic'],
    user: !exists(json, 'user') ? undefined : UserInfoFromJSON(json['user']),
  };
}

export function UserStatsRspToJSON(value?: UserStatsRsp | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    joinTime: value.joinTime === undefined ? undefined : value.joinTime.toISOString(),
    travelCount: value.travelCount,
    sharingCount: value.sharingCount,
    scenic: value.scenic,
    user: UserInfoToJSON(value.user),
  };
}
