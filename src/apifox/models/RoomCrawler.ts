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
import type { KindType } from './KindType';
import { KindTypeFromJSON, KindTypeFromJSONTyped, KindTypeToJSON } from './KindType';
import type { Room } from './Room';
import { RoomFromJSON, RoomFromJSONTyped, RoomToJSON } from './Room';
import type { RoomCrawlerDetail } from './RoomCrawlerDetail';
import {
  RoomCrawlerDetailFromJSON,
  RoomCrawlerDetailFromJSONTyped,
  RoomCrawlerDetailToJSON,
} from './RoomCrawlerDetail';
import type { StatusStatus } from './StatusStatus';
import {
  StatusStatusFromJSON,
  StatusStatusFromJSONTyped,
  StatusStatusToJSON,
} from './StatusStatus';

/**
 *
 * @export
 * @interface RoomCrawler
 */
export interface RoomCrawler {
  /**
   *
   * @type {string}
   * @memberof RoomCrawler
   */
  url?: string;
  /**
   *
   * @type {string}
   * @memberof RoomCrawler
   */
  readonly roomId?: string | null;
  /**
   *
   * @type {Array<Room>}
   * @memberof RoomCrawler
   */
  readonly room?: Array<Room>;
  /**
   *
   * @type {StatusStatus}
   * @memberof RoomCrawler
   */
  status?: StatusStatus;
  /**
   *
   * @type {string}
   * @memberof RoomCrawler
   */
  readonly id?: string | null;
  /**
   *
   * @type {RoomCrawlerDetail}
   * @memberof RoomCrawler
   */
  detail?: RoomCrawlerDetail;
  /**
   *
   * @type {Date}
   * @memberof RoomCrawler
   */
  readonly createdAt?: Date | null;
  /**
   *
   * @type {Date}
   * @memberof RoomCrawler
   */
  readonly updatedAt?: Date | null;
  /**
   *
   * @type {string}
   * @memberof RoomCrawler
   */
  name?: string | null;
  /**
   *
   * @type {KindType}
   * @memberof RoomCrawler
   */
  kind?: KindType;
}

/**
 * Check if a given object implements the RoomCrawler interface.
 */
export function instanceOfRoomCrawler(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RoomCrawlerFromJSON(json: any): RoomCrawler {
  return RoomCrawlerFromJSONTyped(json, false);
}

export function RoomCrawlerFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomCrawler {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    url: !exists(json, 'url') ? undefined : json['url'],
    roomId: !exists(json, 'roomId') ? undefined : json['roomId'],
    room: !exists(json, 'room') ? undefined : (json['room'] as Array<any>).map(RoomFromJSON),
    status: !exists(json, 'status') ? undefined : StatusStatusFromJSON(json['status']),
    id: !exists(json, 'id') ? undefined : json['id'],
    detail: !exists(json, 'detail') ? undefined : RoomCrawlerDetailFromJSON(json['detail']),
    createdAt: !exists(json, 'createdAt')
      ? undefined
      : json['createdAt'] === null
      ? null
      : new Date(json['createdAt']),
    updatedAt: !exists(json, 'updatedAt')
      ? undefined
      : json['updatedAt'] === null
      ? null
      : new Date(json['updatedAt']),
    name: !exists(json, 'name') ? undefined : json['name'],
    kind: !exists(json, 'kind') ? undefined : KindTypeFromJSON(json['kind']),
  };
}

export function RoomCrawlerToJSON(value?: RoomCrawler | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    url: value.url,
    status: StatusStatusToJSON(value.status),
    detail: RoomCrawlerDetailToJSON(value.detail),
    name: value.name,
    kind: KindTypeToJSON(value.kind),
  };
}
