import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { AttractionServiceApi, Story, StoryServiceApi } from '@/apifox/index';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { ColorPicker } from 'antd';
import { LabeledValue } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; //富文本样式文件

interface RoomFormProps extends ModalFormProps<Story> {
  initialValues: Story | undefined;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const AddGuideForm = ({ onCancel, initialValues, onAddSuccess, ...props }: RoomFormProps) => {
  const storyServiceApi = new StoryServiceApi();
  const title = initialValues?.id ? '修改攻略' : '新建攻略';
  const [richValue, setRichValue] = useState(initialValues?.article);
  const [fileList, setFileList] = useState<any[]>(
    initialValues?.images?.map((item: string) => ({
      key: item,
      url: S3ImageUrl(item),
    })) || [],
  );
  console.log(initialValues);

  const onFinish = async (value: any) => {
    value.article = richValue;
    value.images = value.headerImage_file.map((item: any) => item.response?.key || item.key);
    delete value.headerImage_file;

    value.detail.journey = value.journeyList.map((item: any, idx: any) => ({
      number: idx + 1,
      ...item,
    }));
    delete value.journeyList;

    if (initialValues?.id) {
      storyServiceApi
        .storyServiceUpdate({
          storyId: initialValues.id,
          body: { story: value as Story },
        })
        .then(() => {
          onAddSuccess();
        });
    } else {
      value.status = 'audit_status';
      value.kind = 'tourism_strategy_kind';
      storyServiceApi
        .storyServiceCreate({
          body: { story: value as Story },
        })
        .then(() => {
          onAddSuccess();
        });
    }

    return true;
  };

  useEffect(() => {
    if (initialValues?.images) {
      const list = initialValues.images.map((item: string) => ({
        key: item,
        url: S3ImageUrl(item),
      }));
      setFileList(list);
    } else {
      setFileList([]);
    }
  }, [initialValues?.images]);

  useEffect(() => {
    setRichValue(initialValues?.article);
  }, [initialValues?.article]);

  const attractionService = new AttractionServiceApi();

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

  return (
    <ModalForm<Story>
      title={title}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
      size="large"
      width={'1200px'}
      {...props}
    >
      <ProFormUploadButton
        name="headerImage_file"
        initialValue={fileList}
        max={1}
        label="攻略头图"
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
      <ProFormText width="md" name="title" label="标题" placeholder="请输入标题" />
      <ProFormText
        width="md"
        name={['detail', 'subTitle']}
        label="标签语"
        placeholder="请输入标签语"
      />
      <ProFormGroup>
        <ProFormText name="country" label="国家" placeholder="请输入名称" />
        <ProFormText name="city" label="城市" placeholder="请输入名称" />
        <ProFormSelect
          label="所属地区"
          request={getAttractionList}
          debounceTime={500}
          initialValue={{
            value: initialValues?.attraction?.id,
            label: initialValues?.attraction?.name,
          }}
          name="attractionId"
          width="md"
          showSearch
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText name={['detail', 'kind']} label="游玩类型" />
        <ProFormText name={['detail', 'recommendedDay']} label="推荐时长" />
        <ProFormText name={['detail', 'perPersonFee']} label="预估人均 (元)" />
      </ProFormGroup>
      <div>特色介绍</div>
      <ReactQuill
        key={'richValue'}
        className="publish-quill"
        placeholder="请输入攻略内容"
        theme="snow"
        value={richValue}
        onChange={setRichValue}
      />
      <div className="mt-[20px]"></div>
      <ProFormList
        name="journeyList"
        label="行程参考"
        initialValue={initialValues?.detail?.journey ?? []}
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: '添加行程',
        }}
      >
        <ProForm.Group key="group" size={8}>
          <ProFormText name="title" label="行程标题" width={'lg'} />
          <ProFormText name="content" label="行程内容" width={'lg'} />
        </ProForm.Group>
      </ProFormList>
    </ModalForm>
  );
};

export default AddGuideForm;
