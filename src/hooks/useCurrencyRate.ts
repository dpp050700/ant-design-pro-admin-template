import { RoomServiceApi } from '@/apifox/apis';
import { LanguageOptions } from '@/constants/index';
import { useCurrencyRateStore } from '@/stores/currencyRate';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';

export const currencyMap = {
  English: { tag: '$', pos: 'before', sig: 'USD' },
  Chinese: { tag: '元', pos: 'after', sig: 'CNY' },
  Japanese: { tag: '￥', pos: 'before', sig: 'JPY' },
};
const mockRate = {
  data: {
    CNY: 0.13909367,
    JPY: 0.0062116445,
    PHP: 0.016329596,
    THB: 0.026705984,
    USD: 1,
  },
};

const roomServiceApi = new RoomServiceApi();
const useCurrencyRate = () => {
  const { setCurrencyRate } = useCurrencyRateStore();
  const language = localStorage.getItem('language') || LanguageOptions[0].value;
  const targetSig = currencyMap[language as keyof typeof currencyMap].sig;
  useRequest(() => roomServiceApi.roomServiceGetForex(), {
    refreshDeps: [targetSig],
    ready: !!targetSig,
    onSuccess(data) {
      const rate = data?.data?.[targetSig];
      if (rate) {
        setCurrencyRate(rate);
      }
    },
  });
};

export default useCurrencyRate;
