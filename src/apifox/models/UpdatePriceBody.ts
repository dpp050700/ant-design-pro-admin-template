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
 * @interface UpdatePriceBody
 */
export interface UpdatePriceBody {
  /**
   *
   * @type {number}
   * @memberof UpdatePriceBody
   */
  roomPrice?: number;
  /**
   *
   * @type {number}
   * @memberof UpdatePriceBody
   */
  weekendPrice?: number;
  /**
   *
   * @type {number}
   * @memberof UpdatePriceBody
   */
  minStayDays?: number | null;
}

/**
 * Check if a given object implements the UpdatePriceBody interface.
 */
export function instanceOfUpdatePriceBody(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function UpdatePriceBodyFromJSON(json: any): UpdatePriceBody {
  return UpdatePriceBodyFromJSONTyped(json, false);
}

export function UpdatePriceBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UpdatePriceBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    roomPrice: !exists(json, 'roomPrice') ? undefined : json['roomPrice'],
    weekendPrice: !exists(json, 'weekendPrice') ? undefined : json['weekendPrice'],
    minStayDays: !exists(json, 'minStayDays') ? undefined : json['minStayDays'],
  };
}

export function UpdatePriceBodyToJSON(value?: UpdatePriceBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    roomPrice: value.roomPrice,
    weekendPrice: value.weekendPrice,
    minStayDays: value.minStayDays,
  };
}
