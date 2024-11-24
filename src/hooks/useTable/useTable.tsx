import {
  ActionType,
  ParamsType,
  ProTableProps,
  ProColumns,
  ListToolBarProps,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { useRef, useState } from 'react';

type ListToolBarTabs = NonNullable<ListToolBarProps['tabs']>;

interface UseTableProps<T, P, D> {
  requestSetting: {
    request: (data?: P) => Promise<T>;
    dataIndex?: keyof T;
    totalIndex?: keyof T;
    pageSizeIndex?: keyof P;
    currentIndex?: keyof P;
  };
  columns: ProColumns<D>[];
  tabs?: ListToolBarTabs['items'] | ListToolBarTabs;
}
const useTable = <T, D, P extends ParamsType = ParamsType>(props: UseTableProps<T, P, D>) => {
  const defaultPageSize = 10;

  const tableRef = useRef<ActionType>();

  const [activeTab, setActiveKey] = useState<string>(
    props.tabs
      ? (Array.isArray(props.tabs) ? props.tabs[0].key : props.tabs?.items?.[0].key) || ''
      : '',
  );

  const {
    request,
    dataIndex = 'list' as keyof T,
    totalIndex = 'total' as keyof T,
    pageSizeIndex = 'pageLimit' as keyof P,
    currentIndex = 'pageOffset' as keyof P,
  } = props.requestSetting;

  const _tabs = props.tabs;

  let tabs: ListToolBarTabs | undefined;

  if (Array.isArray(_tabs)) {
    tabs = {
      items: _tabs as ListToolBarTabs['items'],
      activeKey: activeTab,
      onChange(key) {
        setActiveKey(key);
        tableRef.current?.reloadAndRest?.();
      },
    };
  } else if (_tabs) {
    tabs = _tabs;
  }

  const { runAsync } = useRequest((data) => request(data), {
    manual: true,
  });

  const tableRequest: ProTableProps<D, P, 'text'>['request'] = async (
    params: ParamsType & { pageSize?: number; current?: number },
  ) => {
    const { pageSize, current, ...rest } = params;
    const data = {
      [pageSizeIndex]: pageSize!,
      [currentIndex]: current!,
      ...rest,
    } as unknown as P;
    const res = await runAsync(data);
    return {
      data: (res[dataIndex] || []) as D[],
      total: (res[totalIndex] || 0) as number,
      success: true,
    };
  };
  return {
    tableRef,
    tableRequest,
    pageSize: defaultPageSize,
    columns: props.columns,
    tabs,
  };
};

export default useTable;
