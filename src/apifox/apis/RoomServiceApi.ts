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
  CheckRoomBookableRsp,
  FindQueryDataRsp,
  GetForexData,
  GetRoomOrderPriceRsp,
  RollerAnnouncementList,
  Room,
  RoomComment,
  RoomComments,
  RoomPolicies,
  Rooms,
  RpcStatus,
  SpecialService,
  SpecialServiceCatalog,
  SpecialServiceCatalogs,
  SpecialServices,
  V1ErrCode,
} from '../models/index';
import {
  CheckRoomBookableRspFromJSON,
  CheckRoomBookableRspToJSON,
  FindQueryDataRspFromJSON,
  FindQueryDataRspToJSON,
  GetForexDataFromJSON,
  GetForexDataToJSON,
  GetRoomOrderPriceRspFromJSON,
  GetRoomOrderPriceRspToJSON,
  RollerAnnouncementListFromJSON,
  RollerAnnouncementListToJSON,
  RoomFromJSON,
  RoomToJSON,
  RoomCommentFromJSON,
  RoomCommentToJSON,
  RoomCommentsFromJSON,
  RoomCommentsToJSON,
  RoomPoliciesFromJSON,
  RoomPoliciesToJSON,
  RoomsFromJSON,
  RoomsToJSON,
  RpcStatusFromJSON,
  RpcStatusToJSON,
  SpecialServiceFromJSON,
  SpecialServiceToJSON,
  SpecialServiceCatalogFromJSON,
  SpecialServiceCatalogToJSON,
  SpecialServiceCatalogsFromJSON,
  SpecialServiceCatalogsToJSON,
  SpecialServicesFromJSON,
  SpecialServicesToJSON,
  V1ErrCodeFromJSON,
  V1ErrCodeToJSON,
} from '../models/index';

