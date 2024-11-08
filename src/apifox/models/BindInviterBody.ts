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
 * @interface BindInviterBody
 */
export interface BindInviterBody {
  /**
   *
   * @type {string}
   * @memberof BindInviterBody
   */
  inviteCode?: string;
}

/**
 * Check if a given object implements the BindInviterBody interface.
 */
export function instanceOfBindInviterBody(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function BindInviterBodyFromJSON(json: any): BindInviterBody {
  return BindInviterBodyFromJSONTyped(json, false);
}

export function BindInviterBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BindInviterBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    inviteCode: !exists(json, 'inviteCode') ? undefined : json['inviteCode'],
  };
}

export function BindInviterBodyToJSON(value?: BindInviterBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    inviteCode: value.inviteCode,
  };
}