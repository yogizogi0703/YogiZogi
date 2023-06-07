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

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [dateContent, setDateContent] = useState('');
  const [calendarState, setCalendarState] = useState(false);
  const [userGeoInfo, setGeoInfo] = useState([37.57, 126.9]);
  const [people, setPeople] = useState(0);

  // 사용자가 check-in/check-out date를 선택하면, date를 형식(yyyy-mm-dd)에 맞게 변경
  useEffect(() => {
    if (checkOutDate) {
      setDateContent(() => {
        const selectedCheckInDate = getFormatedDate(checkInDate);
        const selectedCheckOutDate = getFormatedDate(checkOutDate);
        return `${selectedCheckInDate} ~ ${selectedCheckOutDate}`;
      });
    }
  }, [checkInDate, checkOutDate]);

  return (
    <section className="flex w-fit flex-col items-center lg:w-[1000px] md:flex-row border rounded-md max-w-5xl mx-auto p-3 shadow-md">
      <div className="flex gap-2 max-w-full md:block md:w-1/2">
        <p className="font-medium w-12">Destination</p>
        <div className="flex gap-1 md:flex items-center">
          <input
            type="text"
            placeholder="keyword 또는 시설명을 입력하세요"
            className="input h-auto max-w-xs p-0 text-sm focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === 'Find My Location') {
                setSearchValue('');
              }
            }}
          />
          <BiMap
            className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
            onClick={() => {
              GetGeoInfo(setGeoInfo);
              setSearchValue('Find My Location');
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/6 relative">
        <div
          className="flex items-center gap-2 md:block"
          onClick={() => setCalendarState(!calendarState)}
        >
          <div className="flex gap-1 items-center font-medium cursor-pointer">
            <FcCalendar /> Date
          </div>
          <p className="flex text-sm cursor-pointer w-28">
            {checkInDate && checkOutDate && !calendarState
              ? dateContent
              : 'Add Dates'}
          </p>
        </div>
        <div
          className={`flex gap-1 absolute left-14 md:top-14 p-3 rounded-lg bg-slate-300 ${
            calendarState ? 'block' : 'hidden'
          }`}
        >
          <div className="font-semibold">
            Check In
            <DatePicker
              locale={ko}
              inline
              minDate={new Date()}
              selected={checkInDate}
              closeOnScroll={true}
              onChange={(date: Date) => {
                if (checkOutDate) setCheckOutDate(null);
                setCheckInDate(date);
              }}
            />
          </div>
          <div className="font-semibold">
            Check Out
            <DatePicker
              locale={ko}
              inline
              minDate={new Date(checkInDate.getTime() + 86400000)}
              selected={checkOutDate}
              closeOnScroll={true}
              onChange={(date: Date) => {
                if (!checkInDate || checkInDate.getTime() >= date.getTime())
                  return;
                setCheckOutDate(date);
                setCalendarState(!calendarState);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full md:block md:w-1/6">
        <div className="flex items-center gap-1 w-auto font-medium">
          <BsPeople /> Guests
        </div>
        <p className="flex items-center gap-2 text-sm text-center">
          <button
            className="btn btn-square btn-xs rounded-lg"
            onClick={() => {
              if (people === 0) return;
              setPeople(people - 1);
            }}
            disabled={people === 0}
          >
            -
          </button>
          {people}
          <button
            className="btn btn-square btn-xs rounded-lg"
            onClick={() => {
              setPeople(people + 1);
            }}
            disabled={people > 100}
          >
            +
          </button>
        </p>
      </div>
      <button className="btn btn-sm mt-5 text-xs md:w-1/6 md:ml-3 md:btn-md md:mt-0">
        <BsSearch />
        Search
      </button>
    </section>
  );
};
