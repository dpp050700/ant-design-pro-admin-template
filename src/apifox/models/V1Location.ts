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
 * @interface V1Location
 */
export interface V1Location {
  /**
   *
   * @type {string}
   * @memberof V1Location
   */
  country?: string;
  /**
   *
   * @type {string}
   * @memberof V1Location
   */
  city?: string;
}

/**
 * Check if a given object implements the V1Location interface.
 */
export function instanceOfV1Location(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function V1LocationFromJSON(json: any): V1Location {
  return V1LocationFromJSONTyped(json, false);
}

export function V1LocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1Location {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    country: !exists(json, 'country') ? undefined : json['country'],
    city: !exists(json, 'city') ? undefined : json['city'],
  };
}

export function V1LocationToJSON(value?: V1Location | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    country: value.country,
    city: value.city,
  };
}
