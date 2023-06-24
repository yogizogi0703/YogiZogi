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
] as const;

export const DEFAULT_START_DATE = getYearAgo(new Date());
export const DEFAULT_END_DATE = new Date();

export const RESERVATION_LIST_PAGE_SIZE = 20;

export const ModalText = {
  CANCEL: '예약 취소',
  REVIEW: '리뷰 작성',
  COMPLETE: '리뷰 작성됨'
} as const;

export const ModalTextList = [
  ModalText.CANCEL,
  ModalText.COMPLETE,
  ModalText.REVIEW
] as const;

export const STARS = 10;
export const STAR_DOM = 'setting-star';
export const SELECTED = 'star-selected';
export const HOVER = 'star-hover';

export const RatingFactor = {
  SERVICE: 'service',
  PRICE: 'price',
  FACILITIES: 'facilities'
} as const;

export const ratingFactorsInfo = [
  {
    id: RatingFactor.SERVICE,
    text: '서비스'
  },
  {
    id: RatingFactor.PRICE,
    text: '가격'
  },
  {
    id: RatingFactor.FACILITIES,
    text: '시설'
  }
] as const;

export const initialRating = {
  service: 0,
  price: 0,
  facilities: 0
};

export const MAX_REVIEW_LENGTH = 200;
