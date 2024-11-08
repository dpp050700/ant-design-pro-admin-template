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

/**
 *
 * @export
 * @interface RoomInfraCatalogUpdateReq
 */
export interface RoomInfraCatalogUpdateReq {
  /**
   *
   * @type {string}
   * @memberof RoomInfraCatalogUpdateReq
   */
  catalogName?: string;
  /**
   *
   * @type {string}
   * @memberof RoomInfraCatalogUpdateReq
   */
  oldCatalogName?: string;
  /**
   *
   * @type {Language}
   * @memberof RoomInfraCatalogUpdateReq
   */
  language?: Language;
}

/**
 * Check if a given object implements the RoomInfraCatalogUpdateReq interface.
 */
export function instanceOfRoomInfraCatalogUpdateReq(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function RoomInfraCatalogUpdateReqFromJSON(json: any): RoomInfraCatalogUpdateReq {
  return RoomInfraCatalogUpdateReqFromJSONTyped(json, false);
}

export function RoomInfraCatalogUpdateReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RoomInfraCatalogUpdateReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    catalogName: !exists(json, 'catalogName') ? undefined : json['catalogName'],
    oldCatalogName: !exists(json, 'oldCatalogName') ? undefined : json['oldCatalogName'],
    language: !exists(json, 'language') ? undefined : LanguageFromJSON(json['language']),
  };
}

export function RoomInfraCatalogUpdateReqToJSON(value?: RoomInfraCatalogUpdateReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    catalogName: value.catalogName,
    oldCatalogName: value.oldCatalogName,
    language: LanguageToJSON(value.language),
  };
}