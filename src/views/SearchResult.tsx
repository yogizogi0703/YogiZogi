import React, { useState } from 'react';
import AccommodationPreview from '../components/searchResult/AccommodationPreview';
import Range from '../components/searchResult/Range';

const MIN_PRICE = 1;
const MAX_PRICE = 30;
const RANGE_WIDTH = 248;
const STEPS = 30;

const data = {
  categoryId: 1,
  accomodationId: 2,
  name: '그랜드 인터컨티넨탈 서울 파르나스',
  rate: 4.5,
  accommodationImage: 'http://via.placeholder.com/640x480',
  address: '대한민국 서울특별시 강남구 테헤란로 521',
  price: 120000,
  lat: 37.508535,
  lon: 127.047883
};

const View = {
  LIST: false,
  MAP: true
} as const;

const categoryList = ['hotel', 'motel', 'pension', 'all'] as const;

const sortingFactorList = ['rate', 'highPrice', 'lowPrice', 'distance'];

type CategoryTypes = (typeof categoryList)[number];

type SortingFactorTypes = (typeof sortingFactorList)[number];

const categories = [
  {
    id: 'hotel',
    text: '호텔'
  },
  {
    id: 'motel',
    text: '모텔'
  },
  {
    id: 'pension',
    text: '펜션'
  }
];

const sortingFactors = [
  {
    id: 'rate',
    text: '평점순'
  },
  {
    id: 'highPrice',
    text: '높은 가격순'
  },
  {
    id: 'lowPrice',
    text: '낮은 가격순'
  },
  {
    id: 'distance',
    text: '거리순'
  }
];

const SearchResult = () => {
  const [viewType, setViewType] = useState<boolean>(View.LIST);

  const [selectedCategory, setSelctedCategory] = useState<CategoryTypes>('all');

  const [selectedSortingFactor, setSelectedSortingFactor] =
    useState<SortingFactorTypes>('rate');

  const [minRangeValue, setMinRangeValue] = useState(MIN_PRICE);
  const [maxRangeValue, setMaxRangeValue] = useState(MAX_PRICE);

  const handleViewToggle = () => {
    setViewType((viewType) => !viewType);
  };

  const handleRangeValueChange = (min: number, max: number) => {
    console.log('hi');
    console.log(min, max);
    for (const value of [min, max]) {
      if (value < MIN_PRICE || value > MAX_PRICE || isNaN(value)) return;
    }
    console.log('hello');

    setMinRangeValue(min);
    setMaxRangeValue(max);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id as CategoryTypes;

    if (categoryList.includes(value)) {
      setSelctedCategory(value);
    }
  };

  const handleSelectSortingFactor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.id as SortingFactorTypes;

    if (sortingFactorList.includes(value)) {
      setSelectedSortingFactor(value);
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8 bg-white"
      style={{ minWidth: '375px' }}
    >
      <section className="lg:flex lg:items-center lg:justify-between">
        <section className="flex gap-2">
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <input
                  type="radio"
                  name="category"
                  id={category.id}
                  className="hidden peer"
                  onChange={handleSelectCategory}
                  checked={category.id === selectedCategory}
                />
                <label
                  htmlFor={category.id}
                  className="btn btn-ghost bg-white drop-shadow peer-checked:text-red-500 peer-checked:border-red-500"
                >
                  {category.text}
                </label>
              </div>
            );
          })}
        </section>
        <div className="hidden lg:block h-12 w-0.5 bg-gray-200"></div>
        <section className="md:flex md:justify-between lg:justify-end lg:gap-4 items-center mt-2 md:mb-0 lg:mt-0 max-w-3xl">
          <section className="flex flex-wrap md:flex-nowrap gap-2 items-center mt-7 mb-7 md:mt-0 md:mb-0">
            {sortingFactors.map((factor) => {
              return (
                <div key={factor.id}>
                  <input
                    type="radio"
                    name="sortBy"
                    id={factor.id}
                    className="hidden peer"
                    onChange={handleSelectSortingFactor}
                    checked={factor.id === selectedSortingFactor}
                  />
                  <label
                    htmlFor={factor.id}
                    className="btn btn-ghost bg-white drop-shadow btn-sm h-10 lg:w-28 w-[104px] peer-checked:text-emerald-500 peer-checked:border-emerald-500"
                  >
                    {factor.text}
                  </label>
                </div>
              );
            })}
          </section>
          <section style={{ width: `${248}px` }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">가격 범위</p>
                <p className="text-xs font-bold text-red-500">{`${minRangeValue}만원 ~ ${maxRangeValue}만원`}</p>
              </div>
              <button className="text-xs btn btn-ghost bg-white drop-shadow btn-sm min-h-full h-6">
                적용
              </button>
            </div>
            <Range
              width={RANGE_WIDTH}
              steps={STEPS}
              onRangeValueChange={handleRangeValueChange}
            />
            <div className="text-xs font-bold text-gray-400 flex justify-between">
              <p>{`${MIN_PRICE}만원`}</p>
              <p>{`${MAX_PRICE}만원`}</p>
            </div>
          </section>
        </section>
      </section>
      <section className="mt-10">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">42개의 검색 결과</h3>
          <button
            className="btn btn-ghost bg-white drop-shadow text-xs px-8 h-10 min-h-full"
            onClick={handleViewToggle}
          >
            {!viewType ? '지도로 보기' : '목록으로 보기'}
          </button>
        </div>
        <hr className="mt-2 mb-8" />
        {viewType ? (
          <div className="text-center">"여기에서 지도로 보기"</div>
        ) : (
          <div className="grid lg:grid-cols-3 auto-rows-fr gap-4 md:grid-cols-2">
            <AccommodationPreview data={data} />
            <AccommodationPreview data={data} />
            <AccommodationPreview data={data} />
            <AccommodationPreview data={data} />
            <AccommodationPreview data={data} />
            <AccommodationPreview data={data} />
          </div>
        )}
      </section>
    </div>
  );
};
export default SearchResult;
