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
  Attractions,
  BindAndVerifyBody,
  BindInviterBody,
  FindAddressRsp,
  ReportLocationBody,
  Rooms,
  RpcStatus,
  SaveAddressReq,
  SpecialServices,
  UpdateAvatarBody,
  UpdatePasswordBody,
  User,
  UserBindAndVerifyRsp,
  UserGetNonceRsp,
  UserServiceUpdateBody,
  UserStatsRsp,
  UserUpdateAvatarRsp,
  UserUpdateRsp,
  Users,
  V1ErrCode,
} from '../models/index';
import {
  AttractionsFromJSON,
  AttractionsToJSON,
  BindAndVerifyBodyFromJSON,
  BindAndVerifyBodyToJSON,
  BindInviterBodyFromJSON,
  BindInviterBodyToJSON,
  FindAddressRspFromJSON,
  FindAddressRspToJSON,
  ReportLocationBodyFromJSON,
  ReportLocationBodyToJSON,
  RoomsFromJSON,
  RoomsToJSON,
  RpcStatusFromJSON,
  RpcStatusToJSON,
  SaveAddressReqFromJSON,
  SaveAddressReqToJSON,
  SpecialServicesFromJSON,
  SpecialServicesToJSON,
  UpdateAvatarBodyFromJSON,
  UpdateAvatarBodyToJSON,
  UpdatePasswordBodyFromJSON,
  UpdatePasswordBodyToJSON,
  UserFromJSON,
  UserToJSON,
  UserBindAndVerifyRspFromJSON,
  UserBindAndVerifyRspToJSON,
  UserGetNonceRspFromJSON,
  UserGetNonceRspToJSON,
  UserServiceUpdateBodyFromJSON,
  UserServiceUpdateBodyToJSON,
  UserStatsRspFromJSON,
  UserStatsRspToJSON,
  UserUpdateAvatarRspFromJSON,
  UserUpdateAvatarRspToJSON,
  UserUpdateRspFromJSON,
  UserUpdateRspToJSON,
  UsersFromJSON,
  UsersToJSON,
  V1ErrCodeFromJSON,
  V1ErrCodeToJSON,
} from '../models/index';

export interface UserServiceBindAndVerifyRequest {
  userId: string;
  body: BindAndVerifyBody;
}

export interface UserServiceBindInviterRequest {
  userId: string;
  body: BindInviterBody;
}

export interface UserServiceDeleteAddressRequest {
  id: string;
}

export interface UserServiceDetailRequest {
  id: string;
}

export interface UserServiceGetNonceRequest {
  userId: string;
}

export interface UserServiceInviteUsersRequest {
  userId: string;
  pageLimit?: number;
  pageOffset?: number;
  minCjpTotal?: number;
}

export interface UserServiceReportLocationRequest {
  userId: string;
  body: ReportLocationBody;
}

export interface UserServiceRoomListRequest {
  userId: string;
}

export interface UserServiceSaveAddressRequest {
  body: SaveAddressReq;
}

export interface UserServiceScenicRequest {
  userId: string;
}

export interface UserServiceSpecialServiceListRequest {
  userId: string;
}

export interface UserServiceStatsRequest {
  userId: string;
}

export interface UserServiceUnBindRequest {
  userId: string;
}

export interface UserServiceUpdateRequest {
  userId: string;
  body: UserServiceUpdateBody;
}

export interface UserServiceUpdateAvatarRequest {
  id: string;
  body: UpdateAvatarBody;
}

export interface UserServiceUpdatePasswordRequest {
  userId: string;
  body: UpdatePasswordBody;
}

/**
 *
 */
