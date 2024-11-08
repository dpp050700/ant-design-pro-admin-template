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
import type { OrderIDRsp } from './OrderIDRsp';
import { OrderIDRspFromJSON, OrderIDRspFromJSONTyped, OrderIDRspToJSON } from './OrderIDRsp';

/**
 *
 * @export
 * @interface OrderIdListRsp
 */
export interface OrderIdListRsp {
  /**
   *
   * @type {Array<OrderIDRsp>}
   * @memberof OrderIdListRsp
   */
  ids?: Array<OrderIDRsp>;
}

/**
 * Check if a given object implements the OrderIdListRsp interface.
 */
export function instanceOfOrderIdListRsp(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function OrderIdListRspFromJSON(json: any): OrderIdListRsp {
  return OrderIdListRspFromJSONTyped(json, false);
}

export function OrderIdListRspFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): OrderIdListRsp {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    ids: !exists(json, 'ids') ? undefined : (json['ids'] as Array<any>).map(OrderIDRspFromJSON),
  };
}

export function OrderIdListRspToJSON(value?: OrderIdListRsp | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    ids: value.ids === undefined ? undefined : (value.ids as Array<any>).map(OrderIDRspToJSON),
  };
}
