import React, { useRef, useState } from 'react';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  ProTable,
} from '@ant-design/pro-components';
import { Attraction, AttractionAdminServiceApi, AttractionServiceApi } from '../../apifox';
import { Button, Dropdown, Image, message, Modal, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { UploadFile } from 'antd/es/upload/interface';
import { useRequest } from 'ahooks';
import { LanguageOptions } from '@/constants/index';

const serviceApi = new AttractionServiceApi();
const adminApi = new AttractionAdminServiceApi();

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // const [form] = Form.useForm<Attraction>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { runAsync: ajaxTop } = useRequest((id) => adminApi.attractionAdminServiceTopping({ id }), {
    manual: true,
  });

  const { runAsync: ajaxUnTop } = useRequest(
    (id) => adminApi.attractionAdminServiceUnTopping({ id }),
    { manual: true },
  );
  const setTop = async ({ id, isTopped }: { id: string; isTopped: boolean }) => {
    if (!isTopped) {
      await ajaxTop(id);
    } else {
      await ajaxUnTop(id);
    }
    actionRef.current?.reload();
  };
  const onCopy = async (data: Attraction, lang: string) => {
    adminApi
      .attractionAdminServiceCopy({
        attractionId: data.id,
        language: lang as any,
      })
      .then(() => {
        message.success('复制成功');
      });
  };
  const onDelete = async (record: Attraction) => {
    const content = `${
      record.isMaster ? '删除主景点，会同步删除其他语言景点，' : ''
    }是否确定要删除？`;
    Modal.confirm({
      content: content,
      async onOk() {
        await adminApi.attractionAdminServiceDelete({ id: record.id });
        actionRef.current?.reload();
      },
    });
  };

  const columns: ProColumns<Attraction>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '景点名字',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '地区',
      dataIndex: 'city',
      ellipsis: true,
      search: false,
    },
    {
      title: '国家',
      dataIndex: 'country',
      ellipsis: true,
      search: false,
    },
    {
      title: '房源数',
      dataIndex: 'nearbyRoomCount',
      ellipsis: true,
      search: false,
    },
    {
      title: '图片',
      dataIndex: 'images',
      ellipsis: true,
      search: false,
      render: (text, record, _, action) => {
        return record.images?.map((image, index) => {
          return <Image width={120} height={120} key={index} src={S3ImageUrl(image)} />;
        });
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
      hideInTable: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      ellipsis: true,
      valueType: 'dateTime',
      key: 'showTime',
      sorter: true,
      search: false,
      hideInTable: true,
    },
    {
      title: '主景点',
      dataIndex: 'isMaster',
      search: false,
      renderText: (text, row) => {
        return row.isMaster ? '是' : '否';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 320,
      render: (_, record) => {
        const CopyJsx = record.isMaster ? (
          <Dropdown
            key="copy"
            menu={{
              items: LanguageOptions.filter((item) => item.value !== record.language).map(
                (item) => ({
                  key: item.value,
                  label: <div onClick={() => onCopy(record, item.value)}>复制{item.label}景点</div>,
                }),
              ),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>复制景点</a>
          </Dropdown>
        ) : null;
        return [
          <Button
            key="top"
            size="small"
            onClick={() => setTop({ id: record.id, isTopped: !!record.isTopped })}
          >
            {record.isTopped ? '取消置顶' : '置顶'}
          </Button>,
          <ModalForm<Attraction>
            autoFocusFirstInput
            initialValues={record}
            title="修改"
            key={'edit_form'}
            trigger={<Button size="small">修改</Button>}
            modalProps={{
              destroyOnClose: true,
              onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onInit={(v) => {
              const ff: UploadFile[] =
                v.images?.map((v: string) => ({
                  uid: v,
                  name: v,
                  fileName: v,
                  status: 'done',
                  url: S3ImageUrl(v),
                })) || [];
              setFileList(ff);
            }}
            onFinish={async (values: any) => {
              values.images = fileList.map((item) =>
                item.response ? item.response.key : item.uid,
              );
              message.success('提交成功');
              await adminApi.attractionAdminServiceUpdate({
                attractionId: record.id,
                body: {
                  attraction: values,
                },
              });
              actionRef.current?.reload();
              return true;
            }}
          >
            <ProFormText width="md" name="name" label="景点名字" placeholder="请输入名称" />

            {/* <ProFormText
              width="md"
              name="address"
              label="景点地址"
              placeholder="请输入名称"
            /> */}

            <ProFormText width="md" name="country" label="国家" placeholder="请输入名称" />

            <ProFormText width="md" name="city" label="城市" placeholder="请输入名称" />

            <ProFormUploadButton
              action={PutS3ImageUrl()}
              onChange={({ file, fileList }) => {
                setFileList(fileList);
              }}
              fileList={fileList}
              name="file"
              label="Upload"
              max={1}
              // action={PutS3ImageUrl}
              // onChange={handleChange}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
            />
          </ModalForm>,
          CopyJsx,
          <a rel="noopener noreferrer" key="delete" onClick={() => onDelete(record)}>
            删除
          </a>,
        ];
      },
    },
  ];

  return (
    <ProTable<Attraction>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort);
        const res = await serviceApi.attractionServiceFind({
          pageLimit: params.pageSize!,
          pageOffset: params.current!,
          name: params.name,
          country: params.country,
          city: params.city,
          sortByUpdatedAt: sort.updatedAt || 'descend',
          sortByIsTopped: 'descend',
        });

        return {
          data:
            res.attractions?.map((item) => ({
              ...item,
              children: undefined, //去掉列表的展开加号
            })) || [],
          success: true,
          total: res.total,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{ pageSize: 10 }}
      headerTitle="景点列表"
      dateFormatter="string"
      toolBarRender={() => [
        <ModalForm<Attraction>
          autoFocusFirstInput
          key="create_form"
          title="新建"
          // form={form}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建
            </Button>
          }
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values: any) => {
            values.images = values.file.map((item: any) => item.response.key);
            const options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            };

            function success(pos: any) {
              const crd = pos.coords;
              console.log('您当前的位置是：');
              console.log(`纬度：${crd.latitude}`);
              console.log(`经度：${crd.longitude}`);
              console.log(`精确度：${crd.accuracy} 米`);
              values.latitude = crd.latitude;
              values.longitude = crd.longitude;
            }

            function error(err: any) {
              console.warn(`错误(${err.code})：${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
            await waitTime(500);
            console.log(values);
            message.success('提交成功');
            await adminApi.attractionAdminServiceCreate({
              body: { attraction: values },
            });
            actionRef.current?.reload();
            // setAccessImageUrl("")
            return true;
          }}
        >
          <ProFormText width="md" name="name" label="景点名字" placeholder="请输入名称" />

          {/* <ProFormText
            width="md"
            name="address"
            label="景点地址"
            placeholder="请输入名称"
          /> */}

          <ProFormText width="md" name="country" label="国家" placeholder="请输入名称" />

          <ProFormText width="md" name="city" label="城市" placeholder="请输入名称" />

          <ProFormUploadButton
            name="file"
            label="Upload"
            max={10}
            action={PutS3ImageUrl}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
          />
        </ModalForm>,
      ]}
    />
  );
};

export default TablePage;
