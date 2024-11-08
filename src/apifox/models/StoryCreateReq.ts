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
import type { Story } from './Story';
import { StoryFromJSON, StoryFromJSONTyped, StoryToJSON } from './Story';

/**
 *
 * @export
 * @interface StoryCreateReq
 */
export interface StoryCreateReq {
  /**
   *
   * @type {Story}
   * @memberof StoryCreateReq
   */
  story: Story;
}

/**
 * Check if a given object implements the StoryCreateReq interface.
 */
export function instanceOfStoryCreateReq(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'story' in value;

  return isInstance;
}

export function StoryCreateReqFromJSON(json: any): StoryCreateReq {
  return StoryCreateReqFromJSONTyped(json, false);
}

export function StoryCreateReqFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): StoryCreateReq {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    story: StoryFromJSON(json['story']),
  };
}

export function StoryCreateReqToJSON(value?: StoryCreateReq | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    story: StoryToJSON(value.story),
  };
}
