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
import type { StoryComment } from './StoryComment';
import {
  StoryCommentFromJSON,
  StoryCommentFromJSONTyped,
  StoryCommentToJSON,
} from './StoryComment';

/**
 *
 * @export
 * @interface StoryServiceCreateCommentBody
 */
export interface StoryServiceCreateCommentBody {
  /**
   *
   * @type {StoryComment}
   * @memberof StoryServiceCreateCommentBody
   */
  comment: StoryComment;
}

/**
 * Check if a given object implements the StoryServiceCreateCommentBody interface.
 */
export function instanceOfStoryServiceCreateCommentBody(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'comment' in value;

  return isInstance;
}

export function StoryServiceCreateCommentBodyFromJSON(json: any): StoryServiceCreateCommentBody {
  return StoryServiceCreateCommentBodyFromJSONTyped(json, false);
}

export function StoryServiceCreateCommentBodyFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): StoryServiceCreateCommentBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    comment: StoryCommentFromJSON(json['comment']),
  };
}

export function StoryServiceCreateCommentBodyToJSON(
  value?: StoryServiceCreateCommentBody | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    comment: StoryCommentToJSON(value.comment),
  };
}
