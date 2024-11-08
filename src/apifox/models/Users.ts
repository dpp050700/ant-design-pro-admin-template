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
import type { User } from './User';
import { UserFromJSON, UserFromJSONTyped, UserToJSON } from './User';

/**
 *
 * @export
 * @interface Users
 */
export interface Users {
  /**
   *
   * @type {Array<User>}
   * @memberof Users
   */
  users?: Array<User>;
  /**
   *
   * @type {number}
   * @memberof Users
   */
  total?: number;
}

/**
 * Check if a given object implements the Users interface.
 */
export function instanceOfUsers(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UsersFromJSON(json: any): Users {
  return UsersFromJSONTyped(json, false);
}

export function UsersFromJSONTyped(json: any, ignoreDiscriminator: boolean): Users {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    users: !exists(json, 'users') ? undefined : (json['users'] as Array<any>).map(UserFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function UsersToJSON(value?: Users | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    users: value.users === undefined ? undefined : (value.users as Array<any>).map(UserToJSON),
    total: value.total,
  };
}
