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
import type { Any } from './Any';
import { AnyFromJSON, AnyFromJSONTyped, AnyToJSON } from './Any';

/**
 * Message that represents an arbitrary HTTP body. It should only be used for
 * payload formats that can't be represented as JSON, such as raw binary or
 * an HTML page.
 *
 *
 * This message can be used both in streaming and non-streaming API methods in
 * the request as well as the response.
 *
 * It can be used as a top-level request field, which is convenient if one
 * wants to extract parameters from either the URL or HTTP template into the
 * request fields and also want access to the raw HTTP body.
 *
 * Example:
 *
 *     message GetResourceRequest {
 *       // A unique request id.
 *       string request_id = 1;
 *
 *       // The raw HTTP body is bound to this field.
 *       google.api.HttpBody http_body = 2;
 *
 *     }
 *
 *     service ResourceService {
 *       rpc GetResource(GetResourceRequest)
 *         returns (google.api.HttpBody);
 *       rpc UpdateResource(google.api.HttpBody)
 *         returns (google.protobuf.Empty);
 *
 *     }
 *
 * Example with streaming methods:
 *
 *     service CaldavService {
 *       rpc GetCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *       rpc UpdateCalendar(stream google.api.HttpBody)
 *         returns (stream google.api.HttpBody);
 *
 *     }
 *
 * Use of this type only changes how the request and response bodies are
 * handled, all other features will continue to work unchanged.
 * @export
 * @interface HttpBody
 */
export interface HttpBody {
  /**
   * The HTTP Content-Type header value specifying the content type of the body.
   * @type {string}
   * @memberof HttpBody
   */
  contentType?: string;
  /**
   * The HTTP request/response body as raw binary.
   * @type {string}
   * @memberof HttpBody
   */
  data?: string;
  /**
   * Application specific response metadata. Must be set in the first response
   * for streaming APIs.
   * @type {Array<Any>}
   * @memberof HttpBody
   */
  extensions?: Array<Any>;
}

/**
 * Check if a given object implements the HttpBody interface.
 */
export function instanceOfHttpBody(value: object): boolean {
  let isInstance = true;

  return isInstance;
}

export function HttpBodyFromJSON(json: any): HttpBody {
  return HttpBodyFromJSONTyped(json, false);
}

export function HttpBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): HttpBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    contentType: !exists(json, 'contentType') ? undefined : json['contentType'],
    data: !exists(json, 'data') ? undefined : json['data'],
    extensions: !exists(json, 'extensions')
      ? undefined
      : (json['extensions'] as Array<any>).map(AnyFromJSON),
  };
}

export function HttpBodyToJSON(value?: HttpBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    contentType: value.contentType,
    data: value.data,
    extensions:
      value.extensions === undefined ? undefined : (value.extensions as Array<any>).map(AnyToJSON),
  };
}