export class UserServiceApi extends runtime.BaseAPI {
  /**
   * 绑定地址
   */
  async userServiceBindAndVerifyRaw(
    requestParameters: UserServiceBindAndVerifyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserBindAndVerifyRsp>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceBindAndVerify.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceBindAndVerify.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{userId}/bind_verify`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: BindAndVerifyBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UserBindAndVerifyRspFromJSON(jsonValue),
    );
  }

  /**
   * 绑定地址
   */
  async userServiceBindAndVerify(
    requestParameters: UserServiceBindAndVerifyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserBindAndVerifyRsp> {
    const response = await this.userServiceBindAndVerifyRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 绑定邀请者
   */
  async userServiceBindInviterRaw(
    requestParameters: UserServiceBindInviterRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceBindInviter.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceBindInviter.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{userId}/inviter`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: BindInviterBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 绑定邀请者
   */
  async userServiceBindInviter(
    requestParameters: UserServiceBindInviterRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceBindInviterRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 删除地址
   */
  async userServiceDeleteAddressRaw(
    requestParameters: UserServiceDeleteAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling userServiceDeleteAddress.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/address/{id}`.replace(
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
   * 删除地址
   */
  async userServiceDeleteAddress(
    requestParameters: UserServiceDeleteAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceDeleteAddressRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 获取用户详情
   */
  async userServiceDetailRaw(
    requestParameters: UserServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<User>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling userServiceDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
  }

  /**
   * 获取用户详情
   */
  async userServiceDetail(
    requestParameters: UserServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<User> {
    const response = await this.userServiceDetailRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 地址列表
   */
  async userServiceFindAddressRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<FindAddressRsp>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/addresses`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => FindAddressRspFromJSON(jsonValue));
  }

  /**
   * 地址列表
   */
  async userServiceFindAddress(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<FindAddressRsp> {
    const response = await this.userServiceFindAddressRaw(initOverrides);
    return await response.value();
  }

  /**
   * 获取随机数
   */
  async userServiceGetNonceRaw(
    requestParameters: UserServiceGetNonceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserGetNonceRsp>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceGetNonce.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/nonce`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserGetNonceRspFromJSON(jsonValue));
  }

  /**
   * 获取随机数
   */
  async userServiceGetNonce(
    requestParameters: UserServiceGetNonceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserGetNonceRsp> {
    const response = await this.userServiceGetNonceRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 获取邀请的用户
   */
  async userServiceInviteUsersRaw(
    requestParameters: UserServiceInviteUsersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Users>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceInviteUsers.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    if (requestParameters.minCjpTotal !== undefined) {
      queryParameters['minCjpTotal'] = requestParameters.minCjpTotal;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/bind_verify`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UsersFromJSON(jsonValue));
  }

  /**
   * 获取邀请的用户
   */
  async userServiceInviteUsers(
    requestParameters: UserServiceInviteUsersRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Users> {
    const response = await this.userServiceInviteUsersRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async userServiceMeRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<User>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/self`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
  }

  /**
   */
  async userServiceMe(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
    const response = await this.userServiceMeRaw(initOverrides);
    return await response.value();
  }

  /**
   * 上报位置信息
   */
  async userServiceReportLocationRaw(
    requestParameters: UserServiceReportLocationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceReportLocation.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceReportLocation.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{userId}/location`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: ReportLocationBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 上报位置信息
   */
  async userServiceReportLocation(
    requestParameters: UserServiceReportLocationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceReportLocationRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 用户住过的房源
   */
  async userServiceRoomListRaw(
    requestParameters: UserServiceRoomListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Rooms>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceRoomList.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/rooms`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomsFromJSON(jsonValue));
  }

  /**
   * 用户住过的房源
   */
  async userServiceRoomList(
    requestParameters: UserServiceRoomListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Rooms> {
    const response = await this.userServiceRoomListRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 保存地址
   */
  async userServiceSaveAddressRaw(
    requestParameters: UserServiceSaveAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceSaveAddress.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/address`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: SaveAddressReqToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 保存地址
   */
  async userServiceSaveAddress(
    requestParameters: UserServiceSaveAddressRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceSaveAddressRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 用户去过的景点
   */
  async userServiceScenicRaw(
    requestParameters: UserServiceScenicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Attractions>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceScenic.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/scenic`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => AttractionsFromJSON(jsonValue));
  }

  /**
   * 用户去过的景点
   */
  async userServiceScenic(
    requestParameters: UserServiceScenicRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Attractions> {
    const response = await this.userServiceScenicRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 用户用过的特色服务
   */
  async userServiceSpecialServiceListRaw(
    requestParameters: UserServiceSpecialServiceListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SpecialServices>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceSpecialServiceList.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/special_services`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SpecialServicesFromJSON(jsonValue));
  }

  /**
   * 用户用过的特色服务
   */
  async userServiceSpecialServiceList(
    requestParameters: UserServiceSpecialServiceListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SpecialServices> {
    const response = await this.userServiceSpecialServiceListRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 统计信息
   */
  async userServiceStatsRaw(
    requestParameters: UserServiceStatsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserStatsRsp>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceStats.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/stats`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserStatsRspFromJSON(jsonValue));
  }

  /**
   * 统计信息
   */
  async userServiceStats(
    requestParameters: UserServiceStatsRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserStatsRsp> {
    const response = await this.userServiceStatsRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 解绑地址
   */
  async userServiceUnBindRaw(
    requestParameters: UserServiceUnBindRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceUnBind.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user/user/{userId}/unbind`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
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
   * 解绑地址
   */
  async userServiceUnBind(
    requestParameters: UserServiceUnBindRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceUnBindRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 修改用户信息
   */
  async userServiceUpdateRaw(
    requestParameters: UserServiceUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserUpdateRsp>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceUpdate.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceUpdate.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{userId}`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: UserServiceUpdateBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => UserUpdateRspFromJSON(jsonValue));
  }

  /**
   * 修改用户信息
   */
  async userServiceUpdate(
    requestParameters: UserServiceUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserUpdateRsp> {
    const response = await this.userServiceUpdateRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 修改头像
   */
  async userServiceUpdateAvatarRaw(
    requestParameters: UserServiceUpdateAvatarRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<UserUpdateAvatarRsp>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling userServiceUpdateAvatar.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceUpdateAvatar.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{id}/avatar`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: UpdateAvatarBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      UserUpdateAvatarRspFromJSON(jsonValue),
    );
  }

  /**
   * 修改头像
   */
  async userServiceUpdateAvatar(
    requestParameters: UserServiceUpdateAvatarRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<UserUpdateAvatarRsp> {
    const response = await this.userServiceUpdateAvatarRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 修改密码需要用户登录
   * 修改密码
   */
  async userServiceUpdatePasswordRaw(
    requestParameters: UserServiceUpdatePasswordRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<object>> {
    if (requestParameters.userId === null || requestParameters.userId === undefined) {
      throw new runtime.RequiredError(
        'userId',
        'Required parameter requestParameters.userId was null or undefined when calling userServiceUpdatePassword.',
      );
    }

    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError(
        'body',
        'Required parameter requestParameters.body was null or undefined when calling userServiceUpdatePassword.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user/user/{userId}/password`.replace(
          `{${'userId'}}`,
          encodeURIComponent(String(requestParameters.userId)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: UpdatePasswordBodyToJSON(requestParameters.body),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse<any>(response);
  }

  /**
   * 修改密码需要用户登录
   * 修改密码
   */
  async userServiceUpdatePassword(
    requestParameters: UserServiceUpdatePasswordRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<object> {
    const response = await this.userServiceUpdatePasswordRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
