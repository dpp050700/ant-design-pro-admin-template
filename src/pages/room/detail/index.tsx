import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormGroup,
  ProFormMoney,
  ProFormProps,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  AttractionServiceApi,
  Room,
  RoomAdminServiceApi,
  RoomInfra,
  RoomServiceApi,
  TagServiceApi,
  V1Tag,
} from '@/apifox/index';
import { Button, Checkbox, Flex, message, Tag } from 'antd';
import { LabeledValue } from 'antd/es/select';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; //富文本样式文件
import { useRequest } from 'ahooks';
import { LeftOutlined } from '@ant-design/icons';
import Currency from '@/components/Currency';
import { useParams } from '@umijs/max';

const adminService = new RoomAdminServiceApi();
const tagService = new TagServiceApi();

const roomServiceApi = new RoomServiceApi();

const RoomDetail = () => {
  const params = useParams();

  const [initialValues, setInitialValues] = useState<Room>({
    detail: {
      localTax: '0.1',
      serviceFee: '0.068',
      enableLocalTax: true,
      enableServiceFee: true,
    },
  } as any);

  const title = initialValues?.id ? initialValues?.title : '新建房间';

  const [infraList, setInfraList] = useState<
    { label: string; children: { label: string; value: string }[] }[]
  >([]);

  const [infraValue, setInfraValue] = useState<Set<string>>(new Set([]));

  const roomService = new RoomServiceApi();
  const attractionService = new AttractionServiceApi();
  const [richValue, setRichValue] = useState(initialValues?.description);
  const [roomNotice, setRoomNotice] = useState(initialValues?.detail?.roomNotice);

  const [checkTimeValue, setCheckTimeValue] = useState(initialValues?.detail?.checkTime);
  const [fileList, setFileList] = useState<any[]>([]);

  const [videoList, setVideoList] = useState<any[]>([]);
  const [specialServiceIdsOpts, setSpecialServiceIdsOpts] = useState<any>([]);
  const [specialServiceIds, setSpecialServiceIds] = useState<any>([]);

  const [tagList, setTagList] = useState<V1Tag[]>([]);
  const [tagOpts, setTagOpts] = useState<any>([]);

  useEffect(() => {
    tagService.tagServiceList().then((rsp) => {
      // console.log("rsp---", rsp);

      setTagList(rsp.data || []);
      setTagOpts(
        rsp.data?.map((v) => {
          return {
            label: v.name,
            value: v.id,
            backColor: v.backColor,
            fontColor: v.fontColor,
            kind: v.kind,
          };
        }) || [],
      );
    });
  }, []);

  useEffect(() => {
    setSpecialServiceIds(
      initialValues?.specialServiceCatalogs?.map((v) => {
        return v.id;
      }) || [],
    );
  }, [initialValues]);

  const onFinish = async (value: any) => {
    value.images = value.file?.map((item: any) => (item.response ? item.response.key : item.key));

    value.videos = value.videoList?.map((item: any) =>
      item.response ? item.response.key : item.key,
    );
    delete value.file;
    delete value.videoList;

    value.infraIds = Array.from(infraValue);
    value.description = richValue;
    value.specialServiceIds = specialServiceIds;

    value.nearbyAttractionIds = value.nearbyAttractionIds1?.map((v: any) => v.value);
    delete value.nearbyAttractionIds1;

    const catalogsIds = [...value.attrTags, ...value.funcTags, ...value.descTags];
    delete value.attrTags;
    delete value.funcTags;
    delete value.descTags;

    value.catalogs = catalogsIds.map((tagId) => tagList.find((v) => v.id === tagId));
    // console.log("value.catalogs---", value.catalogs);

    value.detail = {
      ...value.detail,
      checkTime: checkTimeValue,
      roomNotice: roomNotice,
    };
    value.status = initialValues?.status;

    if (initialValues?.id) {
      await adminService.roomAdminServiceUpdate({
        body: { room: value },
        roomId: initialValues?.id,
      });
      message.success('编辑成功');
    } else {
      const { id: roomId } = await adminService.roomAdminServiceCreate({
        body: { room: value },
      });
      message.success('新建成功');
      location.href = `/room/detail/${roomId}`;
    }

    return true;
  };

  useRequest(
    () =>
      roomService.roomServiceFindSpecialServiceCatalog({
        withService: false,
      }),
    {
      onSuccess(rsp) {
        const data =
          rsp.catalogs?.map((v) => {
            return {
              label: v.name,
              value: v.id,
            };
          }) || [];
        setSpecialServiceIdsOpts(data as any);
      },
    },
  );

  const getAttractionList = async (data: any) => {
    const res = await attractionService.attractionServiceFind({
      name: data.keyWords,
      pageLimit: 2000,
      pageOffset: 0,
    });
    return (
      res.attractions?.map((v): LabeledValue => {
        return {
          value: v.id,
          label: v.name,
        };
      }) || []
    );
  };

  const [roomPrice, setRoomPrice] = useState(0);

  useRequest(() => roomServiceApi.roomServiceDetail({ id: params.id! }), {
    ready: !!params.id && params.id !== 'new',
    refreshDeps: [params.id],
    onSuccess(res) {
      if (res.id) {
        if (res?.images?.length) {
          setFileList(
            res?.images?.map((item: string) => ({
              key: item,
              url: S3ImageUrl(item),
            })) || [],
          );
        }
        if (res?.videos?.length) {
          setVideoList(
            res?.videos?.map((item: string) => ({
              key: item,
              url: S3ImageUrl(item),
            })) || [],
          );
        }
        setInfraValue(new Set(res.infraList?.map((item) => item.id!) || []));
        setRichValue(res?.description);
        setRoomNotice(res?.detail?.roomNotice);
        setInitialValues(res);
        setRoomPrice(Number(res?.price));
      }
    },
  });

  const getServiceList = async () => {
    const res = await adminService.roomAdminServiceRoomInfraFind({});
    const catalogs = new Set<string>([]);
    const infra: { [key: string]: RoomInfra[] } = {};

    res.data?.forEach((item) => {
      catalogs.add(item.catalog!);
      if (!infra[item.catalog!]) {
        infra[item.catalog!] = [item];
      } else {
        infra[item.catalog!].push(item);
      }
    });
    const list = Object.keys(infra).map((item) => {
      return {
        label: item,
        children: infra[item].map((_) => {
          return {
            label: _.name!,
            value: _.id!,
          };
        }),
      };
    });
    setInfraList(list);
  };
  useEffect(() => {
    getServiceList();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-[10px] p-[20px] bg-white">
        <LeftOutlined onClick={() => history.push(`/room/list`)} />
        {title}
      </div>

      <div key={initialValues?.id} className="p-[30px] bg-white mt-[20px]">
        <ProForm<Room>
          autoFocusFirstInput
          onFinish={onFinish}
          initialValues={initialValues}
          submitter={{
            // 配置按钮的属性
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
          }}
        >
          <ProFormText width="lg" name="title" label="房间名字" placeholder="请输入名称" />

          <ProFormGroup>
            <ProFormText name="country" label="国家" placeholder="请输入名称" />
            <ProFormText name="city" label="城市" placeholder="请输入名称" />
            <ProFormSelect
              mode="multiple"
              label="所属地区"
              request={getAttractionList}
              debounceTime={500}
              initialValue={initialValues?.nearbyAttractions?.map((v) => {
                return {
                  value: v.id,
                  label: v.name,
                };
              })}
              name="nearbyAttractionIds1"
              fieldProps={{ labelInValue: true }}
              width="md"
              showSearch
            ></ProFormSelect>
          </ProFormGroup>
          <ProFormGroup>
            <ProFormText name="address" label="景点地址" placeholder="请输入景点地址" width="xl" />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormText
              name="addressDesc"
              label="景点描述"
              placeholder="请输入景点描述"
              width="xl"
            />
          </ProFormGroup>

          <ProFormGroup>
            <ProFormText
              name={['detail', 'info', 'bathrooms']}
              label="卫生间数"
              placeholder="请输入名称"
            />

            <ProFormText
              name={['detail', 'info', 'rooms']}
              label="卧室数"
              placeholder="请输入名称"
            />

            <ProFormText name={['detail', 'info', 'beds']} label="床数" placeholder="请输入名称" />

            <ProFormText
              name={['detail', 'info', 'capacity']}
              label="可住人数"
              placeholder="请输入名称"
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormSelect
              width="md"
              mode="multiple"
              name={'attrTags'}
              initialValue={initialValues?.catalogs
                ?.filter((v) => v.kind === 'attr')
                ?.map((v) => v.id)}
              label="房源属性标签"
              options={tagOpts?.filter((v: any) => v.kind === 'attr')}
              fieldProps={{
                optionItemRender: (item: any) => (
                  <Tag color={item.backColor} style={{ color: item.fontColor || '#fff' }}>
                    {item.label}
                  </Tag>
                ),
              }}
            />
            <ProFormSelect
              width="md"
              mode="multiple"
              name={'funcTags'}
              initialValue={initialValues?.catalogs
                ?.filter((v) => v.kind === 'func')
                ?.map((v) => v.id)}
              label="房源功能标签"
              options={tagOpts?.filter((v: any) => v.kind === 'func')}
              fieldProps={{
                optionItemRender: (item: any) => (
                  <Tag color={item.backColor} style={{ color: item.fontColor || '#fff' }}>
                    {item.label}
                  </Tag>
                ),
              }}
            />
            <ProFormSelect
              width="md"
              mode="multiple"
              name={'descTags'}
              initialValue={initialValues?.catalogs
                ?.filter((v) => v.kind === 'desc')
                ?.map((v) => v.id)}
              label="房源描述标签"
              options={tagOpts?.filter((v: any) => v.kind === 'desc')}
              fieldProps={{
                optionItemRender: (item: any) => (
                  <Tag color={item.backColor} style={{ color: item.fontColor || '#fff' }}>
                    {item.label}
                  </Tag>
                ),
              }}
            />
          </ProFormGroup>

          {infraList.map((_, index) => {
            return (
              <ProForm.Item
                key={_.label}
                label={
                  <Checkbox
                    indeterminate={
                      _.children.some((v) => infraValue.has(v.value)) &&
                      !_.children.every((v) => infraValue.has(v.value))
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        _.children.forEach((v) => infraValue.add(v.value));
                      } else {
                        _.children.forEach((v) => infraValue.delete(v.value));
                      }
                      setInfraValue(new Set(Array.from(infraValue)));
                    }}
                    checked={_.children.every((v) => infraValue.has(v.value))}
                  >
                    {_.label}
                  </Checkbox>
                }
              >
                <Flex align="center" gap={5}>
                  {_.children.map((item, _index) => {
                    return (
                      <Flex align="center" justify="center" gap={5} key={item.value}>
                        <ProFormCheckbox
                          fieldProps={{
                            checked: infraValue.has(item.value),
                            onChange: (e) => {
                              const checked = e.target.checked;
                              checked ? infraValue.add(item.value) : infraValue.delete(item.value);
                              setInfraValue(new Set(Array.from(infraValue)));
                            },
                          }}
                          formItemProps={{ style: { marginBottom: 0 } }}
                        />
                        <label>{item.label}</label>
                      </Flex>
                    );
                  })}
                </Flex>
              </ProForm.Item>
            );
          })}

          <div className="flex flex-col gap-[10px] mb-[20px]">
            <Checkbox
              indeterminate={
                specialServiceIds.length > 0 &&
                specialServiceIds.length < specialServiceIdsOpts.length
              }
              onChange={(e) => {
                setSpecialServiceIds(
                  e.target.checked ? specialServiceIdsOpts.map((v: any) => v.value) : [],
                );
              }}
              checked={specialServiceIds.length === specialServiceIdsOpts.length}
            >
              特色服务
            </Checkbox>
            <Checkbox.Group
              value={specialServiceIds}
              options={specialServiceIdsOpts}
              onChange={setSpecialServiceIds as any}
            />
          </div>

          {/*<ProFormText*/}
          {/*    name={["detail", "checkTime"]}*/}
          {/*    label="入住和退房时间"*/}
          {/*    placeholder="请输入名称"*/}
          {/*/>*/}
          <div>入住和退房时间</div>
          <ReactQuill
            key={'checkTimeValue'}
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={checkTimeValue || initialValues?.detail?.checkTime}
            onChange={setCheckTimeValue}
          />
          <br />
          <ProFormRadio.Group
            name={['detail', 'cancellationPolicyEnum']}
            label="取消政策"
            options={[
              {
                label: '宽松',
                value: 'policy_easy',
              },
              {
                label: '中等',
                value: 'policy_normal',
              },
              {
                label: '严格',
                value: 'policy_strict',
              },
            ]}
          />
          <ProFormGroup>
            <div className="flex items-center gap-[20px]">
              <ProFormText
                label="价格"
                placeholder="请输入价格"
                name="price"
                fieldProps={{
                  prefix: '$',
                  onChange(e) {
                    setRoomPrice(Number(e.target.value));
                  },
                }}
              />
              <Currency value={roomPrice} className="pt-[10px]" />
            </div>
          </ProFormGroup>
          <ProFormGroup>
            <ProFormRadio.Group
              name={['detail', 'enableServiceFee']}
              label="是否开启服务费"
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
            />
            <ProFormText
              name={['detail', 'serviceFee']}
              label="服务费"
              placeholder="请输入服务费"
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormRadio.Group
              name={['detail', 'enableLocalTax']}
              label="是否开启地方税"
              options={[
                {
                  label: '是',
                  value: true,
                },
                {
                  label: '否',
                  value: false,
                },
              ]}
            />

            <ProFormText name={['detail', 'localTax']} label="地方税" placeholder="请输入地方税" />
          </ProFormGroup>
          <div>入住须知</div>
          <ReactQuill
            key={'roomNotice'}
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={roomNotice}
            onChange={setRoomNotice}
          />
          {/* <ProFormText
            name={["detail", "roomNotice"]}
            label="入住须知"
            placeholder="请输入名称"
          /> */}

          <ProFormUploadButton
            name="file"
            initialValue={fileList}
            label="上传房源图片"
            action={PutS3ImageUrl}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              onChange({ fileList }: any) {
                setFileList(
                  fileList.map((item: any) => {
                    return {
                      key: item.key,
                      url: S3ImageUrl(item.key),
                    };
                  }),
                );
              },
            }}
          />

          <ProFormUploadButton
            name="videoList"
            initialValue={videoList}
            label="上传房源视频"
            action={PutS3ImageUrl}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              onChange({ fileList }: any) {
                setVideoList(
                  fileList.map((item: any) => {
                    return {
                      key: item.key,
                      url: S3ImageUrl(item.key),
                    };
                  }),
                );
              },
            }}
          />

          <div>描述信息</div>
          <ReactQuill
            key={'richValue'}
            className="publish-quill mb-[30px]"
            placeholder="请输入文章内容"
            theme="snow"
            value={richValue}
            onChange={setRichValue}
          />
        </ProForm>
      </div>
    </div>
  );
};

export default RoomDetail;
