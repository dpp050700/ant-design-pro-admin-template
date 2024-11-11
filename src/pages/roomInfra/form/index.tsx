import React, { useEffect, useState } from 'react';
import { Form, AutoComplete } from 'antd';
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { RoomInfra, RoomAdminServiceApi } from '@/apifox/index';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';

interface RoomFormProps extends ModalFormProps<RoomInfra> {
  initialValues: RoomInfra | undefined;
  catalogs: { value: string }[];
  onCancel: () => void;
  onAddSuccess: () => void;
}

const RoomInfraForm = ({
  onCancel,
  initialValues,
  catalogs,
  onAddSuccess,
  ...props
}: RoomFormProps) => {
  const roomAdminService = new RoomAdminServiceApi();
  const title = initialValues?.id ? '修改房间服务' : '新建房间服务';

  const [icon, setIcon] = useState<any[]>([]);

  const onFinish = async (value: any) => {
    value.backgroundColor = value.backgroundColor || null;
    const params: Partial<RoomInfra> = {
      catalog: value.catalog,
      name: value.name,
      icon: value.thumbnail_file.map((item: any) => item.response?.key || item.key)[0] || '',
    };

    if (initialValues?.id) {
      roomAdminService
        .roomAdminServiceRoomInfraSave({
          body: { ...params, id: initialValues.id } as RoomInfra,
        })
        .then(() => {
          onAddSuccess();
        });
    } else {
      roomAdminService
        .roomAdminServiceRoomInfraSave({
          body: { ...params } as RoomInfra,
        })
        .then(() => {
          onAddSuccess();
        });
    }

    return true;
  };

  useEffect(() => {
    if (initialValues?.icon) {
      const list = [
        {
          key: initialValues.icon,
          url: S3ImageUrl(initialValues.icon),
        },
      ];
      setIcon(list);
    } else {
      setIcon([]);
    }
  }, [initialValues?.icon]);

  return (
    <ModalForm<RoomInfra>
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
      <Form.Item name="catalog" label="服务类型">
        <AutoComplete
          options={catalogs}
          // onSearch={handleSearch}
          placeholder="请输入服务类型"
        />
      </Form.Item>
      {/* <ProFormText
        width="md"
        name="catalog"
        label="服务类型"
        placeholder="请输入服务类型"
        fieldProps={{ autoComplete: true }}
      /> */}
      <ProFormText width="md" name="name" label="服务名称" placeholder="请输入服务名称" />
      <ProFormUploadButton
        name="thumbnail_file"
        initialValue={icon}
        max={1}
        label="图标"
        action={PutS3ImageUrl}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          onChange({ fileList }) {
            setIcon(
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
    </ModalForm>
  );
};

export default RoomInfraForm;
