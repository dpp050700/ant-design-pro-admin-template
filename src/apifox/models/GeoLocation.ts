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
 * @interface GeoLocation
 */
export interface GeoLocation {
  /**
   *
   * @type {number}
   * @memberof GeoLocation
   */
  latitude: number;
  /**
   *
   * @type {number}
   * @memberof GeoLocation
   */
  longitude: number;
}

/**
 * Check if a given object implements the GeoLocation interface.
 */
export function instanceOfGeoLocation(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'latitude' in value;
  isInstance = isInstance && 'longitude' in value;

  return isInstance;
}

export function GeoLocationFromJSON(json: any): GeoLocation {
  return GeoLocationFromJSONTyped(json, false);
}

export function GeoLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): GeoLocation {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    latitude: json['latitude'],
    longitude: json['longitude'],
  };
}

export function GeoLocationToJSON(value?: GeoLocation | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    latitude: value.latitude,
    longitude: value.longitude,
  };
}