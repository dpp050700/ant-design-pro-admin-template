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
 * @interface Rooms
 */
export interface Rooms {
  /**
   *
   * @type {Array<Room>}
   * @memberof Rooms
   */
  rooms?: Array<Room>;
  /**
   *
   * @type {number}
   * @memberof Rooms
   */
  total?: number;
}

/**
 * Check if a given object implements the Rooms interface.
 */
export function instanceOfRooms(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RoomsFromJSON(json: any): Rooms {
  return RoomsFromJSONTyped(json, false);
}

export function RoomsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Rooms {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    rooms: !exists(json, 'rooms') ? undefined : (json['rooms'] as Array<any>).map(RoomFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function RoomsToJSON(value?: Rooms | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    rooms: value.rooms === undefined ? undefined : (value.rooms as Array<any>).map(RoomToJSON),
    total: value.total,
  };
}