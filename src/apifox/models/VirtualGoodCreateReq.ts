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
import type { Language } from './Language';
import { LanguageFromJSON, LanguageFromJSONTyped, LanguageToJSON } from './Language';
import type { VirtualGoodDetail } from './VirtualGoodDetail';
import {
  VirtualGoodDetailFromJSON,
  VirtualGoodDetailFromJSONTyped,
  VirtualGoodDetailToJSON,
} from './VirtualGoodDetail';
import type { VirtualGoodKind } from './VirtualGoodKind';
import {
  VirtualGoodKindFromJSON,
  VirtualGoodKindFromJSONTyped,
  VirtualGoodKindToJSON,
} from './VirtualGoodKind';
import type { VirtualGoodType } from './VirtualGoodType';
import {
  VirtualGoodTypeFromJSON,
  VirtualGoodTypeFromJSONTyped,
  VirtualGoodTypeToJSON,
} from './VirtualGoodType';

/**
 *
 * @export
 * @interface VirtualGoodCreateReq
 */
export interface VirtualGoodCreateReq {
  /**
   *
   * @type {string}
   * @memberof VirtualGoodCreateReq
   */
  name?: string;
  /**
   *
   * @type {Language}
   * @memberof VirtualGoodCreateReq
   */
  language?: Language;
  /**
   *
   * @type {string}
   * @memberof VirtualGoodCreateReq
   */
  thumbnail?: string | null;
  /**
   *
   * @type {VirtualGoodKind}
   * @memberof VirtualGoodCreateReq
   */
  kind?: VirtualGoodKind;
  /**
   *
   * @type {number}
   * @memberof VirtualGoodCreateReq
   */
  points?: number | null;
  /**
   *
   * @type {string}
   * @memberof VirtualGoodCreateReq
   */
  description?: string | null;
  /**
   *
   * @type {VirtualGoodDetail}
   * @memberof VirtualGoodCreateReq
   */
  detail?: VirtualGoodDetail;
  /**
   *
   * @type {VirtualGoodType}
   * @memberof VirtualGoodCreateReq
   */
  type?: VirtualGoodType;
  /**
   *
   * @type {number}
   * @memberof VirtualGoodCreateReq
   */
  count?: number | null;
}

/**
 * Check if a given object implements the VirtualGoodCreateReq interface.
 */
export function instanceOfVirtualGoodCreateReq(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function VirtualGoodCreateReqFromJSON(json: any): VirtualGoodCreateReq {
  return VirtualGoodCreateReqFromJSONTyped(json, false);
}

export function VirtualGoodCreateReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): VirtualGoodCreateReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, 'name') ? undefined : json['name'],
    language: !exists(json, 'language') ? undefined : LanguageFromJSON(json['language']),
    thumbnail: !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
    kind: !exists(json, 'kind') ? undefined : VirtualGoodKindFromJSON(json['kind']),
    points: !exists(json, 'points') ? undefined : json['points'],
    description: !exists(json, 'description') ? undefined : json['description'],
    detail: !exists(json, 'detail') ? undefined : VirtualGoodDetailFromJSON(json['detail']),
    type: !exists(json, 'type') ? undefined : VirtualGoodTypeFromJSON(json['type']),
    count: !exists(json, 'count') ? undefined : json['count'],
  };
}

export function VirtualGoodCreateReqToJSON(value?: VirtualGoodCreateReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    language: LanguageToJSON(value.language),
    thumbnail: value.thumbnail,
    kind: VirtualGoodKindToJSON(value.kind),
    points: value.points,
    description: value.description,
    detail: VirtualGoodDetailToJSON(value.detail),
    type: VirtualGoodTypeToJSON(value.type),
    count: value.count,
  };
}
