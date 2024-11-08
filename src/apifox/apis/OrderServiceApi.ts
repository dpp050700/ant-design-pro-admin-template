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
import type {
  IdRsp,
  Order,
  OrderCreateReq,
  OrderIDRsp,
  OrderMessages,
  OrderServiceCancelBody,
  OrderServiceCreateCommentBody,
  Orders,
  PayBody,
  RpcStatus,
  V1ErrCode,
} from '../models/index';
import {
  IdRspFromJSON,
  IdRspToJSON,
  OrderFromJSON,
  OrderToJSON,
  OrderCreateReqFromJSON,
  OrderCreateReqToJSON,
  OrderIDRspFromJSON,
  OrderIDRspToJSON,
  OrderMessagesFromJSON,
  OrderMessagesToJSON,
  OrderServiceCancelBodyFromJSON,
  OrderServiceCancelBodyToJSON,
  OrderServiceCreateCommentBodyFromJSON,
  OrderServiceCreateCommentBodyToJSON,
  OrdersFromJSON,
  OrdersToJSON,
  PayBodyFromJSON,
  PayBodyToJSON,
  RpcStatusFromJSON,
  RpcStatusToJSON,
  V1ErrCodeFromJSON,
  V1ErrCodeToJSON,
} from '../models/index';

export interface OrderServiceAuditingRequest {
  id: string;
  body: object;
}

export interface OrderServiceCancelRequest {
  id: string;
  body: OrderServiceCancelBody;
}

export interface OrderServiceCheckedInRequest {
  id: string;
  body: object;
}

export interface OrderServiceCheckoutRequest {
  id: string;
  body: object;
}

export interface OrderServiceCreateRequest {
  body: OrderCreateReq;
}

export interface OrderServiceCreateCommentRequest {
  id: string;
  body: OrderServiceCreateCommentBody;
}

export interface OrderServiceDeleteRequest {
  id: string;
}

export interface OrderServiceDetailRequest {
  id: string;
}

export interface OrderServiceFindRequest {
  orderBy?: string;
  pageLimit?: number;
  pageOffset?: number;
  userId?: string;
  status?: string;
  roomId?: string;
}

export interface OrderServiceOrderMessageListRequest {
  pageLimit?: number;
  pageOffset?: number;
  userId?: string;
}

export interface OrderServicePayRequest {
  id: string;
  body: PayBody;
}

export interface OrderServicePayOkRequest {
  id: string;
  body: object;
}

/**
 *
 */
export class OrderServiceApi extends runtime.BaseAPI {
  /**
   * 房间入住检查
   */
  async orderServiceAuditingRaw(
    requestParameters: OrderServiceAuditingRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceAuditing.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceAuditing.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/status:audit`.replace(
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
   * 房间入住检查
   */
  async orderServiceAuditing(
    requestParameters: OrderServiceAuditingRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServiceAuditingRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单取消
   */
  async orderServiceCancelRaw(
    requestParameters: OrderServiceCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceCancel.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceCancel.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/status_cancel`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: OrderServiceCancelBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 订单取消
   */
  async orderServiceCancel(
    requestParameters: OrderServiceCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServiceCancelRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 房间入住确认
   */
  async orderServiceCheckedInRaw(
    requestParameters: OrderServiceCheckedInRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceCheckedIn.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceCheckedIn.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/status:checkin`.replace(
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
   * 房间入住确认
   */
  async orderServiceCheckedIn(
    requestParameters: OrderServiceCheckedInRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServiceCheckedInRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 退房
   */
  async orderServiceCheckoutRaw(
    requestParameters: OrderServiceCheckoutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceCheckout.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceCheckout.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/status:checkout`.replace(
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
   * 退房
   */
  async orderServiceCheckout(
    requestParameters: OrderServiceCheckoutRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServiceCheckoutRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单创建
   */
  async orderServiceCreateRaw(
    requestParameters: OrderServiceCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<OrderIDRsp>> {
    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceCreate.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: OrderCreateReqToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrderIDRspFromJSON(jsonValue));
  }

  /**
   * 订单创建
   */
  async orderServiceCreate(
    requestParameters: OrderServiceCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<OrderIDRsp> {
    const response = await this.orderServiceCreateRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 添加评论
   */
  async orderServiceCreateCommentRaw(
    requestParameters: OrderServiceCreateCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<IdRsp>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceCreateComment.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServiceCreateComment.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/room_comment/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: OrderServiceCreateCommentBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => IdRspFromJSON(jsonValue));
  }

  /**
   * 添加评论
   */
  async orderServiceCreateComment(
    requestParameters: OrderServiceCreateCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<IdRsp> {
    const response = await this.orderServiceCreateCommentRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单删除
   */
  async orderServiceDeleteRaw(
    requestParameters: OrderServiceDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceDelete.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/order/order/{id}`.replace(
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
   * 订单删除
   */
  async orderServiceDelete(
    requestParameters: OrderServiceDeleteRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServiceDeleteRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单详情
   */
  async orderServiceDetailRaw(
    requestParameters: OrderServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Order>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServiceDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/order/order/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
  }

  /**
   * 订单详情
   */
  async orderServiceDetail(
    requestParameters: OrderServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Order> {
    const response = await this.orderServiceDetailRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单列表查询
   */
  async orderServiceFindRaw(
    requestParameters: OrderServiceFindRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Orders>> {
    const queryParameters: any = {};

    if (requestParameters.orderBy !== undefined) {
      queryParameters['orderBy'] = requestParameters.orderBy;
    }

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    if (requestParameters.userId !== undefined) {
      queryParameters['userId'] = requestParameters.userId;
    }

    if (requestParameters.status !== undefined) {
      queryParameters['status'] = requestParameters.status;
    }

    if (requestParameters.roomId !== undefined) {
      queryParameters['roomId'] = requestParameters.roomId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/order/orders`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrdersFromJSON(jsonValue));
  }

  /**
   * 订单列表查询
   */
  async orderServiceFind(
    requestParameters: OrderServiceFindRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Orders> {
    const response = await this.orderServiceFindRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 消息列表
   */
  async orderServiceOrderMessageListRaw(
    requestParameters: OrderServiceOrderMessageListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<OrderMessages>> {
    const queryParameters: any = {};

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    if (requestParameters.userId !== undefined) {
      queryParameters['userId'] = requestParameters.userId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/order/order_message`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => OrderMessagesFromJSON(jsonValue));
  }

  /**
   * 消息列表
   */
  async orderServiceOrderMessageList(
    requestParameters: OrderServiceOrderMessageListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<OrderMessages> {
    const response = await this.orderServiceOrderMessageListRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单支付
   */
  async orderServicePayRaw(
    requestParameters: OrderServicePayRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServicePay.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServicePay.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/payment`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PayBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 订单支付
   */
  async orderServicePay(
    requestParameters: OrderServicePayRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServicePayRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 订单支付完成
   */
  async orderServicePayOkRaw(
    requestParameters: OrderServicePayOkRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling orderServicePayOk.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling orderServicePayOk.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/order/order/{id}/status:pay_ok`.replace(
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
   * 订单支付完成
   */
  async orderServicePayOk(
    requestParameters: OrderServicePayOkRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.orderServicePayOkRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
