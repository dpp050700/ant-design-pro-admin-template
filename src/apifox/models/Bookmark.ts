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
import type { ResKind } from './ResKind';
import { ResKindFromJSON, ResKindFromJSONTyped, ResKindToJSON } from './ResKind';
import type { Room } from './Room';
import { RoomFromJSON, RoomFromJSONTyped, RoomToJSON } from './Room';
import type { Story } from './Story';
import { StoryFromJSON, StoryFromJSONTyped, StoryToJSON } from './Story';
import type { UserInfo } from './UserInfo';
import { UserInfoFromJSON, UserInfoFromJSONTyped, UserInfoToJSON } from './UserInfo';

/**
 *
 * @export
 * @interface Bookmark
 */
export interface Bookmark {
  /**
   *
   * @type {string}
   * @memberof Bookmark
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof Bookmark
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof Bookmark
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {UserInfo}
   * @memberof Bookmark
   */
  userInfo: UserInfo;
  /**
   *
   * @type {ResKind}
   * @memberof Bookmark
   */
  resKind: ResKind;
  /**
   *
   * @type {string}
   * @memberof Bookmark
   */
  resId: string;
  /**
   *
   * @type {string}
   * @memberof Bookmark
   */
  title?: string | null;
  /**
   *
   * @type {string}
   * @memberof Bookmark
   */
  description?: string | null;
  /**
   *
   * @type {string}
   * @memberof Bookmark
   */
  thumbnail?: string | null;
  /**
   *
   * @type {Story}
   * @memberof Bookmark
   */
  story?: Story;
  /**
   *
   * @type {Room}
   * @memberof Bookmark
   */
  room?: Room;
}

/**
 * Check if a given object implements the Bookmark interface.
 */
export function instanceOfBookmark(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'userInfo' in value;
  isInstance = isInstance && 'resKind' in value;
  isInstance = isInstance && 'resId' in value;

  return isInstance;
}

export function BookmarkFromJSON(json: any): Bookmark {
  return BookmarkFromJSONTyped(json, false);
}

export function BookmarkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bookmark {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    userInfo: UserInfoFromJSON(json['userInfo']),
    resKind: ResKindFromJSON(json['resKind']),
    resId: json['resId'],
    title: !exists(json, 'title') ? undefined : json['title'],
    description: !exists(json, 'description') ? undefined : json['description'],
    thumbnail: !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
    story: !exists(json, 'story') ? undefined : StoryFromJSON(json['story']),
    room: !exists(json, 'room') ? undefined : RoomFromJSON(json['room']),
  };
}

export function BookmarkToJSON(value?: Bookmark | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    userInfo: UserInfoToJSON(value.userInfo),
    resKind: ResKindToJSON(value.resKind),
    resId: value.resId,
    title: value.title,
    description: value.description,
    thumbnail: value.thumbnail,
    story: StoryToJSON(value.story),
    room: RoomToJSON(value.room),
  };
}
