export const addCommasToPrice = (value: number) =>
  new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0
  }).format(value);
