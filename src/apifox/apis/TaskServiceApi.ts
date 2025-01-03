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

import * as runtime from '../runtime';
import type { RpcStatus, Task, TaskCreateReq, Tasks, UUIDIdRsp, V1ErrCode } from '../models/index';
import {
  RpcStatusFromJSON,
  RpcStatusToJSON,
  TaskFromJSON,
  TaskToJSON,
  TaskCreateReqFromJSON,
  TaskCreateReqToJSON,
  TasksFromJSON,
  TasksToJSON,
  UUIDIdRspFromJSON,
  UUIDIdRspToJSON,
  V1ErrCodeFromJSON,
  V1ErrCodeToJSON,
} from '../models/index';

export interface TaskServiceCancelRequest {
  id: string;
  body: object;
}

export interface TaskServiceCreateRequest {
  body: TaskCreateReq;
}

export interface TaskServiceDeleteRequest {
  id: string;
}

export interface TaskServiceDetailRequest {
  id: string;
}

export interface TaskServiceListRequest {
  taskId?: Array<string>;
  queue?: string;
  userId?: string;
  status?: Array<TaskServiceListStatusEnum>;
  runAtStartTime?: Date;
  runAtEndTime?: Date;
  createdAtStartTime?: Date;
  createdAtEndTime?: Date;
  expiredAtStartTime?: Date;
  expiredAtEndTime?: Date;
}

export interface TaskServiceRequeueRequest {
  id: string;
  body: object;
}

export interface TaskServiceRetryRequest {
  id: string;
  body: object;
}

/**
 *
 */
export class TaskServiceApi extends runtime.BaseAPI {
  /**
   * 任务取消
   */
  async taskServiceCancelRaw(
    requestParameters: TaskServiceCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling taskServiceCancel.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling taskServiceCancel.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/task/task/{id}/status:cancel`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.body as any,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 任务取消
   */
  async taskServiceCancel(
    requestParameters: TaskServiceCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.taskServiceCancelRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 任务创建
   */
  async taskServiceCreateRaw(
    requestParameters: TaskServiceCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UUIDIdRsp>> {
    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling taskServiceCreate.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/task/tasks`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TaskCreateReqToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UUIDIdRspFromJSON(jsonValue));
  }

  /**
   * 任务创建
   */
  async taskServiceCreate(
    requestParameters: TaskServiceCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UUIDIdRsp> {
    const response = await this.taskServiceCreateRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 任务删除
   */
  async taskServiceDeleteRaw(
    requestParameters: TaskServiceDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling taskServiceDelete.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/task/task/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 任务删除
   */
  async taskServiceDelete(
    requestParameters: TaskServiceDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.taskServiceDeleteRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 任务详情
   */
  async taskServiceDetailRaw(
    requestParameters: TaskServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Task>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling taskServiceDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/task/task/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TaskFromJSON(jsonValue));
  }

  /**
   * 任务详情
   */
  async taskServiceDetail(
    requestParameters: TaskServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Task> {
    const response = await this.taskServiceDetailRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 任务列表
   */
  async taskServiceListRaw(
    requestParameters: TaskServiceListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Tasks>> {
    const queryParameters: any = {};

    if (requestParameters.taskId) {
      queryParameters['taskId'] = requestParameters.taskId;
    }

    if (requestParameters.queue !== undefined) {
      queryParameters['queue'] = requestParameters.queue;
    }

    if (requestParameters.userId !== undefined) {
      queryParameters['userId'] = requestParameters.userId;
    }

    if (requestParameters.status) {
      queryParameters['status'] = requestParameters.status;
    }

    if (requestParameters.runAtStartTime !== undefined) {
      queryParameters['runAt.startTime'] = (requestParameters.runAtStartTime as any).toISOString();
    }

    if (requestParameters.runAtEndTime !== undefined) {
      queryParameters['runAt.endTime'] = (requestParameters.runAtEndTime as any).toISOString();
    }

    if (requestParameters.createdAtStartTime !== undefined) {
      queryParameters['createdAt.startTime'] = (
        requestParameters.createdAtStartTime as any
      ).toISOString();
    }

    if (requestParameters.createdAtEndTime !== undefined) {
      queryParameters['createdAt.endTime'] = (
        requestParameters.createdAtEndTime as any
      ).toISOString();
    }

    if (requestParameters.expiredAtStartTime !== undefined) {
      queryParameters['expiredAt.startTime'] = (
        requestParameters.expiredAtStartTime as any
      ).toISOString();
    }

    if (requestParameters.expiredAtEndTime !== undefined) {
      queryParameters['expiredAt.endTime'] = (
        requestParameters.expiredAtEndTime as any
      ).toISOString();
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/task/tasks`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TasksFromJSON(jsonValue));
  }

  /**
   * 任务列表
   */
  async taskServiceList(
    requestParameters: TaskServiceListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Tasks> {
    const response = await this.taskServiceListRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 相当于重置该任务，除了创建时间不变，run at重新计算
   * 任务重入队列
   */
  async taskServiceRequeueRaw(
    requestParameters: TaskServiceRequeueRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling taskServiceRequeue.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling taskServiceRequeue.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/task/task/{id}/status:created`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.body as any,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 相当于重置该任务，除了创建时间不变，run at重新计算
   * 任务重入队列
   */
  async taskServiceRequeue(
    requestParameters: TaskServiceRequeueRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.taskServiceRequeueRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 任务重试
   */
  async taskServiceRetryRaw(
    requestParameters: TaskServiceRetryRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling taskServiceRetry.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling taskServiceRetry.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/task/task/{id}/status:retry`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.body as any,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 任务重试
   */
  async taskServiceRetry(
    requestParameters: TaskServiceRetryRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.taskServiceRetryRaw(requestParameters, initOverrides);
    return await response.value();
  }
}

/**
 * @export
 */
export const TaskServiceListStatusEnum = {
  Created: 'Created',
  Running: 'Running',
  Success: 'Success',
  Failed: 'Failed',
  Canceled: 'Canceled',
} as const;
export type TaskServiceListStatusEnum =
  (typeof TaskServiceListStatusEnum)[keyof typeof TaskServiceListStatusEnum];
