import { BiMap } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { BsPeople } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { GetGeoInfo } from '../../utils/getGeoInfo';
import { getFormatedDate } from '../../utils/getFormatedDate';

export interface SearchProps {
  searchValue: string;
  checkInDate: Date;
  checkOutDate: Date;
  people: number;
  userGeoInfo: number[];
}

export const SearchBar = () => {
  const [search, setSearch] = useState<SearchProps>({
    searchValue: '',
    checkInDate: new Date(),
    checkOutDate: new Date(),
    people: 0,
    userGeoInfo: [37.57, 126.9]
  });

  const [dateContent, setDateContent] = useState('');
  const [calendarState, setCalendarState] = useState(false);

  // 사용자가 check-in/check-out date를 선택하면, date를 형식(yyyy-mm-dd)에 맞게 변경
  useEffect(() => {
    if (
      search.checkOutDate.toString().slice(0, 15) !==
      new Date().toString().slice(0, 15)
    ) {
      setDateContent(() => {
        const selectedCheckInDate = getFormatedDate(search.checkInDate);
        const selectedCheckOutDate = getFormatedDate(search.checkOutDate);
        return `${selectedCheckInDate} ~ ${selectedCheckOutDate}`;
      });
    }
  }, [search.checkInDate, search.checkOutDate]);

  const handleSearchState = (property: PropertyKey, value: any) => {
    setSearch((prev) => {
      return { ...prev, [property]: value };
    });
  };

  return (
    <section className="flex min-w-[300px] w-fit flex-col items-center lg:w-[1000px] md:flex-row border rounded-md max-w-5xl mx-auto p-3 shadow-md bg-white">
      <div className="flex gap-2 max-w-full md:block md:w-1/2">
        <p className="font-medium text-xs md:text-base min-w-fit">목적지</p>
        <div className="flex gap-1 md:flex items-center">
          <input
            type="text"
            placeholder="키워드 또는 시설명을 입력하세요"
            className="input w-11/12 md:w-auto h-auto p-0 text-xs md:text-base focus:outline-none"
            value={search.searchValue}
            onChange={(e) => {
              const newKeyword = e.target.value;
              handleSearchState('searchValue', newKeyword);
            }}
            onFocus={(e) => {
              if (e.target.value === '현재 위치에서 찾기') {
                handleSearchState('searchValue', '');
              }
            }}
          />
          <BiMap
            className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
            onClick={() => {
              GetGeoInfo(setSearch);
              handleSearchState('searchValue', '현재 위치에서 찾기');
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/6 relative">
        <div
          className="flex items-center gap-2 md:block"
          onClick={() => setCalendarState(!calendarState)}
        >
          <div className="flex gap-1 items-center font-medium text-xs md:text-base cursor-pointer">
            <FcCalendar /> 기간
          </div>
          <p className="flex text-xs md:text-base cursor-pointer w-28 text-slate-500">
            {dateContent !== '' && !calendarState
              ? dateContent
              : '날짜 선택하기'}
          </p>
        </div>
        <div
          className={`flex gap-1 absolute flex-col lg:flex-row md:left-0 md:top-14 p-3 rounded-lg bg-slate-300 ${
            calendarState ? 'block' : 'hidden'
          }`}
        >
          <div className="font-medium text-xs md:text-base">
            체크인
            <DatePicker
              locale={ko}
              inline
              minDate={new Date()}
              selected={search.checkInDate}
              closeOnScroll={true}
              onChange={(date: Date) => {
                if (search.checkOutDate)
                  handleSearchState('checkOutDate', new Date());
                handleSearchState('checkInDate', date);
              }}
            />
          </div>
          <div className="font-medium text-xs md:text-base">
            체크아웃
            <DatePicker
              locale={ko}
              inline
              minDate={new Date(search.checkInDate.getTime() + 86400000)}
              selected={search.checkOutDate}
              closeOnScroll={true}
              onChange={(date: Date) => {
                if (
                  !search.checkInDate ||
                  search.checkInDate.getTime() >= date.getTime()
                )
                  return;
                handleSearchState('checkOutDate', date);
                setCalendarState(!calendarState);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full md:ml-4 md:block md:w-1/6">
        <div className="flex items-center gap-1 w-auto font-medium text-xs md:text-base">
          <BsPeople /> 인원
        </div>
        <p className="flex items-center gap-2 text-xs text-center">
          <button
            className="btn btn-square w-4 h-4 min-h-[1rem] md:btn-xs rounded-lg"
            onClick={() => {
              if (search.people === 0) return;
              const peopleNum = search.people - 1;
              handleSearchState('people', peopleNum);
            }}
            disabled={search.people === 0}
          >
            -
          </button>
          {search.people}
          <button
            className="btn btn-square w-4 h-4 min-h-[1rem] min-h-4 md:btn-xs rounded-lg"
            onClick={() => {
              const peopleNum = search.people + 1;
              handleSearchState('people', peopleNum);
            }}
            disabled={search.people > 100}
          >
            +
          </button>
        </p>
      </div>
      <button className="btn btn-sm mt-5 text-xs md:w-1/6 md:ml-3 md:btn-md md:mt-0">
        <BsSearch />
        검색
      </button>
    </section>
  );
};
