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
import type { SpecialService } from './SpecialService';
import {
  SpecialServiceFromJSON,
  SpecialServiceFromJSONTyped,
  SpecialServiceToJSON,
} from './SpecialService';

/**
 *
 * @export
 * @interface SpecialServiceCatalog
 */
export interface SpecialServiceCatalog {
  /**
   *
   * @type {string}
   * @memberof SpecialServiceCatalog
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof SpecialServiceCatalog
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof SpecialServiceCatalog
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {string}
   * @memberof SpecialServiceCatalog
   */
  name: string | null;
  /**
   *
   * @type {string}
   * @memberof SpecialServiceCatalog
   */
  readonly price?: string | null;
  /**
   *
   * @type {string}
   * @memberof SpecialServiceCatalog
   */
  thumbnail?: string | null;
  /**
   *
   * @type {Array<string>}
   * @memberof SpecialServiceCatalog
   */
  headerImages?: Array<string>;
  /**
   *
   * @type {Array<SpecialService>}
   * @memberof SpecialServiceCatalog
   */
  readonly specialServices?: Array<SpecialService>;
  /**
   *
   * @type {string}
   * @memberof SpecialServiceCatalog
   */
  backgroundColor?: string | null;
  /**
   *
   * @type {Language}
   * @memberof SpecialServiceCatalog
   */
  language?: Language;
  /**
   *
   * @type {Array<SpecialServiceCatalog>}
   * @memberof SpecialServiceCatalog
   */
  children?: Array<SpecialServiceCatalog>;
  /**
   *
   * @type {boolean}
   * @memberof SpecialServiceCatalog
   */
  isMaster?: boolean | null;
}

/**
 * Check if a given object implements the SpecialServiceCatalog interface.
 */
export function instanceOfSpecialServiceCatalog(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'name' in value;

  return isInstance;
}

export function SpecialServiceCatalogFromJSON(json: any): SpecialServiceCatalog {
  return SpecialServiceCatalogFromJSONTyped(json, false);
}

export function SpecialServiceCatalogFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SpecialServiceCatalog {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    name: json['name'],
    price: !exists(json, 'price') ? undefined : json['price'],
    thumbnail: !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
    headerImages: !exists(json, 'headerImages') ? undefined : json['headerImages'],
    specialServices: !exists(json, 'specialServices')
      ? undefined
      : (json['specialServices'] as Array<any>).map(SpecialServiceFromJSON),
    backgroundColor: !exists(json, 'backgroundColor') ? undefined : json['backgroundColor'],
    language: !exists(json, 'language') ? undefined : LanguageFromJSON(json['language']),
    children: !exists(json, 'children')
      ? undefined
      : (json['children'] as Array<any>).map(SpecialServiceCatalogFromJSON),
    isMaster: !exists(json, 'isMaster') ? undefined : json['isMaster'],
  };
}

export function SpecialServiceCatalogToJSON(value?: SpecialServiceCatalog | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    thumbnail: value.thumbnail,
    headerImages: value.headerImages,
    backgroundColor: value.backgroundColor,
    language: LanguageToJSON(value.language),
    children:
      value.children === undefined
        ? undefined
        : (value.children as Array<any>).map(SpecialServiceCatalogToJSON),
    isMaster: value.isMaster,
  };
}