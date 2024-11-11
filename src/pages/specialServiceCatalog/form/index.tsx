import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  SpecialServiceCatalog,
  RoomAdminServiceApi,
  UpdateSpecialServiceCatalogBody,
} from '@/apifox/index';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { ColorPicker } from 'antd';

interface RoomFormProps extends ModalFormProps<SpecialServiceCatalog> {
  initialValues: SpecialServiceCatalog | undefined;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const SpecialServiceCatalogForm = ({
  onCancel,
  initialValues,
  onAddSuccess,
  ...props
}: RoomFormProps) => {
  const roomAdminService = new RoomAdminServiceApi();
  const title = initialValues?.id ? '修改特色服务' : '新建特色服务';
  const [fileList, setFileList] = useState<any[]>(
    initialValues?.headerImages?.map((item: string) => ({
      key: item,
      url: S3ImageUrl(item),
    })) || [],
  );
  console.log(initialValues);

  const [thumbnail, setThumbnail] = useState<any[]>([]);

  const onFinish = async (value: any) => {
    value.backgroundColor = value.backgroundColor || null;
    const params: Partial<SpecialServiceCatalog> = {
      name: value.name,
      thumbnail: value.thumbnail_file.map((item: any) => item.response?.key || item.key)[0] || '',
      headerImages: value.headerImage_file.map((item: any) => item.response?.key || item.key),
      backgroundColor:
        typeof value.backgroundColor === 'string' || !value.backgroundColor
          ? value.backgroundColor
          : value.backgroundColor.toHexString(),
    };

    if (initialValues?.id) {
      roomAdminService
        .roomAdminServiceUpdateSpecialServiceCatalog({
          id: initialValues.id,
          body: { catalog: params as SpecialServiceCatalog },
        })
        .then(() => {
          onAddSuccess();
        });
    } else {
      roomAdminService
        .roomAdminServiceCreateSpecialServiceCatalog({
          body: params as SpecialServiceCatalog,
        })
        .then(() => {
          onAddSuccess();
        });
    }

    return true;
  };

  useEffect(() => {
    if (initialValues?.headerImages) {
      const list = initialValues.headerImages.map((item: string) => ({
        key: item,
        url: S3ImageUrl(item),
      }));
      setFileList(list);
    } else {
      setFileList([]);
    }
  }, [initialValues?.headerImages]);

  useEffect(() => {
    if (initialValues?.thumbnail) {
      const list = [
        {
          key: initialValues.thumbnail,
          url: S3ImageUrl(initialValues.thumbnail),
        },
      ];
      setThumbnail(list);
    } else {
      setThumbnail([]);
    }
  }, [initialValues?.thumbnail]);

  return (
    <ModalForm<SpecialServiceCatalog>
      title={title}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
      {...props}
    >
      <ProFormText width="md" name="name" label="服务类型" placeholder="请输入服务类型" />
      <ProFormUploadButton
        name="thumbnail_file"
        initialValue={thumbnail}
        max={1}
        label="图标"
        action={PutS3ImageUrl}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          onChange({ fileList }) {
            setThumbnail(
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
        name="headerImage_file"
        initialValue={fileList}
        max={1}
        label="顶部图片"
        action={PutS3ImageUrl}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          onChange({ fileList }) {
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
      <ProForm.Item name="backgroundColor" label="背景底色">
        <ColorPicker showText defaultValue={null} format="hex" />
      </ProForm.Item>
    </ModalForm>
  );
};

export default SpecialServiceCatalogForm;
