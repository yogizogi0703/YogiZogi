export const MIN_PRICE = 1;
export const MAX_PRICE = 30;
export const RANGE_WIDTH = 248;
export const STEPS = 30;

export const SEARCH_START_PAGE = 0;

export const DEFAULT_LAT = '126.98';
export const DEFAULT_LON = '37.56';

export const View = {
  LIST: false,
  MAP: true
} as const;

// Sort

export const Sort = {
  RATE: 'rate',
  LOWPRICE: 'lowPrice',
  HIGHPRICE: 'highPrice',
  DISTANCE: 'distance'
} as const;

export const sortingFactorList = [
  Sort.RATE,
  Sort.HIGHPRICE,
  Sort.LOWPRICE,
  Sort.DISTANCE
];

export const sortingFactors = [
  {
    id: Sort.RATE,
    text: '평점순'
  },
  {
    id: Sort.HIGHPRICE,
    text: '높은 가격순'
  },
  {
    id: Sort.LOWPRICE,
    text: '낮은 가격순'
  },
  {
    id: Sort.DISTANCE,
    text: '거리순'
  }
];

// Direction
export const Direction = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

// Category

export const Category = {
  HOTEL: 1,
  MOTEL: 2,
  PENSION: 3,
  ALL: 0
} as const;

export const categoryList = [
  Category.HOTEL,
  Category.MOTEL,
  Category.PENSION,
  Category.ALL
];

export const categories = [
  {
    id: Category.HOTEL,
    text: '호텔'
  },
  {
    id: Category.MOTEL,
    text: '모텔'
  },
  {
    id: Category.PENSION,
    text: '펜션'
  }
];
