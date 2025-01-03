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
import type { PayInfo } from './PayInfo';
import { PayInfoFromJSON, PayInfoFromJSONTyped, PayInfoToJSON } from './PayInfo';
import type { Room } from './Room';
import { RoomFromJSON, RoomFromJSONTyped, RoomToJSON } from './Room';

/**
 *
 * @export
 * @interface OrderDetail
 */
export interface OrderDetail {
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  adultsCount?: number;
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  babyCount?: number;
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  childrenCount?: number;
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  serviceFee?: number;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  cancelReason?: string;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  customerName?: string;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  customerPhone?: string;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  totalExpense?: string;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  roomPrice?: string;
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  days?: number;
  /**
   *
   * @type {PayInfo}
   * @memberof OrderDetail
   */
  payInfo?: PayInfo;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  cancelOperator?: string | null;
  /**
   *
   * @type {number}
   * @memberof OrderDetail
   */
  localTaxFee?: number;
  /**
   *
   * @type {Room}
   * @memberof OrderDetail
   */
  snapRoom?: Room;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  readonly localOrderTotalExpense?: string | null;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  readonly localOrderTaxFee?: string | null;
  /**
   *
   * @type {string}
   * @memberof OrderDetail
   */
  readonly localOrderServiceFee?: string | null;
}

/**
 * Check if a given object implements the OrderDetail interface.
 */
export function instanceOfOrderDetail(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function OrderDetailFromJSON(json: any): OrderDetail {
  return OrderDetailFromJSONTyped(json, false);
}

export function OrderDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDetail {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    adultsCount: !exists(json, 'adultsCount') ? undefined : json['adultsCount'],
    babyCount: !exists(json, 'babyCount') ? undefined : json['babyCount'],
    childrenCount: !exists(json, 'childrenCount') ? undefined : json['childrenCount'],
    serviceFee: !exists(json, 'serviceFee') ? undefined : json['serviceFee'],
    cancelReason: !exists(json, 'cancelReason') ? undefined : json['cancelReason'],
    customerName: !exists(json, 'customerName') ? undefined : json['customerName'],
    customerPhone: !exists(json, 'customerPhone') ? undefined : json['customerPhone'],
    totalExpense: !exists(json, 'totalExpense') ? undefined : json['totalExpense'],
    roomPrice: !exists(json, 'roomPrice') ? undefined : json['roomPrice'],
    days: !exists(json, 'days') ? undefined : json['days'],
    payInfo: !exists(json, 'payInfo') ? undefined : PayInfoFromJSON(json['payInfo']),
    cancelOperator: !exists(json, 'cancelOperator') ? undefined : json['cancelOperator'],
    localTaxFee: !exists(json, 'localTaxFee') ? undefined : json['localTaxFee'],
    snapRoom: !exists(json, 'snapRoom') ? undefined : RoomFromJSON(json['snapRoom']),
    localOrderTotalExpense: !exists(json, 'localOrderTotalExpense')
      ? undefined
      : json['localOrderTotalExpense'],
    localOrderTaxFee: !exists(json, 'localOrderTaxFee') ? undefined : json['localOrderTaxFee'],
    localOrderServiceFee: !exists(json, 'localOrderServiceFee')
      ? undefined
      : json['localOrderServiceFee'],
  };
}

export function OrderDetailToJSON(value?: OrderDetail | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    adultsCount: value.adultsCount,
    babyCount: value.babyCount,
    childrenCount: value.childrenCount,
    serviceFee: value.serviceFee,
    cancelReason: value.cancelReason,
    customerName: value.customerName,
    customerPhone: value.customerPhone,
    totalExpense: value.totalExpense,
    roomPrice: value.roomPrice,
    days: value.days,
    payInfo: PayInfoToJSON(value.payInfo),
    cancelOperator: value.cancelOperator,
    localTaxFee: value.localTaxFee,
    snapRoom: RoomToJSON(value.snapRoom),
  };
}
