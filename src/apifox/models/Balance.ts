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
import type { BalanceType } from './BalanceType';
import { BalanceTypeFromJSON, BalanceTypeFromJSONTyped, BalanceTypeToJSON } from './BalanceType';

/**
 *
 * @export
 * @interface Balance
 */
export interface Balance {
  /**
   *
   * @type {string}
   * @memberof Balance
   */
  readonly id: string;
  /**
   *
   * @type {Date}
   * @memberof Balance
   */
  readonly createdAt: Date;
  /**
   *
   * @type {Date}
   * @memberof Balance
   */
  readonly updatedAt: Date;
  /**
   *
   * @type {BalanceType}
   * @memberof Balance
   */
  type: BalanceType;
  /**
   *
   * @type {string}
   * @memberof Balance
   */
  readonly value: string;
  /**
   *
   * @type {string}
   * @memberof Balance
   */
  readonly userId: string;
}

/**
 * Check if a given object implements the Balance interface.
 */
export function instanceOfBalance(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'createdAt' in value;
  isInstance = isInstance && 'updatedAt' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'value' in value;
  isInstance = isInstance && 'userId' in value;

  return isInstance;
}

export function BalanceFromJSON(json: any): Balance {
  return BalanceFromJSONTyped(json, false);
}

export function BalanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Balance {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json['id'],
    createdAt: new Date(json['createdAt']),
    updatedAt: new Date(json['updatedAt']),
    type: BalanceTypeFromJSON(json['type']),
    value: json['value'],
    userId: json['userId'],
  };
}

export function BalanceToJSON(value?: Balance | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: BalanceTypeToJSON(value.type),
  };
}