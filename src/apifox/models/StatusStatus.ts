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
export const StatusStatus = {
  Pending: 'pending',
  Processing: 'processing',
  Success: 'success',
  Failed: 'failed',
} as const;
export type StatusStatus = (typeof StatusStatus)[keyof typeof StatusStatus];

export function StatusStatusFromJSON(json: any): StatusStatus {
  return StatusStatusFromJSONTyped(json, false);
}

export function StatusStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatusStatus {
  return json as StatusStatus;
}

export function StatusStatusToJSON(value?: StatusStatus | null): any {
  return value as any;
}
