export const formatPrice = (num: number) =>
  new Intl.NumberFormat('ko-KR', { maximumSignificantDigits: 3 }).format(num);
