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
export const ResKind = {
  Room: 'room',
  Story: 'story',
} as const;
export type ResKind = (typeof ResKind)[keyof typeof ResKind];

export function ResKindFromJSON(json: any): ResKind {
  return ResKindFromJSONTyped(json, false);
}

export function ResKindFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResKind {
  return json as ResKind;
}

export function ResKindToJSON(value?: ResKind | null): any {
  return value as any;
}
