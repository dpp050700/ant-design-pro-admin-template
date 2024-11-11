import { LanguageOptions } from '@/constants/index';
import { useCurrencyRateStore } from '@/stores/currencyRate';
import { currencyMap } from '../hooks/useCurrencyRate';
import { divide, multiply, round } from 'mathjs';
import React, { memo, useState } from 'react';
type IProps = {
  value: number | string | null;
  className?: string;
};
const Currency = ({ value, className }: IProps) => {
  const language = localStorage.getItem('language') || LanguageOptions[0].value;
  const { currencyRate } = useCurrencyRateStore();

  const targetCurrency = currencyMap[language as keyof typeof currencyMap];

  if (!language || language === 'English' || currencyRate === 1 || !value) return null;
  return (
    <span className={`flex items-center text-[14px] leading-none text-[#000] ${className}`}>
      (≈{targetCurrency.pos === 'before' ? targetCurrency.tag : ''}
      {String(round(divide(Number(value), currencyRate))).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {targetCurrency.pos === 'after' ? targetCurrency.tag : ''})
    </span>
  );
};

export default memo(Currency);
