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
 * @interface Details
 */
export interface Details {
  /**
   *
   * @type {Date}
   * @memberof Details
   */
  inviteRewardTime?: Date;
  /**
   *
   * @type {Date}
   * @memberof Details
   */
  firstOrderTime?: Date;
  /**
   *
   * @type {Date}
   * @memberof Details
   */
  completeProfileTime?: Date;
}

/**
 * Check if a given object implements the Details interface.
 */
export function instanceOfDetails(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function DetailsFromJSON(json: any): Details {
  return DetailsFromJSONTyped(json, false);
}

export function DetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Details {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    inviteRewardTime: !exists(json, 'inviteRewardTime')
      ? undefined
      : new Date(json['inviteRewardTime']),
    firstOrderTime: !exists(json, 'firstOrderTime') ? undefined : new Date(json['firstOrderTime']),
    completeProfileTime: !exists(json, 'completeProfileTime')
      ? undefined
      : new Date(json['completeProfileTime']),
  };
}

export function DetailsToJSON(value?: Details | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    inviteRewardTime:
      value.inviteRewardTime === undefined ? undefined : value.inviteRewardTime.toISOString(),
    firstOrderTime:
      value.firstOrderTime === undefined ? undefined : value.firstOrderTime.toISOString(),
    completeProfileTime:
      value.completeProfileTime === undefined ? undefined : value.completeProfileTime.toISOString(),
  };
}
