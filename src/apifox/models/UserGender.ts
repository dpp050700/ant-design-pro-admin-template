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

/**
 *
 * @export
 */
export const UserGender = {
  Unknown: 'unknown',
  Man: 'man',
  Woman: 'woman',
} as const;
export type UserGender = (typeof UserGender)[keyof typeof UserGender];

export function UserGenderFromJSON(json: any): UserGender {
  return UserGenderFromJSONTyped(json, false);
}

export function UserGenderFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserGender {
  return json as UserGender;
}

export function UserGenderToJSON(value?: UserGender | null): any {
  return value as any;
}
