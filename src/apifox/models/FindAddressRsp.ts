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
 * @interface FindAddressRsp
 */
export interface FindAddressRsp {
  /**
   *
   * @type {Array<Address>}
   * @memberof FindAddressRsp
   */
  addresses?: Array<Address>;
}

/**
 * Check if a given object implements the FindAddressRsp interface.
 */
export function instanceOfFindAddressRsp(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function FindAddressRspFromJSON(json: any): FindAddressRsp {
  return FindAddressRspFromJSONTyped(json, false);
}

export function FindAddressRspFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FindAddressRsp {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    addresses: !exists(json, 'addresses')
      ? undefined
      : (json['addresses'] as Array<any>).map(AddressFromJSON),
  };
}

export function FindAddressRspToJSON(value?: FindAddressRsp | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    addresses:
      value.addresses === undefined
        ? undefined
        : (value.addresses as Array<any>).map(AddressToJSON),
  };
}
