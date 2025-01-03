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
 * @interface RoomCreateReq
 */
export interface RoomCreateReq {
  /**
   *
   * @type {Room}
   * @memberof RoomCreateReq
   */
  room: Room;
}

/**
 * Check if a given object implements the RoomCreateReq interface.
 */
export function instanceOfRoomCreateReq(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'room' in value;

  return isInstance;
}

export function RoomCreateReqFromJSON(json: any): RoomCreateReq {
  return RoomCreateReqFromJSONTyped(json, false);
}

export function RoomCreateReqFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomCreateReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    room: RoomFromJSON(json['room']),
  };
}

export function RoomCreateReqToJSON(value?: RoomCreateReq | null): any {
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
