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
import type { V1Tag } from './V1Tag';
import { V1TagFromJSON, V1TagFromJSONTyped, V1TagToJSON } from './V1Tag';

/**
 *
 * @export
 * @interface Tags
 */
export interface Tags {
  /**
   *
   * @type {Array<V1Tag>}
   * @memberof Tags
   */
  data?: Array<V1Tag>;
  /**
   *
   * @type {number}
   * @memberof Tags
   */
  total?: number;
}

/**
 * Check if a given object implements the Tags interface.
 */
export function instanceOfTags(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function TagsFromJSON(json: any): Tags {
  return TagsFromJSONTyped(json, false);
}

export function TagsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tags {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data: !exists(json, 'data') ? undefined : (json['data'] as Array<any>).map(V1TagFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function TagsToJSON(value?: Tags | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data: value.data === undefined ? undefined : (value.data as Array<any>).map(V1TagToJSON),
    total: value.total,
  };
}