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
export const StoryStatus = {
  AuditStatus: 'audit_status',
  PublishedStatus: 'published_status',
} as const;
export type StoryStatus = (typeof StoryStatus)[keyof typeof StoryStatus];

export function StoryStatusFromJSON(json: any): StoryStatus {
  return StoryStatusFromJSONTyped(json, false);
}

export function StoryStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): StoryStatus {
  return json as StoryStatus;
}

export function StoryStatusToJSON(value?: StoryStatus | null): any {
  return value as any;
}