export interface RoomServiceCheckRoomBookableRequest {
  roomId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface RoomServiceCommentDetailRequest {
  id: string;
}

export interface RoomServiceDetailRequest {
  id: string;
  featuresCommentTotal?: boolean;
}

export interface RoomServiceFindRequest {
  sortByUpdatedAt?: RoomServiceFindSortByUpdatedAtEnum;
  sortByName?: RoomServiceFindSortByNameEnum;
  sortByCountry?: RoomServiceFindSortByCountryEnum;
  sortByCity?: RoomServiceFindSortByCityEnum;
  sortByLanguage?: RoomServiceFindSortByLanguageEnum;
  sortByIsTopped?: RoomServiceFindSortByIsToppedEnum;
  sortByRating?: RoomServiceFindSortByRatingEnum;
  sortByStatus?: RoomServiceFindSortByStatusEnum;
  sortByCommentCount?: RoomServiceFindSortByCommentCountEnum;
  sortByBookCount?: RoomServiceFindSortByBookCountEnum;
  sortByPrice?: RoomServiceFindSortByPriceEnum;
  pageLimit?: number;
  pageOffset?: number;
  city?: string;
  country?: string;
  featuresCommentTotal?: boolean;
  ids?: Array<string>;
  leaseStartDate?: Date;
  leaseEndDate?: Date;
  count?: number;
  roomName?: string;
  language?: RoomServiceFindLanguageEnum;
  status?: string;
  roomCount?: string;
  infrastructure?: string;
  service?: string;
  specialService?: string;
  tags?: string;
  attractionId?: string;
}

export interface RoomServiceFindBookableRequest {
  roomId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface RoomServiceFindCommentRequest {
  roomId: string;
  sortBy?: string;
  pageLimit?: number;
  pageOffset?: number;
}

export interface RoomServiceFindQueryDataRequest {
  language?: RoomServiceFindQueryDataLanguageEnum;
}

export interface RoomServiceFindSpecialServiceRequest {
  name?: string;
  language?: RoomServiceFindSpecialServiceLanguageEnum;
}

export interface RoomServiceFindSpecialServiceCatalogRequest {
  withService?: boolean;
  language?: RoomServiceFindSpecialServiceCatalogLanguageEnum;
}

export interface RoomServiceFindSpecialServiceCatalogDetailRequest {
  id: string;
}

export interface RoomServiceGetBookableDateRequest {
  roomId: string;
  year?: string;
  mouth?: Array<string>;
}

export interface RoomServiceGetRoomOrderPriceRequest {
  roomId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface RoomServiceSearchPopularRequest {
  search: string;
  sortBy?: string;
  pageLimit?: number;
  pageOffset?: number;
  country?: string;
  city?: string;
  language?: RoomServiceSearchPopularLanguageEnum;
  attractionId?: string;
}

export interface RoomServiceSpecialServiceDetailRequest {
  id: string;
}

/**
 *
 */
export class RoomServiceApi extends runtime.BaseAPI {
  /**
   * 房源订单检查时间范围是否可以选择
   */
  async roomServiceCheckRoomBookableRaw(
    requestParameters: RoomServiceCheckRoomBookableRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<CheckRoomBookableRsp>> {
    if (requestParameters.roomId === null || requestParameters.roomId === undefined) {
      throw new runtime.RequiredError(
        'roomId',
        'Required parameter requestParameters.roomId was null or undefined when calling roomServiceCheckRoomBookable.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.startDate !== undefined) {
      queryParameters['startDate'] = (requestParameters.startDate as any).toISOString();
    }

    if (requestParameters.endDate !== undefined) {
      queryParameters['endDate'] = (requestParameters.endDate as any).toISOString();
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/rooms/{roomId}/check_bookable`.replace(
          `{${'roomId'}}`,
          encodeURIComponent(String(requestParameters.roomId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CheckRoomBookableRspFromJSON(jsonValue),
    );
  }

  /**
   * 房源订单检查时间范围是否可以选择
   */
  async roomServiceCheckRoomBookable(
    requestParameters: RoomServiceCheckRoomBookableRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<CheckRoomBookableRsp> {
    const response = await this.roomServiceCheckRoomBookableRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 评论详情
   */
  async roomServiceCommentDetailRaw(
    requestParameters: RoomServiceCommentDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<RoomComment>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling roomServiceCommentDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/room_comment/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomCommentFromJSON(jsonValue));
  }

  /**
   * 评论详情
   */
  async roomServiceCommentDetail(
    requestParameters: RoomServiceCommentDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<RoomComment> {
    const response = await this.roomServiceCommentDetailRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 查询房间详情
   */
  async roomServiceDetailRaw(
    requestParameters: RoomServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Room>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling roomServiceDetail.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.featuresCommentTotal !== undefined) {
      queryParameters['features.commentTotal'] = requestParameters.featuresCommentTotal;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/rooms/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomFromJSON(jsonValue));
  }

  /**
   * 查询房间详情
   */
  async roomServiceDetail(
    requestParameters: RoomServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Room> {
    const response = await this.roomServiceDetailRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 查询房间列表
   */
  async roomServiceFindRaw(
    requestParameters: RoomServiceFindRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Rooms>> {
    const queryParameters: any = {};

    if (requestParameters.sortByUpdatedAt !== undefined) {
      queryParameters['sortBy.updatedAt'] = requestParameters.sortByUpdatedAt;
    }

    if (requestParameters.sortByName !== undefined) {
      queryParameters['sortBy.name'] = requestParameters.sortByName;
    }

    if (requestParameters.sortByCountry !== undefined) {
      queryParameters['sortBy.country'] = requestParameters.sortByCountry;
    }

    if (requestParameters.sortByCity !== undefined) {
      queryParameters['sortBy.city'] = requestParameters.sortByCity;
    }

    if (requestParameters.sortByLanguage !== undefined) {
      queryParameters['sortBy.language'] = requestParameters.sortByLanguage;
    }

    if (requestParameters.sortByIsTopped !== undefined) {
      queryParameters['sortBy.isTopped'] = requestParameters.sortByIsTopped;
    }

    if (requestParameters.sortByRating !== undefined) {
      queryParameters['sortBy.rating'] = requestParameters.sortByRating;
    }

    if (requestParameters.sortByStatus !== undefined) {
      queryParameters['sortBy.status'] = requestParameters.sortByStatus;
    }

    if (requestParameters.sortByCommentCount !== undefined) {
      queryParameters['sortBy.commentCount'] = requestParameters.sortByCommentCount;
    }

    if (requestParameters.sortByBookCount !== undefined) {
      queryParameters['sortBy.bookCount'] = requestParameters.sortByBookCount;
    }

    if (requestParameters.sortByPrice !== undefined) {
      queryParameters['sortBy.price'] = requestParameters.sortByPrice;
    }

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    if (requestParameters.city !== undefined) {
      queryParameters['city'] = requestParameters.city;
    }

    if (requestParameters.country !== undefined) {
      queryParameters['country'] = requestParameters.country;
    }

    if (requestParameters.featuresCommentTotal !== undefined) {
      queryParameters['features.commentTotal'] = requestParameters.featuresCommentTotal;
    }

    if (requestParameters.ids) {
      queryParameters['ids'] = requestParameters.ids;
    }

    if (requestParameters.leaseStartDate !== undefined) {
      queryParameters['leaseStartDate'] = (requestParameters.leaseStartDate as any).toISOString();
    }

    if (requestParameters.leaseEndDate !== undefined) {
      queryParameters['leaseEndDate'] = (requestParameters.leaseEndDate as any).toISOString();
    }

    if (requestParameters.count !== undefined) {
      queryParameters['count'] = requestParameters.count;
    }

    if (requestParameters.roomName !== undefined) {
      queryParameters['roomName'] = requestParameters.roomName;
    }

    if (requestParameters.language !== undefined) {
      queryParameters['language'] = requestParameters.language;
    }

    if (requestParameters.status !== undefined) {
      queryParameters['status'] = requestParameters.status;
    }

    if (requestParameters.roomCount !== undefined) {
      queryParameters['roomCount'] = requestParameters.roomCount;
    }

    if (requestParameters.infrastructure !== undefined) {
      queryParameters['infrastructure'] = requestParameters.infrastructure;
    }

    if (requestParameters.service !== undefined) {
      queryParameters['service'] = requestParameters.service;
    }

    if (requestParameters.specialService !== undefined) {
      queryParameters['specialService'] = requestParameters.specialService;
    }

    if (requestParameters.tags !== undefined) {
      queryParameters['tags'] = requestParameters.tags;
    }

    if (requestParameters.attractionId !== undefined) {
      queryParameters['attractionId'] = requestParameters.attractionId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/rooms`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomsFromJSON(jsonValue));
  }

  /**
   * 查询房间列表
   */
  async roomServiceFind(
    requestParameters: RoomServiceFindRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Rooms> {
    const response = await this.roomServiceFindRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 返回房间的价格以及是否被预约
   * 查询房间可预约列表
   */
  async roomServiceFindBookableRaw(
    requestParameters: RoomServiceFindBookableRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<RoomPolicies>> {
    if (requestParameters.roomId === null || requestParameters.roomId === undefined) {
      throw new runtime.RequiredError(
        'roomId',
        'Required parameter requestParameters.roomId was null or undefined when calling roomServiceFindBookable.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.startDate !== undefined) {
      queryParameters['startDate'] = (requestParameters.startDate as any).toISOString();
    }

    if (requestParameters.endDate !== undefined) {
      queryParameters['endDate'] = (requestParameters.endDate as any).toISOString();
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/rooms/{roomId}/bookable`.replace(
          `{${'roomId'}}`,
          encodeURIComponent(String(requestParameters.roomId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomPoliciesFromJSON(jsonValue));
  }

  /**
   * 返回房间的价格以及是否被预约
   * 查询房间可预约列表
   */
  async roomServiceFindBookable(
    requestParameters: RoomServiceFindBookableRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<RoomPolicies> {
    const response = await this.roomServiceFindBookableRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 查询评论列表
   */
  async roomServiceFindCommentRaw(
    requestParameters: RoomServiceFindCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<RoomComments>> {
    if (requestParameters.roomId === null || requestParameters.roomId === undefined) {
      throw new runtime.RequiredError(
        'roomId',
        'Required parameter requestParameters.roomId was null or undefined when calling roomServiceFindComment.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.sortBy !== undefined) {
      queryParameters['sortBy'] = requestParameters.sortBy;
    }

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/rooms/{roomId}/comments`.replace(
          `{${'roomId'}}`,
          encodeURIComponent(String(requestParameters.roomId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomCommentsFromJSON(jsonValue));
  }

  /**
   * 查询评论列表
   */
  async roomServiceFindComment(
    requestParameters: RoomServiceFindCommentRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<RoomComments> {
    const response = await this.roomServiceFindCommentRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 房源查询筛选参数
   */
  async roomServiceFindQueryDataRaw(
    requestParameters: RoomServiceFindQueryDataRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<FindQueryDataRsp>> {
    const queryParameters: any = {};

    if (requestParameters.language !== undefined) {
      queryParameters['language'] = requestParameters.language;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/room_filter_data`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FindQueryDataRspFromJSON(jsonValue),
    );
  }

  /**
   * 房源查询筛选参数
   */
  async roomServiceFindQueryData(
    requestParameters: RoomServiceFindQueryDataRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<FindQueryDataRsp> {
    const response = await this.roomServiceFindQueryDataRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 查询特殊服务
   */
  async roomServiceFindSpecialServiceRaw(
    requestParameters: RoomServiceFindSpecialServiceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SpecialServices>> {
    const queryParameters: any = {};

    if (requestParameters.name !== undefined) {
      queryParameters['name'] = requestParameters.name;
    }

    if (requestParameters.language !== undefined) {
      queryParameters['language'] = requestParameters.language;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/special_services`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SpecialServicesFromJSON(jsonValue));
  }

  /**
   * 查询特殊服务
   */
  async roomServiceFindSpecialService(
    requestParameters: RoomServiceFindSpecialServiceRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SpecialServices> {
    const response = await this.roomServiceFindSpecialServiceRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 特殊服务种类查询
   */
  async roomServiceFindSpecialServiceCatalogRaw(
    requestParameters: RoomServiceFindSpecialServiceCatalogRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SpecialServiceCatalogs>> {
    const queryParameters: any = {};

    if (requestParameters.withService !== undefined) {
      queryParameters['withService'] = requestParameters.withService;
    }

    if (requestParameters.language !== undefined) {
      queryParameters['language'] = requestParameters.language;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/special_service_catalogs`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SpecialServiceCatalogsFromJSON(jsonValue),
    );
  }

  /**
   * 特殊服务种类查询
   */
  async roomServiceFindSpecialServiceCatalog(
    requestParameters: RoomServiceFindSpecialServiceCatalogRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SpecialServiceCatalogs> {
    const response = await this.roomServiceFindSpecialServiceCatalogRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * 特殊服务种类详情查询
   */
  async roomServiceFindSpecialServiceCatalogDetailRaw(
    requestParameters: RoomServiceFindSpecialServiceCatalogDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SpecialServiceCatalog>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling roomServiceFindSpecialServiceCatalogDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/special_service_catalog/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SpecialServiceCatalogFromJSON(jsonValue),
    );
  }

  /**
   * 特殊服务种类详情查询
   */
  async roomServiceFindSpecialServiceCatalogDetail(
    requestParameters: RoomServiceFindSpecialServiceCatalogDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SpecialServiceCatalog> {
    const response = await this.roomServiceFindSpecialServiceCatalogDetailRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * 获取可预定日期
   */
  async roomServiceGetBookableDateRaw(
    requestParameters: RoomServiceGetBookableDateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<RoomPolicies>> {
    if (requestParameters.roomId === null || requestParameters.roomId === undefined) {
      throw new runtime.RequiredError(
        'roomId',
        'Required parameter requestParameters.roomId was null or undefined when calling roomServiceGetBookableDate.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.year !== undefined) {
      queryParameters['year'] = requestParameters.year;
    }

    if (requestParameters.mouth) {
      queryParameters['mouth'] = requestParameters.mouth;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/room_date/{roomId}`.replace(
          `{${'roomId'}}`,
          encodeURIComponent(String(requestParameters.roomId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomPoliciesFromJSON(jsonValue));
  }

  /**
   * 获取可预定日期
   */
  async roomServiceGetBookableDate(
    requestParameters: RoomServiceGetBookableDateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<RoomPolicies> {
    const response = await this.roomServiceGetBookableDateRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 获取汇率
   */
  async roomServiceGetForexRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GetForexData>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/get_forex`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => GetForexDataFromJSON(jsonValue));
  }

  /**
   * 获取汇率
   */
  async roomServiceGetForex(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<GetForexData> {
    const response = await this.roomServiceGetForexRaw(initOverrides);
    return await response.value();
  }

  /**
   * 计算房源订单价格
   */
  async roomServiceGetRoomOrderPriceRaw(
    requestParameters: RoomServiceGetRoomOrderPriceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<GetRoomOrderPriceRsp>> {
    if (requestParameters.roomId === null || requestParameters.roomId === undefined) {
      throw new runtime.RequiredError(
        'roomId',
        'Required parameter requestParameters.roomId was null or undefined when calling roomServiceGetRoomOrderPrice.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.startDate !== undefined) {
      queryParameters['startDate'] = (requestParameters.startDate as any).toISOString();
    }

    if (requestParameters.endDate !== undefined) {
      queryParameters['endDate'] = (requestParameters.endDate as any).toISOString();
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/room_date/{roomId}/order_price`.replace(
          `{${'roomId'}}`,
          encodeURIComponent(String(requestParameters.roomId)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      GetRoomOrderPriceRspFromJSON(jsonValue),
    );
  }

  /**
   * 计算房源订单价格
   */
  async roomServiceGetRoomOrderPrice(
    requestParameters: RoomServiceGetRoomOrderPriceRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<GetRoomOrderPriceRsp> {
    const response = await this.roomServiceGetRoomOrderPriceRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 滚轮公告查询
   */
  async roomServiceRollerAnnouncementFindRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<RollerAnnouncementList>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/roller_announcements`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      RollerAnnouncementListFromJSON(jsonValue),
    );
  }

  /**
   * 滚轮公告查询
   */
  async roomServiceRollerAnnouncementFind(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<RollerAnnouncementList> {
    const response = await this.roomServiceRollerAnnouncementFindRaw(initOverrides);
    return await response.value();
  }

  /**
   * 热门房间搜索
   */
  async roomServiceSearchPopularRaw(
    requestParameters: RoomServiceSearchPopularRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Rooms>> {
    if (requestParameters.search === null || requestParameters.search === undefined) {
      throw new runtime.RequiredError(
        'search',
        'Required parameter requestParameters.search was null or undefined when calling roomServiceSearchPopular.',
      );
    }

    const queryParameters: any = {};

    if (requestParameters.sortBy !== undefined) {
      queryParameters['sortBy'] = requestParameters.sortBy;
    }

    if (requestParameters.pageLimit !== undefined) {
      queryParameters['page.limit'] = requestParameters.pageLimit;
    }

    if (requestParameters.pageOffset !== undefined) {
      queryParameters['page.offset'] = requestParameters.pageOffset;
    }

    if (requestParameters.search !== undefined) {
      queryParameters['search'] = requestParameters.search;
    }

    if (requestParameters.country !== undefined) {
      queryParameters['country'] = requestParameters.country;
    }

    if (requestParameters.city !== undefined) {
      queryParameters['city'] = requestParameters.city;
    }

    if (requestParameters.language !== undefined) {
      queryParameters['language'] = requestParameters.language;
    }

    if (requestParameters.attractionId !== undefined) {
      queryParameters['attractionId'] = requestParameters.attractionId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/popular_rooms`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => RoomsFromJSON(jsonValue));
  }

  /**
   * 热门房间搜索
   */
  async roomServiceSearchPopular(
    requestParameters: RoomServiceSearchPopularRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Rooms> {
    const response = await this.roomServiceSearchPopularRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 特色服务详情
   */
  async roomServiceSpecialServiceDetailRaw(
    requestParameters: RoomServiceSpecialServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<SpecialService>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling roomServiceSpecialServiceDetail.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/room/special_service/{id}`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => SpecialServiceFromJSON(jsonValue));
  }

  /**
   * 特色服务详情
   */
  async roomServiceSpecialServiceDetail(
    requestParameters: RoomServiceSpecialServiceDetailRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<SpecialService> {
    const response = await this.roomServiceSpecialServiceDetailRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }
}

/**
 * @export
 */
export const RoomServiceFindSortByUpdatedAtEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByUpdatedAtEnum =
  (typeof RoomServiceFindSortByUpdatedAtEnum)[keyof typeof RoomServiceFindSortByUpdatedAtEnum];
/**
 * @export
 */
export const RoomServiceFindSortByNameEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByNameEnum =
  (typeof RoomServiceFindSortByNameEnum)[keyof typeof RoomServiceFindSortByNameEnum];
/**
 * @export
 */
export const RoomServiceFindSortByCountryEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByCountryEnum =
  (typeof RoomServiceFindSortByCountryEnum)[keyof typeof RoomServiceFindSortByCountryEnum];
/**
 * @export
 */
export const RoomServiceFindSortByCityEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByCityEnum =
  (typeof RoomServiceFindSortByCityEnum)[keyof typeof RoomServiceFindSortByCityEnum];
/**
 * @export
 */
export const RoomServiceFindSortByLanguageEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByLanguageEnum =
  (typeof RoomServiceFindSortByLanguageEnum)[keyof typeof RoomServiceFindSortByLanguageEnum];
/**
 * @export
 */
export const RoomServiceFindSortByIsToppedEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByIsToppedEnum =
  (typeof RoomServiceFindSortByIsToppedEnum)[keyof typeof RoomServiceFindSortByIsToppedEnum];
/**
 * @export
 */
export const RoomServiceFindSortByRatingEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByRatingEnum =
  (typeof RoomServiceFindSortByRatingEnum)[keyof typeof RoomServiceFindSortByRatingEnum];
/**
 * @export
 */
export const RoomServiceFindSortByStatusEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByStatusEnum =
  (typeof RoomServiceFindSortByStatusEnum)[keyof typeof RoomServiceFindSortByStatusEnum];
/**
 * @export
 */
export const RoomServiceFindSortByCommentCountEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByCommentCountEnum =
  (typeof RoomServiceFindSortByCommentCountEnum)[keyof typeof RoomServiceFindSortByCommentCountEnum];
/**
 * @export
 */
export const RoomServiceFindSortByBookCountEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByBookCountEnum =
  (typeof RoomServiceFindSortByBookCountEnum)[keyof typeof RoomServiceFindSortByBookCountEnum];
/**
 * @export
 */
export const RoomServiceFindSortByPriceEnum = {
  Ascend: 'ascend',
  Descend: 'descend',
} as const;
export type RoomServiceFindSortByPriceEnum =
  (typeof RoomServiceFindSortByPriceEnum)[keyof typeof RoomServiceFindSortByPriceEnum];
/**
 * @export
 */
export const RoomServiceFindLanguageEnum = {
  English: 'English',
  Japanese: 'Japanese',
  Thai: 'Thai',
  Burmese: 'Burmese',
  Chinese: 'Chinese',
} as const;
export type RoomServiceFindLanguageEnum =
  (typeof RoomServiceFindLanguageEnum)[keyof typeof RoomServiceFindLanguageEnum];
/**
 * @export
 */
export const RoomServiceFindQueryDataLanguageEnum = {
  English: 'English',
  Japanese: 'Japanese',
  Thai: 'Thai',
  Burmese: 'Burmese',
  Chinese: 'Chinese',
} as const;
export type RoomServiceFindQueryDataLanguageEnum =
  (typeof RoomServiceFindQueryDataLanguageEnum)[keyof typeof RoomServiceFindQueryDataLanguageEnum];
/**
 * @export
 */
export const RoomServiceFindSpecialServiceLanguageEnum = {
  English: 'English',
  Japanese: 'Japanese',
  Thai: 'Thai',
  Burmese: 'Burmese',
  Chinese: 'Chinese',
} as const;
export type RoomServiceFindSpecialServiceLanguageEnum =
  (typeof RoomServiceFindSpecialServiceLanguageEnum)[keyof typeof RoomServiceFindSpecialServiceLanguageEnum];
/**
 * @export
 */
export const RoomServiceFindSpecialServiceCatalogLanguageEnum = {
  English: 'English',
  Japanese: 'Japanese',
  Thai: 'Thai',
  Burmese: 'Burmese',
  Chinese: 'Chinese',
} as const;
export type RoomServiceFindSpecialServiceCatalogLanguageEnum =
  (typeof RoomServiceFindSpecialServiceCatalogLanguageEnum)[keyof typeof RoomServiceFindSpecialServiceCatalogLanguageEnum];
/**
 * @export
 */
export const RoomServiceSearchPopularLanguageEnum = {
  English: 'English',
  Japanese: 'Japanese',
  Thai: 'Thai',
  Burmese: 'Burmese',
  Chinese: 'Chinese',
} as const;
export type RoomServiceSearchPopularLanguageEnum =
  (typeof RoomServiceSearchPopularLanguageEnum)[keyof typeof RoomServiceSearchPopularLanguageEnum];
