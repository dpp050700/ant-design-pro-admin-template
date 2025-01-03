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
import type { OrderDetail } from './OrderDetail';
import { OrderDetailFromJSON, OrderDetailFromJSONTyped, OrderDetailToJSON } from './OrderDetail';
import type { OrderStatus } from './OrderStatus';
import { OrderStatusFromJSON, OrderStatusFromJSONTyped, OrderStatusToJSON } from './OrderStatus';
import type { Room } from './Room';
import { RoomFromJSON, RoomFromJSONTyped, RoomToJSON } from './Room';
import type { RoomComment } from './RoomComment';
import { RoomCommentFromJSON, RoomCommentFromJSONTyped, RoomCommentToJSON } from './RoomComment';
import type { SpecialOrder } from './SpecialOrder';
import {
  SpecialOrderFromJSON,
  SpecialOrderFromJSONTyped,
  SpecialOrderToJSON,
} from './SpecialOrder';
import type { UserInfo } from './UserInfo';
import { UserInfoFromJSON, UserInfoFromJSONTyped, UserInfoToJSON } from './UserInfo';

/**
 *
 * @export
 * @interface Order
 */
export interface Order {
  /**
   *
   * @type {string}
   * @memberof Order
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  startDate: Date;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  endDate: Date;
  /**
   *
   * @type {OrderStatus}
   * @memberof Order
   */
  status: OrderStatus;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  readonly roomCommentId: string | null;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  roomId: string;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  userId: string;
  /**
   *
   * @type {OrderDetail}
   * @memberof Order
   */
  detail?: OrderDetail;
  /**
   *
   * @type {Array<SpecialOrder>}
   * @memberof Order
   */
  readonly specialOrders?: Array<SpecialOrder>;
  /**
   *
   * @type {Room}
   * @memberof Order
   */
  room?: Room;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  readonly cancellableTime?: Date;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  shareId?: string | null;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  readonly failedReason?: string | null;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  readonly timeoutTime?: Date;
  /**
   *
   * @type {RoomComment}
   * @memberof Order
   */
  comment: RoomComment;
  /**
   *
   * @type {string}
   * @memberof Order
   */
  readonly payId?: string;
  /**
   *
   * @type {Date}
   * @memberof Order
   */
  readonly confirmedTime?: Date;
  /**
   *
   * @type {UserInfo}
   * @memberof Order
   */
  user?: UserInfo;
}

/**
 * Check if a given object implements the Order interface.
 */
export function instanceOfOrder(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'startDate' in value;
  isInstance = isInstance && 'endDate' in value;
  isInstance = isInstance && 'status' in value;
  isInstance = isInstance && 'roomCommentId' in value;
  isInstance = isInstance && 'roomId' in value;
  isInstance = isInstance && 'userId' in value;
  isInstance = isInstance && 'comment' in value;

  return isInstance;
}

export function OrderFromJSON(json: any): Order {
  return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    startDate: new Date(json['startDate']),
    endDate: new Date(json['endDate']),
    status: OrderStatusFromJSON(json['status']),
    roomCommentId: json['roomCommentId'],
    roomId: json['roomId'],
    userId: json['userId'],
    detail: !exists(json, 'detail') ? undefined : OrderDetailFromJSON(json['detail']),
    specialOrders: !exists(json, 'specialOrders')
      ? undefined
      : (json['specialOrders'] as Array<any>).map(SpecialOrderFromJSON),
    room: !exists(json, 'room') ? undefined : RoomFromJSON(json['room']),
    cancellableTime: !exists(json, 'cancellableTime')
      ? undefined
      : new Date(json['cancellableTime']),
    shareId: !exists(json, 'shareId') ? undefined : json['shareId'],
    failedReason: !exists(json, 'failedReason') ? undefined : json['failedReason'],
    timeoutTime: !exists(json, 'timeoutTime') ? undefined : new Date(json['timeoutTime']),
    comment: RoomCommentFromJSON(json['comment']),
    payId: !exists(json, 'payId') ? undefined : json['payId'],
    confirmedTime: !exists(json, 'confirmedTime') ? undefined : new Date(json['confirmedTime']),
    user: !exists(json, 'user') ? undefined : UserInfoFromJSON(json['user']),
  };
}

export function OrderToJSON(value?: Order | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    startDate: value.startDate.toISOString(),
    endDate: value.endDate.toISOString(),
    status: OrderStatusToJSON(value.status),
    roomId: value.roomId,
    userId: value.userId,
    detail: OrderDetailToJSON(value.detail),
    room: RoomToJSON(value.room),
    shareId: value.shareId,
    comment: RoomCommentToJSON(value.comment),
    user: UserInfoToJSON(value.user),
  };
}
