import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { RoomServiceApi, RoomAdminServiceApi, SpecialServiceCatalog } from '@/apifox/index';
import { Button, Dropdown, message, Modal } from 'antd';
import SpecialServiceCatalogForm from '../form';
import { history } from '@umijs/max';
import { LanguageOptions } from '@/constants/index';

const roomService = new RoomServiceApi();
const roomAdminService = new RoomAdminServiceApi();

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [formOpen, setFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<SpecialServiceCatalog>();

  const onCopy = async (data: SpecialServiceCatalog, lang: string) => {
    roomAdminService
      .roomAdminServiceServiceCopy({
        body: {
          language: [lang as any],
          serviceCatalogId: data.id,
        },
      })
      .then(() => {
        message.success('复制成功');
      });
  };

  const columns: ProColumns<SpecialServiceCatalog>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '服务类型',
      dataIndex: 'name',
      ellipsis: true,
      search: false,
    },
    {
      title: '主服务',
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
      width: '300px',
      fixed: 'right',
      render: (dom, record) => {
        const CopyJsx = record.isMaster ? (
          <Dropdown
            key="copy"
            menu={{
              items: LanguageOptions.filter((item) => item.value !== record.language)?.map(
                (item) => ({
                  key: item.value,
                  label: <div onClick={() => onCopy(record, item.value)}>复制{item.label}服务</div>,
                }),
              ),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>复制服务</a>
          </Dropdown>
        ) : null;
        return [
          CopyJsx,
          <a key="edit" onClick={() => onEdit(record)}>
            编辑
          </a>,
          <a key="view" onClick={() => onView(record.id)}>
            查看
          </a>,
          <a key="delete" onClick={() => onDelete(record)}>
            删除
          </a>,
        ];
      },
    },
  ];

  const onDelete = (data: SpecialServiceCatalog) => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        roomAdminService
          .roomAdminServiceDeleteSpecialServiceCatalog({
            id: data.id,
          })
          .then(() => {
            actionRef.current?.reload();
          });
      },
    });
  };

  const onView = (id: string) => {
    history.push(`/special_service/list/${id}`);
  };

  const onAdd = () => {
    setInitialValues(undefined);
    setFormOpen(true);
  };

  const onEdit = (data: SpecialServiceCatalog) => {
    setInitialValues(data);
    setFormOpen(true);
  };

  const getList = async () => {
    const res = await roomService.roomServiceFindSpecialServiceCatalog({});
    return {
      data:
        res.catalogs?.map((item) => ({
          ...item,
          children: undefined, //去掉列表的展开加号
        })) || [],
      success: true,
    };
  };

  return (
    <>
      <SpecialServiceCatalogForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        initialValues={initialValues}
        onAddSuccess={() => {
          setFormOpen(false);
          actionRef.current?.reload();
        }}
      />
      <ProTable<SpecialServiceCatalog>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={getList}
        rowKey="id"
        search={false}
        pagination={false}
        headerTitle="特色服务"
        toolBarRender={() => [
          <Button key="add" onClick={onAdd}>
            添加
          </Button>,
        ]}
      />
    </>
  );
};

export default TablePage;
