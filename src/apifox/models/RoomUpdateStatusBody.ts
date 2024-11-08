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
 * @interface RoomUpdateStatusBody
 */
export interface RoomUpdateStatusBody {
  /**
   *
   * @type {string}
   * @memberof RoomUpdateStatusBody
   */
  status?: string;
}

/**
 * Check if a given object implements the RoomUpdateStatusBody interface.
 */
export function instanceOfRoomUpdateStatusBody(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RoomUpdateStatusBodyFromJSON(json: any): RoomUpdateStatusBody {
  return RoomUpdateStatusBodyFromJSONTyped(json, false);
}

export function RoomUpdateStatusBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RoomUpdateStatusBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, 'status') ? undefined : json['status'],
  };
}

export function RoomUpdateStatusBodyToJSON(value?: RoomUpdateStatusBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: value.status,
  };
}