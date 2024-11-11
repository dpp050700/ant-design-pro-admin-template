import { createWithEqualityFn } from 'zustand/traditional';
interface BearState {
  currencyRate: number;
  setCurrencyRate: (val: number) => void;
}

export const useCurrencyRateStore = createWithEqualityFn<BearState>(
  (set) => ({
    currencyRate: 1,
    setCurrencyRate: (val) => set((state) => ({ currencyRate: val })),
  }),
  Object.is, // Specify the default equality function, which can be shallow
);
