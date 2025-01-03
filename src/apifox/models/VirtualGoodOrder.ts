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
import type { UserInfo } from './UserInfo';
import { UserInfoFromJSON, UserInfoFromJSONTyped, UserInfoToJSON } from './UserInfo';
import type { VirtualGood } from './VirtualGood';
import { VirtualGoodFromJSON, VirtualGoodFromJSONTyped, VirtualGoodToJSON } from './VirtualGood';
import type { VirtualGoodOrderDetail } from './VirtualGoodOrderDetail';
import {
  VirtualGoodOrderDetailFromJSON,
  VirtualGoodOrderDetailFromJSONTyped,
  VirtualGoodOrderDetailToJSON,
} from './VirtualGoodOrderDetail';
import type { VirtualGoodOrderStatus } from './VirtualGoodOrderStatus';
import {
  VirtualGoodOrderStatusFromJSON,
  VirtualGoodOrderStatusFromJSONTyped,
  VirtualGoodOrderStatusToJSON,
} from './VirtualGoodOrderStatus';
import type { VirtualGoodRaffle } from './VirtualGoodRaffle';
import {
  VirtualGoodRaffleFromJSON,
  VirtualGoodRaffleFromJSONTyped,
  VirtualGoodRaffleToJSON,
} from './VirtualGoodRaffle';

/**
 *
 * @export
 * @interface VirtualGoodOrder
 */
export interface VirtualGoodOrder {
  /**
   *
   * @type {string}
   * @memberof VirtualGoodOrder
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof VirtualGoodOrder
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof VirtualGoodOrder
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {VirtualGoodOrderDetail}
   * @memberof VirtualGoodOrder
   */
  detail?: VirtualGoodOrderDetail;
  /**
   *
   * @type {VirtualGoodOrderStatus}
   * @memberof VirtualGoodOrder
   */
  status: VirtualGoodOrderStatus;
  /**
   *
   * @type {Date}
   * @memberof VirtualGoodOrder
   */
  readonly usedAt?: Date;
  /**
   *
   * @type {UserInfo}
   * @memberof VirtualGoodOrder
   */
  user?: UserInfo;
  /**
   *
   * @type {VirtualGood}
   * @memberof VirtualGoodOrder
   */
  virtualGood?: VirtualGood;
  /**
   *
   * @type {VirtualGoodRaffle}
   * @memberof VirtualGoodOrder
   */
  virtualGoodRaffle?: VirtualGoodRaffle;
  /**
   *
   * @type {number}
   * @memberof VirtualGoodOrder
   */
  costPoint?: number;
  /**
   *
   * @type {string}
   * @memberof VirtualGoodOrder
   */
  virtualGoodSkuId?: string;
  /**
   *
   * @type {Address}
   * @memberof VirtualGoodOrder
   */
  address?: Address;
}

/**
 * Check if a given object implements the VirtualGoodOrder interface.
 */
export function instanceOfVirtualGoodOrder(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'status' in value;

  return isInstance;
}

export function VirtualGoodOrderFromJSON(json: any): VirtualGoodOrder {
  return VirtualGoodOrderFromJSONTyped(json, false);
}

export function VirtualGoodOrderFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): VirtualGoodOrder {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    detail: !exists(json, 'detail') ? undefined : VirtualGoodOrderDetailFromJSON(json['detail']),
    status: VirtualGoodOrderStatusFromJSON(json['status']),
    usedAt: !exists(json, 'usedAt') ? undefined : new Date(json['usedAt']),
    user: !exists(json, 'user') ? undefined : UserInfoFromJSON(json['user']),
    virtualGood: !exists(json, 'virtualGood')
      ? undefined
      : VirtualGoodFromJSON(json['virtualGood']),
    virtualGoodRaffle: !exists(json, 'virtualGoodRaffle')
      ? undefined
      : VirtualGoodRaffleFromJSON(json['virtualGoodRaffle']),
    costPoint: !exists(json, 'costPoint') ? undefined : json['costPoint'],
    virtualGoodSkuId: !exists(json, 'virtualGoodSkuId') ? undefined : json['virtualGoodSkuId'],
    address: !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
  };
}

export function VirtualGoodOrderToJSON(value?: VirtualGoodOrder | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    detail: VirtualGoodOrderDetailToJSON(value.detail),
    status: VirtualGoodOrderStatusToJSON(value.status),
    user: UserInfoToJSON(value.user),
    virtualGood: VirtualGoodToJSON(value.virtualGood),
    virtualGoodRaffle: VirtualGoodRaffleToJSON(value.virtualGoodRaffle),
    costPoint: value.costPoint,
    virtualGoodSkuId: value.virtualGoodSkuId,
    address: AddressToJSON(value.address),
  };
}
