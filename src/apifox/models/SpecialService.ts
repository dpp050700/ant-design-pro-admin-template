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
import type { SpecialServiceCatalog } from './SpecialServiceCatalog';
import {
  SpecialServiceCatalogFromJSON,
  SpecialServiceCatalogFromJSONTyped,
  SpecialServiceCatalogToJSON,
} from './SpecialServiceCatalog';
import type { SpecialServiceDetail } from './SpecialServiceDetail';
import {
  SpecialServiceDetailFromJSON,
  SpecialServiceDetailFromJSONTyped,
  SpecialServiceDetailToJSON,
} from './SpecialServiceDetail';
import type { SpecialServiceStatus } from './SpecialServiceStatus';
import {
  SpecialServiceStatusFromJSON,
  SpecialServiceStatusFromJSONTyped,
  SpecialServiceStatusToJSON,
} from './SpecialServiceStatus';
import type { SpecialServiceType } from './SpecialServiceType';
import {
  SpecialServiceTypeFromJSON,
  SpecialServiceTypeFromJSONTyped,
  SpecialServiceTypeToJSON,
} from './SpecialServiceType';

/**
 *
 * @export
 * @interface SpecialService
 */
export interface SpecialService {
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof SpecialService
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof SpecialService
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  name: string | null;
  /**
   *
   * @type {SpecialServiceType}
   * @memberof SpecialService
   */
  type?: SpecialServiceType;
  /**
   *
   * @type {number}
   * @memberof SpecialService
   */
  price?: number | null;
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  thumbnail?: string | null;
  /**
   *
   * @type {Array<string>}
   * @memberof SpecialService
   */
  images?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  description?: string | null;
  /**
   *
   * @type {SpecialServiceDetail}
   * @memberof SpecialService
   */
  detail?: SpecialServiceDetail;
  /**
   *
   * @type {SpecialServiceStatus}
   * @memberof SpecialService
   */
  status?: SpecialServiceStatus;
  /**
   *
   * @type {Array<string>}
   * @memberof SpecialService
   */
  headerImages?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  catalogId?: string;
  /**
   *
   * @type {SpecialServiceCatalog}
   * @memberof SpecialService
   */
  catalog?: SpecialServiceCatalog;
  /**
   *
   * @type {Language}
   * @memberof SpecialService
   */
  language?: Language;
  /**
   *
   * @type {Array<SpecialService>}
   * @memberof SpecialService
   */
  children?: Array<SpecialService>;
  /**
   *
   * @type {boolean}
   * @memberof SpecialService
   */
  isMaster?: boolean | null;
  /**
   *
   * @type {string}
   * @memberof SpecialService
   */
  readonly localPrice?: string | null;
}

/**
 * Check if a given object implements the SpecialService interface.
 */
export function instanceOfSpecialService(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'name' in value;

  return isInstance;
}

export function SpecialServiceFromJSON(json: any): SpecialService {
  return SpecialServiceFromJSONTyped(json, false);
}

export function SpecialServiceFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SpecialService {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    name: json['name'],
    type: !exists(json, 'type') ? undefined : SpecialServiceTypeFromJSON(json['type']),
    price: !exists(json, 'price') ? undefined : json['price'],
    thumbnail: !exists(json, 'thumbnail') ? undefined : json['thumbnail'],
    images: !exists(json, 'images') ? undefined : json['images'],
    description: !exists(json, 'description') ? undefined : json['description'],
    detail: !exists(json, 'detail') ? undefined : SpecialServiceDetailFromJSON(json['detail']),
    status: !exists(json, 'status') ? undefined : SpecialServiceStatusFromJSON(json['status']),
    headerImages: !exists(json, 'headerImages') ? undefined : json['headerImages'],
    catalogId: !exists(json, 'catalogId') ? undefined : json['catalogId'],
    catalog: !exists(json, 'catalog') ? undefined : SpecialServiceCatalogFromJSON(json['catalog']),
    language: !exists(json, 'language') ? undefined : LanguageFromJSON(json['language']),
    children: !exists(json, 'children')
      ? undefined
      : (json['children'] as Array<any>).map(SpecialServiceFromJSON),
    isMaster: !exists(json, 'isMaster') ? undefined : json['isMaster'],
    localPrice: !exists(json, 'localPrice') ? undefined : json['localPrice'],
  };
}

export function SpecialServiceToJSON(value?: SpecialService | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    type: SpecialServiceTypeToJSON(value.type),
    price: value.price,
    thumbnail: value.thumbnail,
    images: value.images,
    description: value.description,
    detail: SpecialServiceDetailToJSON(value.detail),
    status: SpecialServiceStatusToJSON(value.status),
    headerImages: value.headerImages,
    catalogId: value.catalogId,
    catalog: SpecialServiceCatalogToJSON(value.catalog),
    language: LanguageToJSON(value.language),
    children:
      value.children === undefined
        ? undefined
        : (value.children as Array<any>).map(SpecialServiceToJSON),
    isMaster: value.isMaster,
  };
}
