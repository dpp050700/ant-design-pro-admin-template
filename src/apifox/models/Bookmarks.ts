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
 * @interface Bookmarks
 */
export interface Bookmarks {
  /**
   *
   * @type {Array<Bookmark>}
   * @memberof Bookmarks
   */
  bookmarks?: Array<Bookmark>;
  /**
   *
   * @type {number}
   * @memberof Bookmarks
   */
  total?: number;
}

/**
 * Check if a given object implements the Bookmarks interface.
 */
export function instanceOfBookmarks(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function BookmarksFromJSON(json: any): Bookmarks {
  return BookmarksFromJSONTyped(json, false);
}

export function BookmarksFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bookmarks {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    bookmarks: !exists(json, 'bookmarks')
      ? undefined
      : (json['bookmarks'] as Array<any>).map(BookmarkFromJSON),
    total: !exists(json, 'total') ? undefined : json['total'],
  };
}

export function BookmarksToJSON(value?: Bookmarks | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    bookmarks:
      value.bookmarks === undefined
        ? undefined
        : (value.bookmarks as Array<any>).map(BookmarkToJSON),
    total: value.total,
  };
}