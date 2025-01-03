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
import type { VirtualGood } from './VirtualGood';
import { VirtualGoodFromJSON, VirtualGoodFromJSONTyped, VirtualGoodToJSON } from './VirtualGood';

/**
 *
 * @export
 * @interface VirtualGoods
 */
export interface VirtualGoods {
  /**
   *
   * @type {Array<VirtualGood>}
   * @memberof VirtualGoods
   */
  goods?: Array<VirtualGood>;
  /**
   *
   * @type {number}
   * @memberof VirtualGoods
   */
  total?: number;
}

/**
 * Check if a given object implements the VirtualGoods interface.
 */
export function instanceOfVirtualGoods(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function VirtualGoodsFromJSON(json: any): VirtualGoods {
  return VirtualGoodsFromJSONTyped(json, false);
}

export function VirtualGoodsFromJSONTyped(json: any, ignoreDiscriminator: boolean): VirtualGoods {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    goods: !exists(json, 'goods')
      ? undefined
      : (json['goods'] as Array<any>).map(VirtualGoodFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function VirtualGoodsToJSON(value?: VirtualGoods | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    goods:
      value.goods === undefined ? undefined : (value.goods as Array<any>).map(VirtualGoodToJSON),
    total: value.total,
  };
}
