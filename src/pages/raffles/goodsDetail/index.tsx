import React, { useEffect, useRef, useState } from 'react';
import { history } from '@umijs/max';
import { LeftOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  VirtualGood,
  VirtualGoodAdminServiceApi,
  VirtualGoodCreateReq,
  VirtualGoodKind,
  VirtualGoodServiceApi,
  VirtualGoodType,
} from '@/apifox/index';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';

import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { Flex, Form, message } from 'antd';
import ReactQuill from 'react-quill';

const rafflesAdminServiceApi = new VirtualGoodAdminServiceApi();
const rafflesServiceApi = new VirtualGoodServiceApi();

const RafflesDetail = () => {
  const params = useParams();

  const goodsId = params.id;
  const formRef = useRef<ProFormInstance>();

  const [initialValues, setInitialValues] = useState<
    Partial<VirtualGood> & { count?: number | null }
  >({
    type: VirtualGoodType.Virtual,
  });

  const [fileList, setFileList] = useState<any[]>([]);
  const [richValue, setRichValue] = useState('');

  useRequest(
    () =>
      rafflesServiceApi.virtualGoodServiceGetVirtualGood({
        id: params.id!,
      }),
    {
      ready: !!goodsId && goodsId !== 'new',
      refreshDeps: [params.id],
      onSuccess(res) {
        if (res?.thumbnail) {
          setFileList([
            {
              key: res?.thumbnail,
              url: S3ImageUrl(res?.thumbnail),
            },
          ]);
        }
        // setRichValue(res?.description || "");
        setInitialValues({ ...res, count: res.skuCount });
      },
    },
  );

  const { runAsync: createGood } = useRequest(
    (data: VirtualGoodCreateReq) =>
      rafflesAdminServiceApi.virtualGoodAdminServiceCreateVirtualGood({
        body: data,
      }),
    {
      manual: true,
    },
  );

  const { runAsync: updateGood } = useRequest(
    (id: string, data: VirtualGoodCreateReq) =>
      rafflesAdminServiceApi.virtualGoodAdminServiceUpdateVirtualGood({
        body: data,
        id,
      }),
    {
      manual: true,
    },
  );

  const onFinish = async (data: any) => {
    const { thumbnail_file = [], ...rest } = data;
    const thumbnail = fileList[0]?.key;

    const body = {
      ...rest,
      thumbnail,
      description: richValue,
      kind: VirtualGoodKind.Lottery,
    };
    if (initialValues?.id) {
      await updateGood(initialValues?.id, body);
      message.success('修改奖品成功');
      history.push(`/raffles/goodsList`);
    } else {
      await createGood(body);
      message.success('添加奖品成功');
      history.push(`/raffles/goodsList`);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center bg-[#fff] h-[60px] px-[20px] justify-between text-[16px]">
        <div className="flex items-center gap-[10px]">
          <LeftOutlined onClick={() => history.push(`/raffles/goodsList`)} />
          {goodsId === 'new' ? '添加奖品' : '修改奖品'}
        </div>
      </div>
      <div className="bg-[#fff] mt-[15px] py-[20px]" key={initialValues?.id}>
        <ProForm<VirtualGood>
          formRef={formRef}
          autoFocusFirstInput
          onFinish={onFinish}
          initialValues={initialValues}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            render: (props, dom) => {
              return (
                <Flex justify="center" className="mt-[20px]">
                  {dom}
                </Flex>
              );
            },
          }}
          layout="horizontal"
          labelCol={{ style: { width: '120px' } }}
          wrapperCol={{ span: 14 }}
        >
          <ProFormRadio.Group
            name="type"
            label="奖品类型"
            options={[
              {
                label: '积分',
                value: VirtualGoodType.Virtual,
              },
              {
                label: '实体',
                value: VirtualGoodType.Physical,
              },
              {
                label: '无奖',
                value: VirtualGoodType.Empty,
              },
            ]}
          />
          <Form.Item noStyle shouldUpdate>
            {(form) => {
              return form.getFieldValue('type') === VirtualGoodType.Virtual ? (
                <ProFormText
                  width="sm"
                  name="points"
                  label="奖品名称"
                  placeholder="请输入积分数"
                  fieldProps={{ suffix: 'CJP' }}
                />
              ) : (
                <ProFormText width="md" name="name" label="商品名称" placeholder="请输入商品名称" />
              );
            }}
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {(form) => {
              return form.getFieldValue('type') === VirtualGoodType.Empty ? null : (
                <>
                  <ProFormUploadButton
                    name="thumbnail_file"
                    initialValue={fileList}
                    max={1}
                    label="商品图"
                    action={PutS3ImageUrl}
                    fieldProps={{
                      name: 'file',
                      listType: 'picture-card',
                      onChange({ fileList }) {
                        setFileList(
                          fileList.map((item: any) => {
                            console.log(item);
                            return {
                              key: item.response?.key,
                              url: S3ImageUrl(item.response?.key),
                            };
                          }),
                        );
                      },
                    }}
                  />

                  <ProFormText width="sm" name="count" label="库存" placeholder="请输入库存数量" />
                </>
              );
            }}
          </Form.Item>

          <ProFormText
            width="sm"
            name={['detail', 'probability']}
            label="中奖概率"
            placeholder="请输入中奖概率"
            fieldProps={{ suffix: '%' }}
          />

          {/* <div className="flex items-start">
            <div className="w-[120px] text-right pr-[8px]">描述信息 :</div>
            <ReactQuill
              key="richValue"
              className="flex-1 publish-quill"
              placeholder="请输入文章内容"
              theme="snow"
              value={richValue}
              onChange={setRichValue}
            />
          </div> */}
        </ProForm>
      </div>
    </div>
  );
};

export default RafflesDetail;