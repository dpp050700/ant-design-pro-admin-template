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
import type { Room } from './Room';
import { RoomFromJSON, RoomFromJSONTyped, RoomToJSON } from './Room';

/**
 *
 * @export
 * @interface RoomAdminServiceUpdateBody
 */
export interface RoomAdminServiceUpdateBody {
  /**
   *
   * @type {Room}
   * @memberof RoomAdminServiceUpdateBody
   */
  room: Room;
}

/**
 * Check if a given object implements the RoomAdminServiceUpdateBody interface.
 */
export function instanceOfRoomAdminServiceUpdateBody(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'room' in value;

  return isInstance;
}

export function RoomAdminServiceUpdateBodyFromJSON(json: any): RoomAdminServiceUpdateBody {
  return RoomAdminServiceUpdateBodyFromJSONTyped(json, false);
}

export function RoomAdminServiceUpdateBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RoomAdminServiceUpdateBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    room: RoomFromJSON(json['room']),
  };
}

export function RoomAdminServiceUpdateBodyToJSON(value?: RoomAdminServiceUpdateBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    room: RoomToJSON(value.room),
  };
}
