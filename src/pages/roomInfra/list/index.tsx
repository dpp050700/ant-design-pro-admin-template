import React, { useEffect, useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { RoomServiceApi, RoomAdminServiceApi, RoomInfra } from '@/apifox/index';
import { Button, Dropdown, message, Modal, Image } from 'antd';
import RoomInfraForm from '../form';
import { S3ImageUrl } from '@/components/Image';

const roomAdminService = new RoomAdminServiceApi();

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [formOpen, setFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<RoomInfra>();
  const [catalogs, setCatalogs] = useState<string[]>([]);
  const [infra, setInfra] = useState<{ [key: string]: RoomInfra[] }>({});
  const [activeKey, setActiveKey] = useState<string>();

  const columns: ProColumns<RoomInfra>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      fixed: 'left',
    },
    {
      title: '类型',
      dataIndex: 'catalog',
      ellipsis: true,
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      search: false,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      ellipsis: true,
      search: false,
      render: (text, record, _, action) => {
        if (!record.icon) {
          return '--';
        }
        return (
          <Image
            className="!w-[100px] aspect-square"
            key={record.icon}
            src={S3ImageUrl(record.icon!)}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '300px',
      fixed: 'right',
      render: (dom, record) => {
        return [
          <a key="edit" onClick={() => onEdit(record)}>
            编辑
          </a>,
          <a key="delete" onClick={() => onDelete(record)}>
            删除
          </a>,
        ];
      },
    },
  ];

  const onDelete = (data: RoomInfra) => {
    Modal.confirm({
      content: '是否确定要删除？',
      onOk() {
        roomAdminService
          .roomAdminServiceRoomInfraDelete({
            id: data.id!,
          })
          .then(() => {
            getList();
          });
      },
    });
  };

  const onAdd = () => {
    setInitialValues(undefined);
    setFormOpen(true);
  };

  const onEdit = (data: RoomInfra) => {
    setInitialValues(data);
    setFormOpen(true);
  };

  const getList = async () => {
    const res = await roomAdminService.roomAdminServiceRoomInfraFind({});
    const catalogs = new Set<string>([]);
    const infra: { [key: string]: RoomInfra[] } = {};
    res.data?.forEach((item) => {
      catalogs.add(item.catalog!);
      if (!infra[item.catalog!]) {
        infra[item.catalog!] = [item];
      } else {
        console.log(infra);
        infra[item.catalog!].push(item);
      }
    });
    setCatalogs(Array.from(catalogs));
    setInfra(infra);
    if (catalogs.size === 0) {
      setActiveKey(undefined);
      return;
    }
    if (!activeKey) {
      setActiveKey(Array.from(catalogs)[0]);
      return;
    }
    if (activeKey && !catalogs.has(activeKey)) {
      setActiveKey(Array.from(catalogs)[0]);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <RoomInfraForm
        open={formOpen}
        onCancel={() => setFormOpen(false)}
        initialValues={initialValues}
        onAddSuccess={() => {
          setFormOpen(false);
          getList();
        }}
        catalogs={catalogs.map((item) => ({ value: item }))}
      />
      <ProTable<RoomInfra>
        dataSource={activeKey ? infra[activeKey] : []}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="id"
        search={false}
        pagination={false}
        headerTitle="特色服务"
        toolbar={{
          title: '房源列表',
          multipleLine: true,
          tabs: {
            activeKey: activeKey,
            onChange: (key) => {
              setActiveKey(key as any);
              actionRef.current?.reloadAndRest?.();
            },
            items: catalogs.map((item) => ({
              key: item,
              label: item,
              children: null,
            })),
          },
        }}
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
