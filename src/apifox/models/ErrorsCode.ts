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
export const ErrorsCode = {
  Ok: 'OK',
  Canceled: 'Canceled',
  Unknown: 'Unknown',
  InvalidArgument: 'InvalidArgument',
  DeadlineExceeded: 'DeadlineExceeded',
  NotFound: 'NotFound',
  AlreadyExists: 'AlreadyExists',
  PermissionDenied: 'PermissionDenied',
  ResourceExhausted: 'ResourceExhausted',
  FailedPrecondition: 'FailedPrecondition',
  Aborted: 'Aborted',
  OutOfRange: 'OutOfRange',
  Unimplemented: 'Unimplemented',
  Internal: 'Internal',
  Unavailable: 'Unavailable',
  DataLoss: 'DataLoss',
  Unauthenticated: 'Unauthenticated',
  TooManyRequests: 'TooManyRequests',
} as const;
export type ErrorsCode = (typeof ErrorsCode)[keyof typeof ErrorsCode];

export function ErrorsCodeFromJSON(json: any): ErrorsCode {
  return ErrorsCodeFromJSONTyped(json, false);
}

export function ErrorsCodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorsCode {
  return json as ErrorsCode;
}

export function ErrorsCodeToJSON(value?: ErrorsCode | null): any {
  return value as any;
}
