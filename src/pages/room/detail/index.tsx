// import ProFormQuill from '@/components/ProFormFields/ProFormQuill';
import React, { useEffect, useRef } from 'react';
import {
  ProForm,
  ProFormGroup,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { PutS3ImageUrl, S3ImageUrl } from '@/constants/s3Image';
import { useParams, history } from '@umijs/max';
import { LeftOutlined } from '@ant-design/icons';
import { AttractionServiceApi, RoomServiceApi, TagServiceApi } from '@/apifox';
import { LabeledValue } from 'antd/es/select';
import ProFormQuill from '@/components/ProFormFields/ProFormQuill';
import { Tag } from 'antd';

const Detail = () => {
  const params = useParams();
  const formRef = useRef<ProFormInstance>();

  const attractionService = new AttractionServiceApi();
  const tagService = new TagServiceApi();
  const roomService = new RoomServiceApi();

  const getTagList = async (data: any) => {
    const { data: tags = [] } = await tagService.tagServiceList({
      name: data.keyWords,
      pageLimit: 2000,
      pageOffset: 0,
      kind: data.kind,
    });
    return tags.map((v: any) => {
      return {
        label: v.name,
        value: v.id,
        backColor: v.backColor,
        fontColor: v.fontColor,
        kind: v.kind,
      };
    });
  };

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

  const onFinish = async (values: any) => {
    if (params.id) {
      console.log(values);
      // await service.roomServiceUpdate(params.id, values);
    } else {
      // await service.roomServiceCreate(values);
    }
  };

  const getRoomDetail = async () => {
    const data = await roomService.roomServiceDetail({ id: params.id! });
    console.log(data);
    formRef.current?.setFieldsValue(data);
  };

  useEffect(() => {
    if (params.id && params.id !== 'add') {
      getRoomDetail();
    }
  }, [params.id]);

  return (
    <>
      <div className="flex items-center gap-[10px] p-[20px] bg-white">
        <LeftOutlined onClick={() => history.push('/room/list')} />
        {params.id ? '修改' : '添加'}
      </div>
      <div className="p-[20px] bg-white mt-[20px]">
        <ProForm
          grid
          layout="horizontal"
          rowProps={{ gutter: [0, 0] }} // gutter 设置 x 轴 y轴 间距
          labelCol={{ flex: '120px' }}
          colProps={{ span: 12 }}
          formRef={formRef}
          onFinish={onFinish}
        >
          <ProFormText name="title" label="房间名字" placeholder="" />
          <ProFormText name="country" label="国家" placeholder="" />
          <ProFormText name="city" label="城市" placeholder="" />
          <ProFormSelect
            name="nearbyAttractions"
            label="所属地区"
            placeholder=""
            mode="multiple"
            request={getAttractionList}
            showSearch
            convertValue={(nearbyAttractions) => {
              return (nearbyAttractions || []).map((item: any) => item.id);
            }}
            transform={(value) => {
              return {
                nearbyAttractionIds: value.map((item: any) => item.id),
              };
            }}
          />
          <ProFormText name="address" label="景点地址" placeholder="" />
          <ProFormText name="addressDesc" label="景点描述" placeholder="" />

          <ProFormText
            name={['detail', 'info', 'bathrooms']}
            label="卫生间数"
            placeholder=""
            colProps={{ span: 6 }}
          />

          <ProFormText
            name={['detail', 'info', 'rooms']}
            label="卧室数"
            placeholder=""
            colProps={{ span: 6 }}
          />

          <ProFormText
            name={['detail', 'info', 'beds']}
            label="床数"
            placeholder=""
            colProps={{ span: 6 }}
          />

          <ProFormText
            name={['detail', 'info', 'capacity']}
            label="可住人数"
            placeholder=""
            colProps={{ span: 6 }}
          />

          <ProFormSelect
            width="md"
            mode="multiple"
            name="attrTags"
            colProps={{ span: 6 }}
            label="房源属性标签"
            request={(data) => getTagList({ ...data, kind: 'attr' })}
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
            name="funcTags"
            colProps={{ span: 6 }}
            label="房源功能标签"
            request={(data) => getTagList({ ...data, kind: 'func' })}
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
            name="descTags"
            colProps={{ span: 6 }}
            label="房源描述标签"
            request={(data) => getTagList({ ...data, kind: 'desc' })}
            fieldProps={{
              optionItemRender: (item: any) => (
                <Tag color={item.backColor} style={{ color: item.fontColor || '#fff' }}>
                  {item.label}
                </Tag>
              ),
            }}
          />

          <ProFormQuill
            name={['detail', 'checkTime']}
            label="入住和退房时间"
            colProps={{ span: 24 }}
          />

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

          <ProFormText
            label="价格"
            placeholder="请输入价格"
            name="price"
            fieldProps={{
              prefix: '$',
            }}
          />

          <ProFormGroup colProps={{ span: 24 }}>
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
              colProps={{ span: 6 }}
            />
            <ProFormText
              name={['detail', 'serviceFee']}
              label="服务费"
              placeholder="请输入服务费"
              colProps={{ span: 6 }}
            />

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
              colProps={{ span: 6 }}
            />

            <ProFormText
              name={['detail', 'localTax']}
              label="地方税"
              placeholder="请输入地方税"
              colProps={{ span: 6 }}
            />
          </ProFormGroup>

          <ProFormQuill name={['detail', 'roomNotice']} label="入住须知" colProps={{ span: 24 }} />

          <ProFormUploadButton
            name="images"
            label="房源图片"
            max={1}
            convertValue={(value) => {
              if (!value) return [];
              return value.map((item: any) => {
                if (typeof item === 'string') {
                  return {
                    url: S3ImageUrl(item),
                    thumbUrl: S3ImageUrl(item),
                    uid: item,
                    name: item,
                    status: 'done',
                  };
                }
                return item;
              });
            }}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
            action={PutS3ImageUrl}
            transform={(value) => {
              return {
                images: value.map((item: any) => {
                  if (item.response) {
                    return item.response.key;
                  }
                  return item;
                }),
              };
            }}
          />

          <ProFormQuill name="description" label="描述信息" colProps={{ span: 24 }} />
        </ProForm>
      </div>
    </>
  );
};

export default Detail;
