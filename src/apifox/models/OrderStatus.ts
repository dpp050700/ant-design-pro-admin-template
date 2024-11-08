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

/**
 * 检查是否可以放房间
 *  - pending: 待入住
 *  - checked_in: 已入住
 *  - finished: 已完成
 *
 * 用户主动完成或者订单到期后自动完成
 *  - checked_out: 退房
 *  - failed: 订单失败状态
 *  - canceled_ok: 取消成功
 * @export
 */
export const OrderStatus = {
  Created: 'created',
  Paying: 'paying',
  InPayment: 'in_payment',
  Canceled: 'canceled',
  Auditing: 'auditing',
  Pending: 'pending',
  CheckedIn: 'checked_in',
  Finished: 'finished',
  CheckedOut: 'checked_out',
  Failed: 'failed',
  CanceledOk: 'canceled_ok',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export function OrderStatusFromJSON(json: any): OrderStatus {
  return OrderStatusFromJSONTyped(json, false);
}

export function OrderStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderStatus {
  return json as OrderStatus;
}

export function OrderStatusToJSON(value?: OrderStatus | null): any {
  return value as any;
}
