import React from 'react';
import { Room, RoomPolicies, RoomPolicy } from '@/apifox/models';
import {
  Badge,
  Button,
  Calendar,
  CalendarProps,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  message,
  Modal,
  ModalProps,
  Popover,
  Radio,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import style from './index.module.scss';
import { useRequest } from 'ahooks';
import { RoomAdminServiceApi, RoomServiceApi } from '@/apifox/apis';
import { sum, multiply, round } from 'mathjs';
import Currency from '@/components/Currency';
interface RoomCalendarModalProps extends ModalProps {
  room?: Room;
  onRefreshList?: () => void;
}

interface CustomizeDateProps {
  // disabled: boolean;
  // price: null | number;
  onSave: (data: { price: number | null; isDisabled: boolean }) => Promise<any>;
  onDelete: (id?: string | null) => Promise<any>;
  roomPolicy?: RoomPolicy;
}

const CustomizeDate = ({ onSave, onDelete, roomPolicy }: CustomizeDateProps) => {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(
    roomPolicy ? !!roomPolicy?.disabled : false,
  );
  const [currentPrice, setCurrentPrice] = useState<null | number>(
    roomPolicy?.price ? Number(roomPolicy?.price) : null,
  );

  useEffect(() => {
    if (roomPolicy) {
      setCurrentPrice(roomPolicy.price ? Number(roomPolicy.price) : null);
      setIsDisabled(!!roomPolicy.disabled);
    }
  }, [roomPolicy]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onSaveHandler = async () => {
    setOpen(false);
    await onSave({ price: currentPrice, isDisabled });
  };

  const onSetDefault = async () => {
    setOpen(false);
    await onDelete(roomPolicy?.id);
  };

  const popoverContent = () => {
    return (
      <div>
        <div className="pl-[12px]">
          <Form>
            <Form.Item label="当前档期" className="!mb-[5px]">
              <Radio.Group value={isDisabled} onChange={(e) => setIsDisabled(e.target.value)}>
                <Radio value={false}> 开放 </Radio>
                <Radio value={true}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="当前价格">
              <InputNumber
                precision={0}
                addonAfter="/晚"
                prefix="$"
                controls={false}
                value={currentPrice}
                onChange={(value) => setCurrentPrice(value)}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="flex justify-end gap-x-[10px]">
          <Button type="primary" size="small" onClick={onSaveHandler}>
            保存
          </Button>
          <Button size="small" onClick={onSetDefault}>
            删除自定义
          </Button>
        </div>
      </div>
    );
  };

  // // 无档期
  if (roomPolicy && roomPolicy.disabled) {
    return (
      <div className="flex justify-end items-center gap-x-[5px]">
        <Badge color="red" text="无档期" />
        <Popover
          title="自定义"
          open={open}
          onOpenChange={handleOpenChange}
          trigger="click"
          content={popoverContent()}
        >
          <Button className="!p-0 !m-0" type="link">
            编辑
          </Button>
        </Popover>
      </div>
    );
  }

  // 设置了有档期和自定义价格
  if (roomPolicy && roomPolicy.price && !roomPolicy.disabled) {
    return (
      <div className="flex justify-end items-center gap-x-[5px]">
        <Badge color="green" text={`$${round(roomPolicy.price, 0)}`} />
        <Popover
          title="自定义"
          open={open}
          onOpenChange={handleOpenChange}
          trigger="click"
          content={popoverContent()}
        >
          <Button className="!p-0 !m-0" type="link">
            编辑
          </Button>
        </Popover>
      </div>
    );
  }

  // 未设置价格或档期
  return (
    <Popover title="自定义" trigger="click" content={popoverContent()}>
      <div className="flex justify-end ">
        <Button type="link" className="!m-0 !p-0">
          自定义
        </Button>
      </div>
    </Popover>
  );
};

interface TitleProps {
  price: number | null;
  title: string;
  weekendPrice: number | null | undefined;
  minStayDays?: number | null | undefined;
  onSave: (price: number, weekendPrice: null | number, minStayDays: number | null) => void;
  // roomId: string;
}
const Title = ({
  price,
  weekendPrice: _weekendPrice,
  minStayDays: _minStayDays,
  title,
  onSave,
}: // roomId,
TitleProps) => {
  const [basePrice, setBasePrice] = useState<number | null>(price);
  const [weekendPrice, setWeekendPrice] = useState<number | null>(_weekendPrice ?? null);
  const [minStayDays, setMinStayDays] = useState<number | null>(_minStayDays ?? null);

  useEffect(() => {
    setBasePrice(price);
  }, [price]);

  useEffect(() => {
    setWeekendPrice(_weekendPrice ?? null);
  }, [_weekendPrice]);

  useEffect(() => {
    setMinStayDays(_minStayDays ?? null);
  }, [_minStayDays]);

  const onSaveHandler = () => {
    if (!basePrice) return;
    onSave(basePrice!, weekendPrice, minStayDays);
  };

  return (
    <div>
      <div className="mb-[10px]">{title}</div>
      <div>
        <Form layout="inline">
          <Form.Item label="基础价格">
            <InputNumber
              addonAfter="/晚"
              prefix="$"
              controls={false}
              value={basePrice}
              onChange={(value) => setBasePrice(value)}
              precision={0}
            />
            <Currency value={basePrice} className="pt-[10px]" />
          </Form.Item>
          <Form.Item label="周末价格" className="!ml-[30px]">
            <InputNumber
              precision={0}
              addonAfter="/晚"
              prefix="$"
              controls={false}
              value={weekendPrice}
              onChange={(value) => setWeekendPrice(value)}
            />
            <Currency value={weekendPrice} className="pt-[10px]" />
          </Form.Item>
          <Form.Item label="最少入住天数" className="!ml-[30px]">
            <InputNumber
              precision={0}
              addonAfter="天"
              controls={false}
              value={minStayDays}
              onChange={(value) => setMinStayDays(value)}
            />
            <Currency value={weekendPrice} className="pt-[10px]" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSaveHandler}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const MultipleCustome = ({
  roomId,
  weekendPrice,
  basePrice = 0,
  onMultipleSave,
}: {
  roomId: string;
  weekendPrice?: number | null;
  basePrice?: number | null;
  onMultipleSave: (data: any[]) => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);
  const roomService = new RoomServiceApi();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [percent, setPercent] = useState<number | null>(null);
  const [multipleType, setMultipleType] = useState(2);
  const [multiplePrice, setMultiplePrice] = useState<number | null>(null);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const percentList = [
    { value: -30, label: '-30%' },
    { value: -20, label: '-20%' },
    { value: -10, label: '-10%' },
    { value: 10, label: '10%' },
    { value: 20, label: '20%' },
    { value: 30, label: '30%' },
  ];

  const onMultipleSaveHandler = async () => {
    if (!dateRange) {
      message.error('请选择日期范围');
      return;
    }
    if (multipleType === 1 && !percent) {
      message.error('请输入调整比例');
      return;
    }
    if (multipleType === 2 && !multiplePrice) {
      message.error('请输入房间价格');
      return;
    }
    const start = dayjs(dateRange[0]);
    const end = dayjs(dateRange[1]);
    const days = end.diff(start, 'day') + 1;
    const dateArray = [];
    const roomPoliciesMap: Record<string, string> = {};
    roomPoliciesMap['key'] = 'price';
    roomPolicies.forEach((item) => {
      const dateKey = `${item.year!}-${item.mouth!}-${item.day!}`;
      roomPoliciesMap[dateKey] = item.price!;
    });

    // 遍历 days 进行一下步骤
    // 1、判断当天是否有自定义价格，即 roomPolicies 是否有当天的数据
    // 2、若 roomPolicies 有当天数据， 则用这个自定义价格 和比例计算
    // 3、若 roomPolicies 没有当天数据，判断当天是否是周六、周日
    // 4、若为周末， 判断是否设置了周末价格，若设有周末价格则用周末价格计算
    // 5、 其余情况均使用基础价格计算新价格
    for (let i = 0; i < days; i++) {
      const date = start.add(i, 'day');
      const day = date?.get('date') + '';
      const mouth = (date?.get('month') as number) + 1 + '';
      const year = date?.get('year') + '';
      let originPrice: number = basePrice || 0;
      if (roomPoliciesMap[`${year}-${mouth}-${day}`]) {
        originPrice = Number(roomPoliciesMap[`${year}-${mouth}-${day}`]);
      } else if ((Number(day) === 0 || Number(day) === 6) && weekendPrice) {
        originPrice = weekendPrice;
      }

      dateArray.push({
        day: date?.get('date') + '',
        disabled: isDisabled,
        mouth: (date?.get('month') as number) + 1 + '',
        price:
          multipleType === 1
            ? round(sum(originPrice, multiply(originPrice, (percent || 0) / 100)), 0) + ''
            : `${multiplePrice}`,
        year: date?.get('year') + '',
      });
    }
    const resValue = await onMultipleSave(dateArray);
    if (resValue) {
      setOpen(false);
    }
  };

  const {
    runAsync: getBookableList,
    data: { policies: roomPolicies = [], orders: roomOrders = [] } = {
      policies: [],
      orders: [],
    },
  } = useRequest(
    () =>
      roomService.roomServiceFindBookable({
        roomId: roomId,
        startDate: new Date(dateRange![0]!.format('YYYY-MM-DD')),
        endDate: new Date(dateRange![1]!.format('YYYY-MM-DD')),
      }),
    { manual: true, ready: !!dateRange },
  );

  useEffect(() => {
    getBookableList();
  }, [roomId, dateRange]);

  useEffect(() => {
    if (!open) {
      setIsDisabled(false);
      setDateRange(null);
      setPercent(null);
    }
  }, [open]);

  const popoverContent = () => {
    return (
      <div>
        <div className="pl-[12px]">
          <Form>
            <Form.Item label="时间选择" className="!mb-[5px]">
              <DatePicker.RangePicker value={dateRange} onChange={(value) => setDateRange(value)} />
            </Form.Item>
            <Form.Item label="档期设置" className="!mb-[5px]">
              <Radio.Group value={isDisabled} onChange={(e) => setIsDisabled(e.target.value)}>
                <Radio value={false}> 开放 </Radio>
                <Radio value={true}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="价格设置">
              <div className="text-[#999] leading-[32px]">
                <Radio.Group
                  onChange={(e: any) => {
                    setMultipleType(e.target.value);
                  }}
                  value={multipleType}
                >
                  <Radio value={2}>按金额调整房源价格</Radio>
                  <Radio value={1}>按比例调整房源价格</Radio>
                </Radio.Group>
                {/* 按比例调整房源价格 */}
              </div>
              {multipleType === 1 ? (
                <div>
                  <div className="flex gap-x-2 flex-wrap mt-[5px] mb-[10px]">
                    {percentList.map((item) => (
                      <Button key={item.value} onClick={() => setPercent(item.value)}>
                        {item.label}
                      </Button>
                    ))}
                  </div>
                  <InputNumber
                    addonAfter="%"
                    controls={false}
                    value={percent}
                    onChange={(value) => setPercent(value)}
                  />
                </div>
              ) : (
                <InputNumber
                  addonAfter="$"
                  controls={false}
                  value={multiplePrice}
                  onChange={(value) => setMultiplePrice(value)}
                />
              )}
            </Form.Item>
          </Form>
        </div>
        <div className="flex justify-end gap-x-[10px]">
          <Button type="primary" size="small" onClick={onMultipleSaveHandler}>
            保存
          </Button>
          <Button size="small" onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Popover
      title={<div className="ml-[12px]">批量自定义</div>}
      trigger="click"
      content={popoverContent()}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="inline-flex h-[32px] items-center">
        <Button type="link" className="!m-0 !p-0">
          批量自定义
        </Button>
      </div>
    </Popover>
  );
};

const RoomCalendarModal = (props: RoomCalendarModalProps) => {
  const roomService = new RoomServiceApi();
  const roomAdminService = new RoomAdminServiceApi();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const { room, onRefreshList, ...restProps } = props;
  const [basePrice, setBasePrice] = useState<number | null>(Number(room?.price));
  const [weekendPrice, setWeekendPrice] = useState<number | null>();

  const [minStayDays, setMinStayDays] = useState<number | null>();

  useEffect(() => {
    setBasePrice(Number(room?.price));
    setWeekendPrice(room?.detail?.saturdayPrice ? room?.detail?.saturdayPrice : null);
    setMinStayDays(room?.detail?.minStayDays);
  }, [room]);

  const getBookableDate = async () => {
    if (!room?.id) return { policies: [], orders: [] };
    return await roomService.roomServiceGetBookableDate({
      roomId: room.id,
      year: selectedDate?.get('year') + '',
      mouth: [
        `${(selectedDate?.get('month') as number) + 0}`,
        `${(selectedDate?.get('month') as number) + 1}`,
        `${(selectedDate?.get('month') as number) + 2}`,
      ],
    });
  };

  const { data: bookableDate, runAsync: runBookableDate } = useRequest(() => getBookableDate(), {
    refreshDeps: [room?.id],
  });

  const { runAsync: deleteDatePrice } = useRequest(
    (roomId: string) => roomAdminService.roomAdminServiceRoomDeleteDatePrice({ id: roomId }),
    {
      manual: true,
    },
  );

  const { runAsync: updateDatePrice } = useRequest(
    (roomId: string, policies) =>
      roomAdminService.roomAdminServiceRoomUpdateDatePrice({
        roomId: roomId,
        body: { policies },
      }),
    {
      manual: true,
    },
  );

  const { runAsync: roomUpdatePrice } = useRequest(
    (roomId: string, roomPrice: number, weekendPrice: number, minStayDays: number | null) =>
      roomAdminService.roomAdminServiceUpdatePrice({
        roomId: roomId,
        body: {
          roomPrice: roomPrice,
          weekendPrice: weekendPrice,
          minStayDays: minStayDays,
        },
      }),
    { manual: true },
  );

  if (!room) return null;

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const onSaveHandler = async ({ isDisabled, price }: any) => {
    const policies = [
      {
        day: selectedDate?.get('date') + '',
        disabled: isDisabled,
        mouth: (selectedDate?.get('month') as number) + 1 + '',
        price: price ? price + '' : price,
        year: selectedDate?.get('year') + '',
      },
    ];
    try {
      await updateDatePrice(room.id, policies);
      await runBookableDate();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(error);
    }
  };

  const onMultipleSave = async (policies: any[]) => {
    try {
      await updateDatePrice(room.id, policies);
      await runBookableDate();
      message.success('自定义成功');
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(error);
    }
  };

  const onDeleteHandler = async (id: any) => {
    try {
      await deleteDatePrice(id);
      await runBookableDate();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onUpdateRoomPrice = async (price: any, weekendPrice: any, minStayDays: any) => {
    await roomUpdatePrice(room.id, price, weekendPrice, minStayDays);
    setBasePrice(price);
    setWeekendPrice(weekendPrice);
    onRefreshList?.();
  };

  const onPanelChangeHandler = (date: Dayjs, mode: string) => {
    setTimeout(() => {
      runBookableDate();
    }, 500);
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    const day = current.get('day');

    const findDate = (dates: any[] = []) => {
      return dates.find((item) => {
        return (
          `${current.get('year')}` === item.year &&
          `${current.get('month') + 1}` === item.mouth &&
          `${current.get('date')}` === item.day
        );
      });
    };

    const roomPolicy = findDate(bookableDate?.policies);

    const topPrice = (day === 0 || day === 6) && weekendPrice ? weekendPrice : basePrice;

    const isOrder = findDate(bookableDate?.orders);

    if (isOrder) {
      return (
        <div className="flex justify-end">
          <Badge color="red" text="已预定" />
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-end">
          {
            // 如果当前无档期或价格自定义了，这里要显示灰色
            roomPolicy?.disabled || roomPolicy?.price ? (
              <Badge
                color="#999"
                text={<span className="text-[#999] line-through">{`$${topPrice}`}</span>}
              />
            ) : (
              <Badge color="green" text={`$${topPrice}`} />
            )
          }
        </div>
        {current.isSame(selectedDate, 'day') || roomPolicy ? (
          <CustomizeDate
            // disabled
            // price={null}
            onSave={onSaveHandler}
            onDelete={onDeleteHandler}
            roomPolicy={roomPolicy}
          />
        ) : null}
      </div>
    );
  };
  return (
    <Modal
      open
      {...restProps}
      title={
        <Title
          minStayDays={minStayDays}
          price={basePrice}
          weekendPrice={weekendPrice}
          title={room.title}
          onSave={onUpdateRoomPrice}
        />
      }
      footer={null}
    >
      <>
        <Divider />
        <div className="relative">
          <div className="absolute top-[12px]">
            <MultipleCustome
              roomId={room.id}
              weekendPrice={weekendPrice}
              basePrice={basePrice}
              onMultipleSave={onMultipleSave}
            />
          </div>
          <Calendar
            className={style['calendar']}
            cellRender={cellRender}
            mode="month"
            onChange={handleDateChange}
            onPanelChange={onPanelChangeHandler}
          />
        </div>
      </>
    </Modal>
  );
};

export default RoomCalendarModal;
