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
export const AuthProvider = {
  Github: 'github',
  Google: 'google',
  Auth0: 'auth0',
  GooglePc: 'google_pc',
  Slack: 'slack',
} as const;
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];

export function AuthProviderFromJSON(json: any): AuthProvider {
  return AuthProviderFromJSONTyped(json, false);
}

export function AuthProviderFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthProvider {
  return json as AuthProvider;
}

export function AuthProviderToJSON(value?: AuthProvider | null): any {
  return value as any;
}