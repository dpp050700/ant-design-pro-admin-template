import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import { LeftOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  RoomServiceApi,
  VirtualGood,
  VirtualGoodAdminServiceApi,
  VirtualGoodCreateReq,
  VirtualGoodKind,
  VirtualGoodServiceApi,
  VirtualGoodServiceFindVirtualGoodTypeEnum,
  VirtualGoodType,
} from '@/apifox/index';

import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';

import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { Flex, message } from 'antd';
import ReactQuill from 'react-quill';

const pointsMarketAdminServiceApi = new VirtualGoodAdminServiceApi();
const pointsMarketServiceApi = new VirtualGoodServiceApi();

const PointsMarketDetail = () => {
  const params = useParams();

  const goodsId = params.id;

  const [initialValues, setInitialValues] = useState<VirtualGood & { count?: number | null }>();

  const [fileList, setFileList] = useState<any[]>([]);
  const [richValue, setRichValue] = useState('');

  useRequest(
    () =>
      pointsMarketServiceApi.virtualGoodServiceGetVirtualGood({
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
        setRichValue(res?.description || '');
        setInitialValues({ ...res, count: res.skuCount });
      },
    },
  );

  const { runAsync: createGood } = useRequest(
    (data: VirtualGoodCreateReq) =>
      pointsMarketAdminServiceApi.virtualGoodAdminServiceCreateVirtualGood({
        body: data,
      }),
    {
      manual: true,
    },
  );

  const { runAsync: updateGood } = useRequest(
    (id: string, data: VirtualGoodCreateReq) =>
      pointsMarketAdminServiceApi.virtualGoodAdminServiceUpdateVirtualGood({
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
      kind: VirtualGoodKind.Gift,
    };

    if (initialValues?.id) {
      await updateGood(initialValues?.id, body);
      message.success('修改商品成功');
      history.push(`/pointsMarket/goodsList`);
    } else {
      await createGood(body);
      message.success('添加商品成功');
      history.push(`/pointsMarket/goodsList`);
    }
  };

  // useEffect(() => {
  //   setRichValue(initialValues?.description || "");
  // }, [initialValues]);

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center bg-[#fff] h-[60px] px-[20px] justify-between text-[16px]">
        <div className="flex items-center gap-[10px]">
          <LeftOutlined onClick={() => history.push(`/pointsMarket/goodsList`)} />
          {goodsId === 'new' ? '添加商品' : '修改商品'}
        </div>
      </div>
      <div className="bg-[#fff] mt-[15px] py-[20px]" key={initialValues?.id}>
        <ProForm<VirtualGood>
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
          <ProFormText width="md" name="name" label="商品名称" placeholder="请输入商品名称" />
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

          <ProFormRadio.Group
            name="type"
            label="商品类型"
            options={[
              {
                label: '实体',
                value: VirtualGoodType.Physical,
              },
              {
                label: '虚体',
                value: VirtualGoodType.Virtual,
              },
            ]}
          />

          <ProFormText width="md" name="points" label="需兑换积分" placeholder="请输入需兑换积分" />

          <ProFormText width="md" name="count" label="库存" placeholder="请输入库存数量" />

          <div className="flex items-start">
            <div className="w-[120px] text-right pr-[8px]">描述信息 :</div>
            <ReactQuill
              key="richValue"
              className="flex-1 publish-quill"
              placeholder="请输入文章内容"
              theme="snow"
              value={richValue}
              onChange={setRichValue}
            />
          </div>
        </ProForm>
      </div>
    </div>
  );
};

export default PointsMarketDetail;
