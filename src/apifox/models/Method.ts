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
export const Method = {
  UnknownMethod: 'unknown_method',
  Get: 'get',
  Post: 'post',
} as const;
export type Method = (typeof Method)[keyof typeof Method];

export function MethodFromJSON(json: any): Method {
  return MethodFromJSONTyped(json, false);
}

export function MethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): Method {
  return json as Method;
}

export function MethodToJSON(value?: Method | null): any {
  return value as any;
}
