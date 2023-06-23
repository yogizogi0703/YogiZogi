import {
  getHalfYearAgo,
  getMonthAgo,
  getQuarterYearAgo,
  getYearAgo
} from './utils';

export const Term = {
  YEAR: 'year',
  HALFYEAR: 'halfYear',
  QUARTERYEAR: 'quarterYear',
  MONTH: 'month',
  SPECIFIED: 'specified'
} as const;

export const termFilterList = [
  Term.YEAR,
  Term.HALFYEAR,
  Term.QUARTERYEAR,
  Term.MONTH,
  Term.SPECIFIED
] as const;

export const termFilters = [
  {
    value: Term.YEAR,
    text: '최근 1년',
    startDate: getYearAgo(new Date())
  },
  {
    value: Term.HALFYEAR,
    text: '최근 6개월',
    startDate: getHalfYearAgo()
  },
  {
    value: Term.QUARTERYEAR,
    text: '최근 3개월',
    startDate: getQuarterYearAgo()
  },
  {
    value: Term.MONTH,
    text: '최근 1개월',
    startDate: getMonthAgo()
  }
];

export const DEFAULT_START_DATE = getYearAgo(new Date());
export const DEFAULT_END_DATE = new Date();

export const RESERVATION_LIST_PAGE_SIZE = 20;
