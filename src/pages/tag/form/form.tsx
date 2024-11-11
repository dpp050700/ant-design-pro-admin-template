import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ModalFormProps,
  ProFormText,
  ProForm,
  ProFormSelect,
} from '@ant-design/pro-components';
import { TagServiceApi, V1Tag } from '@/apifox/index';
import { ColorPicker } from 'antd';
import { tagOpts } from '../list';

const tagService = new TagServiceApi();

interface TagFormProps extends ModalFormProps<V1Tag> {
  initialValues: V1Tag | undefined;
  onCancel: () => void;
  onUpdateSuccess: () => void;
}

const TagForm = ({ onCancel, initialValues, onUpdateSuccess, ...props }: TagFormProps) => {
  const title = initialValues?.id ? '修改标签' : '新建标签';

  const onFinish = async (value: any) => {
    const formValue: V1Tag = {
      name: value.name,
      kind: value.kind,
      backColor:
        typeof value.backColor === 'string' || !value.backColor
          ? value.backColor
          : value.backColor.toHexString(),
      fontColor:
        typeof value.fontColor === 'string' || !value.fontColor
          ? value.fontColor
          : value.fontColor.toHexString(),
    };
    initialValues?.id
      ? await tagService.tagServiceUpdate({
          body: { tag: formValue },
          id: initialValues?.id,
        })
      : await tagService.tagServiceCreate({ body: { tag: formValue } });
    onUpdateSuccess();
    return true;
  };

  return (
    <ModalForm<V1Tag>
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
      <ProFormText width="md" name="name" label="标签名称" placeholder="请输入标签名称" />
      <ProFormSelect
        label="标签类型"
        options={tagOpts.map((v) => ({ value: v.key, label: v.tab }))}
        debounceTime={500}
        initialValue={{
          value: initialValues?.kind,
          label: tagOpts.find((v) => v.key === initialValues?.kind)?.tab,
        }}
        name="kind"
        width="md"
      />

      <ProForm.Item name="backColor" label="背景颜色">
        <ColorPicker showText defaultValue={null} format="hex" />
      </ProForm.Item>

      <ProForm.Item name="fontColor" label="文字颜色">
        <ColorPicker showText defaultValue={null} format="hex" />
      </ProForm.Item>
    </ModalForm>
  );
};

export default TagForm;
