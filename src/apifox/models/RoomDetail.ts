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
import type { BathingFacilities } from './BathingFacilities';
import {
  BathingFacilitiesFromJSON,
  BathingFacilitiesFromJSONTyped,
  BathingFacilitiesToJSON,
} from './BathingFacilities';
import type { CancellationPolicy } from './CancellationPolicy';
import {
  CancellationPolicyFromJSON,
  CancellationPolicyFromJSONTyped,
  CancellationPolicyToJSON,
} from './CancellationPolicy';
import type { Inner } from './Inner';
import { InnerFromJSON, InnerFromJSONTyped, InnerToJSON } from './Inner';
import type { KitchenFacilities } from './KitchenFacilities';
import {
  KitchenFacilitiesFromJSON,
  KitchenFacilitiesFromJSONTyped,
  KitchenFacilitiesToJSON,
} from './KitchenFacilities';
import type { RoomFreeService } from './RoomFreeService';
import {
  RoomFreeServiceFromJSON,
  RoomFreeServiceFromJSONTyped,
  RoomFreeServiceToJSON,
} from './RoomFreeService';
import type { RoomInfo } from './RoomInfo';
import { RoomInfoFromJSON, RoomInfoFromJSONTyped, RoomInfoToJSON } from './RoomInfo';
import type { RoomInfrastructure } from './RoomInfrastructure';
import {
  RoomInfrastructureFromJSON,
  RoomInfrastructureFromJSONTyped,
  RoomInfrastructureToJSON,
} from './RoomInfrastructure';

/**
 *
 * @export
 * @interface RoomDetail
 */
export interface RoomDetail {
  /**
   *
   * @type {RoomInfo}
   * @memberof RoomDetail
   */
  info: RoomInfo;
  /**
   *
   * @type {RoomFreeService}
   * @memberof RoomDetail
   */
  free?: RoomFreeService;
  /**
   *
   * @type {RoomInfrastructure}
   * @memberof RoomDetail
   */
  infrastructure?: RoomInfrastructure;
  /**
   *
   * @type {KitchenFacilities}
   * @memberof RoomDetail
   */
  kitchen?: KitchenFacilities;
  /**
   *
   * @type {BathingFacilities}
   * @memberof RoomDetail
   */
  bathing?: BathingFacilities;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  checkTime?: string;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  cancellationPolicy?: string;
  /**
   *
   * @type {CancellationPolicy}
   * @memberof RoomDetail
   */
  cancellationPolicyEnum?: CancellationPolicy;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  roomNotice?: string;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  serviceFee?: string;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  localTax?: string;
  /**
   *
   * @type {boolean}
   * @memberof RoomDetail
   */
  enableServiceFee?: boolean;
  /**
   *
   * @type {boolean}
   * @memberof RoomDetail
   */
  enableLocalTax?: boolean;
  /**
   *
   * @type {number}
   * @memberof RoomDetail
   */
  minBookable?: number;
  /**
   *
   * @type {number}
   * @memberof RoomDetail
   */
  maxBookable?: number;
  /**
   *
   * @type {number}
   * @memberof RoomDetail
   */
  saturdayPrice?: number | null;
  /**
   *
   * @type {number}
   * @memberof RoomDetail
   */
  sundayPrice?: number | null;
  /**
   *
   * @type {Inner}
   * @memberof RoomDetail
   */
  inner?: Inner;
  /**
   *
   * @type {string}
   * @memberof RoomDetail
   */
  addressDesc?: string | null;
  /**
   *
   * @type {number}
   * @memberof RoomDetail
   */
  minStayDays?: number | null;
}

/**
 * Check if a given object implements the RoomDetail interface.
 */
export function instanceOfRoomDetail(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'info' in value;

  return isInstance;
}

export function RoomDetailFromJSON(json: any): RoomDetail {
  return RoomDetailFromJSONTyped(json, false);
}

export function RoomDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomDetail {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    info: RoomInfoFromJSON(json['info']),
    free: !exists(json, 'free') ? undefined : RoomFreeServiceFromJSON(json['free']),
    infrastructure: !exists(json, 'infrastructure')
      ? undefined
      : RoomInfrastructureFromJSON(json['infrastructure']),
    kitchen: !exists(json, 'kitchen') ? undefined : KitchenFacilitiesFromJSON(json['kitchen']),
    bathing: !exists(json, 'bathing') ? undefined : BathingFacilitiesFromJSON(json['bathing']),
    checkTime: !exists(json, 'checkTime') ? undefined : json['checkTime'],
    cancellationPolicy: !exists(json, 'cancellationPolicy')
      ? undefined
      : json['cancellationPolicy'],
    cancellationPolicyEnum: !exists(json, 'cancellationPolicyEnum')
      ? undefined
      : CancellationPolicyFromJSON(json['cancellationPolicyEnum']),
    roomNotice: !exists(json, 'roomNotice') ? undefined : json['roomNotice'],
    serviceFee: !exists(json, 'serviceFee') ? undefined : json['serviceFee'],
    localTax: !exists(json, 'localTax') ? undefined : json['localTax'],
    enableServiceFee: !exists(json, 'enableServiceFee') ? undefined : json['enableServiceFee'],
    enableLocalTax: !exists(json, 'enableLocalTax') ? undefined : json['enableLocalTax'],
    minBookable: !exists(json, 'minBookable') ? undefined : json['minBookable'],
    maxBookable: !exists(json, 'maxBookable') ? undefined : json['maxBookable'],
    saturdayPrice: !exists(json, 'saturdayPrice') ? undefined : json['saturdayPrice'],
    sundayPrice: !exists(json, 'sundayPrice') ? undefined : json['sundayPrice'],
    inner: !exists(json, 'inner') ? undefined : InnerFromJSON(json['inner']),
    addressDesc: !exists(json, 'addressDesc') ? undefined : json['addressDesc'],
    minStayDays: !exists(json, 'minStayDays') ? undefined : json['minStayDays'],
  };
}

export function RoomDetailToJSON(value?: RoomDetail | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    info: RoomInfoToJSON(value.info),
    free: RoomFreeServiceToJSON(value.free),
    infrastructure: RoomInfrastructureToJSON(value.infrastructure),
    kitchen: KitchenFacilitiesToJSON(value.kitchen),
    bathing: BathingFacilitiesToJSON(value.bathing),
    checkTime: value.checkTime,
    cancellationPolicy: value.cancellationPolicy,
    cancellationPolicyEnum: CancellationPolicyToJSON(value.cancellationPolicyEnum),
    roomNotice: value.roomNotice,
    serviceFee: value.serviceFee,
    localTax: value.localTax,
    enableServiceFee: value.enableServiceFee,
    enableLocalTax: value.enableLocalTax,
    minBookable: value.minBookable,
    maxBookable: value.maxBookable,
    saturdayPrice: value.saturdayPrice,
    sundayPrice: value.sundayPrice,
    inner: InnerToJSON(value.inner),
    addressDesc: value.addressDesc,
    minStayDays: value.minStayDays,
  };
}
