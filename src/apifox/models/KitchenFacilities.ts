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
 * @interface KitchenFacilities
 */
export interface KitchenFacilities {
  /**
   *
   * @type {boolean}
   * @memberof KitchenFacilities
   */
  refrigerator: boolean;
  /**
   *
   * @type {boolean}
   * @memberof KitchenFacilities
   */
  kettle: boolean;
  /**
   *
   * @type {boolean}
   * @memberof KitchenFacilities
   */
  kitchenRange: boolean;
  /**
   *
   * @type {boolean}
   * @memberof KitchenFacilities
   */
  microwaveOven: boolean;
}

/**
 * Check if a given object implements the KitchenFacilities interface.
 */
export function instanceOfKitchenFacilities(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'refrigerator' in value;
  isInstance = isInstance && 'kettle' in value;
  isInstance = isInstance && 'kitchenRange' in value;
  isInstance = isInstance && 'microwaveOven' in value;

  return isInstance;
}

export function KitchenFacilitiesFromJSON(json: any): KitchenFacilities {
  return KitchenFacilitiesFromJSONTyped(json, false);
}

export function KitchenFacilitiesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): KitchenFacilities {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    refrigerator: json['refrigerator'],
    kettle: json['kettle'],
    kitchenRange: json['kitchenRange'],
    microwaveOven: json['microwaveOven'],
  };
}

export function KitchenFacilitiesToJSON(value?: KitchenFacilities | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    refrigerator: value.refrigerator,
    kettle: value.kettle,
    kitchenRange: value.kitchenRange,
    microwaveOven: value.microwaveOven,
  };
}
