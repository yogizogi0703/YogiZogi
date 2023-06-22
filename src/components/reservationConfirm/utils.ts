export const getYearAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 364);
  return date;
};

export const getHalfYearAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 182);
  return date;
};

export const getQuarterYearAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 91);
  return date;
};

export const getMonthAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 31);
  return date;
};
