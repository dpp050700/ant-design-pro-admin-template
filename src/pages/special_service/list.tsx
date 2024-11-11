import React, { useRef, useState } from 'react';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
  ProTable,
} from '@ant-design/pro-components';
import {
  RoomAdminServiceApi,
  RoomServiceApi,
  SpecialService,
  SpecialServiceFromJSON,
} from '../../apifox';
import { Button, Form, Image } from 'antd';
import { PutS3ImageUrl, S3ImageUrl } from '@/components/Image';
import { UploadFile } from 'antd/es/upload/interface';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; //富文本样式文件
import { useParams } from '@umijs/max';
import Currency from '@/components/Currency';

const serviceApi = new RoomServiceApi();
const adminApi = new RoomAdminServiceApi();

interface AttractionModelProps {
  title: string;
  data?: SpecialService;
  catalogId: string;
}

const SpecialServiceModel = (props: AttractionModelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState(props.data || SpecialServiceFromJSON({}));
  const [roomPrice, setRoomPrice] = useState(props?.data?.price ?? 0);

  const [fileList, setFileList] = useState<UploadFile[]>(
    props.data?.images?.map(
      (image): UploadFile => ({
        uid: image,
        percent: 50,
        name: image,
        status: 'done',
        url: S3ImageUrl(image),
      }),
    ) || [],
  );

  const [fileList1, setFileList1] = useState<UploadFile[]>(
    props.data?.thumbnail
      ? [
          {
            uid: props.data?.thumbnail || '',
            percent: 50,
            name: props.data?.thumbnail || '',
            status: 'done',
            url: props.data?.thumbnail ? S3ImageUrl(props.data?.thumbnail) : undefined,
          },
        ]
      : [],
  );

  return (
    <>
      <Button key="add" onClick={() => setIsModalOpen(true)}>
        {props.data ? '修改' : '添加'}
      </Button>
      <ModalForm
        title={props.title}
        open={isModalOpen}
        initialValues={props.data}
        onFinish={async (value: any) => {
          value.description = data.description;
          value.detail = data.detail;
          value.images = value.images_file.map((item: any) =>
            item.response ? item.response.key : item.name,
          );

          const thumbnails = value.thumbnail_file.map((item: any) =>
            item.response ? item.response.key : item.name,
          );
          value.thumbnail = thumbnails.length > 0 ? thumbnails[0] : value.thumbnail;
          value.catalogId = props.catalogId;
          data.id
            ? await adminApi.roomAdminServiceUpdateSpecialService({
                body: { specialService: value },
                id: data?.id,
              })
            : await adminApi.roomAdminServiceCreateSpecialService({
                body: { specialService: value },
              });

          setIsModalOpen(false);
          location.reload();
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setIsModalOpen(false),
        }}
      >
        <ProFormText width="md" name="name" label="服务名字" placeholder="请输入名称" />

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

        <Form.Item label="预约方式">
          <ReactQuill
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={data.detail?.appointmentMethod || ''}
            onChange={(value: string) =>
              setData({
                ...data,
                detail: { ...data.detail, appointmentMethod: value },
              })
            }
          />
        </Form.Item>

        <Form.Item label="服务时间">
          <ReactQuill
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={data.detail?.serviceTime || ''}
            onChange={(value: string) =>
              setData({
                ...data,
                detail: { ...data.detail, serviceTime: value },
              })
            }
          />
        </Form.Item>

        <Form.Item label="使用规则">
          <ReactQuill
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={data.detail?.usageRules || ''}
            onChange={(value: string) =>
              setData({
                ...data,
                detail: { ...data.detail, usageRules: value },
              })
            }
          />
        </Form.Item>

        <Form.Item label="服务内容简介">
          <ReactQuill
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={data.detail?.introduction || ''}
            onChange={(value: string) =>
              setData({
                ...data,
                detail: { ...data.detail, introduction: value },
              })
            }
          />
        </Form.Item>

        <ProFormUploadButton
          name="thumbnail_file"
          initialValue={fileList1}
          label="上传图标"
          max={1}
          action={PutS3ImageUrl}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onChange({ fileList }) {
              setFileList1(fileList);
            },
          }}
        />

        <ProFormUploadButton
          name="images_file"
          initialValue={fileList}
          label="上传图片"
          action={PutS3ImageUrl}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            onChange({ fileList }) {
              setFileList(fileList);
            },
          }}
        />

        <Form.Item label="服务介绍">
          <ReactQuill
            className="publish-quill"
            placeholder="请输入文章内容"
            theme="snow"
            value={data.description || ''}
            onChange={(value: string) => setData({ ...data, description: value })}
          />
        </Form.Item>
      </ModalForm>
    </>
  );
};

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { id } = useParams();
  const [title, setTitle] = useState<string | null>(null);

  const columns: ProColumns<SpecialService>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名字',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      ellipsis: true,
      search: false,
    },
    {
      title: '缩略图',
      dataIndex: 'thumbnail',
      ellipsis: true,
      search: false,
      render: (text, record, _, action) => [
        <Image key={record.thumbnail} src={S3ImageUrl(record.thumbnail || '')} />,
      ],
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
    },
    {
      title: '图片',
      dataIndex: 'images',
      ellipsis: true,
      search: false,
      render: (text, record, _, action) => [
        <>
          {record.images?.map((image) => {
            return <Image key={image} src={S3ImageUrl(image)} />;
          })}
        </>,
      ],
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      ellipsis: true,
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      ellipsis: true,
      valueType: 'dateTime',
      key: 'showTime',
      sorter: true,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        return [
          <SpecialServiceModel key={'update_from'} title={'修改'} data={record} catalogId={id!} />,
          <Button
            key={'delete'}
            type="primary"
            onClick={async () => {
              await adminApi.roomAdminServiceDeleteSpecialService({
                id: record.id,
              });
              location.reload();
            }}
          >
            删除
          </Button>,
        ];
      },
    },
  ];

  return (
    <ProTable<SpecialService>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        const res = await serviceApi.roomServiceFindSpecialServiceCatalogDetail({
          id: id!,
        });
        setTitle(res.name);
        return {
          data:
            res.specialServices?.map((item) => ({
              ...item,
              children: undefined, //去掉列表的展开加号
            })) || [],
          success: true,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={false}
      headerTitle={title}
      dateFormatter="string"
      toolBarRender={() => [
        <SpecialServiceModel catalogId={id!} key={'create_from'} title={'新建'} />,
      ]}
    />
  );
};

export default TablePage;
