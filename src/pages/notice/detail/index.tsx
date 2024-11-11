import React, { useEffect, useRef, useState } from 'react';
import NoticeItem from './noticeItem';
import { ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { RollerAnnouncement, RoomAdminServiceApi, RoomServiceApi } from '@/apifox/index';
import { Button, Empty, Space, message } from 'antd';

const fillList = (rollerAnnouncements: RollerAnnouncement[] = []) => {
  let list: RollerAnnouncement[] = [];
  if (rollerAnnouncements.length < 5) {
    list = new Array(5 - rollerAnnouncements.length).fill(null).map((item) => ({
      desc: '',
      id: null,
    }));
  }
  return [...rollerAnnouncements, ...list];
};

const NoticeDetail = () => {
  const [notice, setNotice] = useState<RollerAnnouncement[]>([]);
  const noticeRef = useRef<any[]>([]);
  const roomAdminService = new RoomAdminServiceApi();
  const roomService = new RoomServiceApi();
  const { runAsync: getRollerAnnouncement } = useRequest(
    () => roomService.roomServiceRollerAnnouncementFind(),
    {
      manual: true,
      onSuccess({ rollerAnnouncements = [] }) {
        noticeRef.current = [];
        setNotice(fillList(rollerAnnouncements));
      },
    },
  );
  const { runAsync: saveRollerAnnouncement } = useRequest(
    (list) =>
      roomAdminService.roomAdminServiceRollerAnnouncementSave({
        body: { rollerAnnouncements: list },
      }),
    { manual: true },
  );
  const { runAsync: deleteRollerAnnouncement } = useRequest(
    (id) => roomAdminService.roomAdminServiceRollerAnnouncementDelete({ id }),
    { manual: true },
  );

  const onSave = async () => {
    const list = noticeRef.current.map((item) => {
      return item.getNoticeItemValue();
    });
    await saveRollerAnnouncement(list);
    noticeRef.current = [];
    await getRollerAnnouncement();
    message.success('保存成功');
  };

  const onDelete = async (index: number) => {
    noticeRef.current = [];
    const item = notice[index];
    if (item.id) {
      await deleteRollerAnnouncement(item.id);
      await getRollerAnnouncement();
    } else {
      notice.splice(index, 1);
      setNotice([...notice]);
    }
  };

  const onAdd = () => {
    setNotice([
      ...notice,
      {
        desc: '',
        id: null,
      },
    ]);
  };

  useEffect(() => {
    getRollerAnnouncement();
  }, []);

  return (
    <div className="relative w-full h-full">
      <Space direction="vertical" size="middle" className="!flex">
        {notice.map((item, index) => {
          return (
            <ProCard
              key={index}
              title={`公告 ${index + 1}`}
              extra={<Button onClick={() => onDelete(index)}>删除</Button>}
            >
              <NoticeItem
                initialValues={item}
                ref={(ref) => {
                  if (ref) {
                    noticeRef.current[index] = ref;
                  }
                }}
              />
            </ProCard>
          );
        })}
        <div>
          <Button type="primary" onClick={onSave}>
            保存
          </Button>
          <Button type="primary" onClick={onAdd} className="ml-[12px]">
            添加
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default NoticeDetail;
