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
import type { Address } from './Address';
import { AddressFromJSON, AddressFromJSONTyped, AddressToJSON } from './Address';

/**
 *
 * @export
 * @interface SaveAddressReq
 */
export interface SaveAddressReq {
  /**
   *
   * @type {Address}
   * @memberof SaveAddressReq
   */
  address?: Address;
  /**
   *
   * @type {string}
   * @memberof SaveAddressReq
   */
  id?: string | null;
}

/**
 * Check if a given object implements the SaveAddressReq interface.
 */
export function instanceOfSaveAddressReq(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function SaveAddressReqFromJSON(json: any): SaveAddressReq {
  return SaveAddressReqFromJSONTyped(json, false);
}

export function SaveAddressReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SaveAddressReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    address: !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
    id: !exists(json, 'id') ? undefined : json['id'],
  };
}

export function SaveAddressReqToJSON(value?: SaveAddressReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    address: AddressToJSON(value.address),
    id: value.id,
  };
}