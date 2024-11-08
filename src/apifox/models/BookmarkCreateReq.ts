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
import type { Bookmark } from './Bookmark';
import { BookmarkFromJSON, BookmarkFromJSONTyped, BookmarkToJSON } from './Bookmark';

/**
 *
 * @export
 * @interface BookmarkCreateReq
 */
export interface BookmarkCreateReq {
  /**
   *
   * @type {Bookmark}
   * @memberof BookmarkCreateReq
   */
  bookmark?: Bookmark;
}

/**
 * Check if a given object implements the BookmarkCreateReq interface.
 */
export function instanceOfBookmarkCreateReq(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function BookmarkCreateReqFromJSON(json: any): BookmarkCreateReq {
  return BookmarkCreateReqFromJSONTyped(json, false);
}

export function BookmarkCreateReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): BookmarkCreateReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    bookmark: !exists(json, 'Bookmark') ? undefined : BookmarkFromJSON(json['Bookmark']),
  };
}

export function BookmarkCreateReqToJSON(value?: BookmarkCreateReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    Bookmark: BookmarkToJSON(value.bookmark),
  };
}
