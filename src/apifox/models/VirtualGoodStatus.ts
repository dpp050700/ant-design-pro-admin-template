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
export const VirtualGoodStatus = {
  Enabled: 'status_enabled',
  Disabled: 'status_disabled',
} as const;
export type VirtualGoodStatus = (typeof VirtualGoodStatus)[keyof typeof VirtualGoodStatus];

export function VirtualGoodStatusFromJSON(json: any): VirtualGoodStatus {
  return VirtualGoodStatusFromJSONTyped(json, false);
}

export function VirtualGoodStatusFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): VirtualGoodStatus {
  return json as VirtualGoodStatus;
}

export function VirtualGoodStatusToJSON(value?: VirtualGoodStatus | null): any {
  return value as any;
}
