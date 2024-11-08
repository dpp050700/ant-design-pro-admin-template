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
import type { SpecialService } from './SpecialService';
import {
  SpecialServiceFromJSON,
  SpecialServiceFromJSONTyped,
  SpecialServiceToJSON,
} from './SpecialService';

/**
 *
 * @export
 * @interface SpecialServices
 */
export interface SpecialServices {
  /**
   *
   * @type {Array<SpecialService>}
   * @memberof SpecialServices
   */
  specialServices?: Array<SpecialService>;
  /**
   *
   * @type {number}
   * @memberof SpecialServices
   */
  total?: number;
}

/**
 * Check if a given object implements the SpecialServices interface.
 */
export function instanceOfSpecialServices(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function SpecialServicesFromJSON(json: any): SpecialServices {
  return SpecialServicesFromJSONTyped(json, false);
}

export function SpecialServicesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SpecialServices {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    specialServices: !exists(json, 'specialServices')
      ? undefined
      : (json['specialServices'] as Array<any>).map(SpecialServiceFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function SpecialServicesToJSON(value?: SpecialServices | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    specialServices:
      value.specialServices === undefined
        ? undefined
        : (value.specialServices as Array<any>).map(SpecialServiceToJSON),
    total: value.total,
  };
}