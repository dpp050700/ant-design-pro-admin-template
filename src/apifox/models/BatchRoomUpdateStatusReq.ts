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
 * @interface BatchRoomUpdateStatusReq
 */
export interface BatchRoomUpdateStatusReq {
  /**
   *
   * @type {string}
   * @memberof BatchRoomUpdateStatusReq
   */
  status?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof BatchRoomUpdateStatusReq
   */
  ids?: Array<string>;
}

/**
 * Check if a given object implements the BatchRoomUpdateStatusReq interface.
 */
export function instanceOfBatchRoomUpdateStatusReq(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function BatchRoomUpdateStatusReqFromJSON(json: any): BatchRoomUpdateStatusReq {
  return BatchRoomUpdateStatusReqFromJSONTyped(json, false);
}

export function BatchRoomUpdateStatusReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BatchRoomUpdateStatusReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    status: !exists(json, 'status') ? undefined : json['status'],
    ids: !exists(json, 'ids') ? undefined : json['ids'],
  };
}

export function BatchRoomUpdateStatusReqToJSON(value?: BatchRoomUpdateStatusReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    status: value.status,
    ids: value.ids,
  };
}
