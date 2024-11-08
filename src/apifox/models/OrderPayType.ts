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
 *
 * @export
 */
export const OrderPayType = {
  OrderPayTypeOffline: 'OrderPayTypeOffline',
  OrderPayTypeStripe: 'OrderPayTypeStripe',
  OrderPayTypeWeb3: 'OrderPayTypeWeb3',
} as const;
export type OrderPayType = (typeof OrderPayType)[keyof typeof OrderPayType];

export function OrderPayTypeFromJSON(json: any): OrderPayType {
  return OrderPayTypeFromJSONTyped(json, false);
}

export function OrderPayTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderPayType {
  return json as OrderPayType;
}

export function OrderPayTypeToJSON(value?: OrderPayType | null): any {
  return value as any;
}