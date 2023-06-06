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
        return `From ${selectedCheckInDate} to ${selectedCheckOutDate}`;
      });
    }
  }, [checkInDate, checkOutDate]);

  return (
    <section className="flex border rounded-md max-w-5xl mx-auto p-3">
      <div className="w-2/5">
        <p className="font-medium">Destination</p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="keyword 또는 시설명을 입력하세요"
            className="input w-4/5 h-auto max-w-xs p-0 focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <BiMap
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              GetGeoInfo(setGeoInfo);
              setSearchValue('현재 위치로 찾기');
            }}
          />
        </div>
      </div>
      <div className="w-1/3 relative">
        <div onClick={() => setCalendarState(!calendarState)}>
          <div className="flex gap-1 items-center font-medium cursor-pointer">
            <FcCalendar /> Date
          </div>
          <p className="text-sm cursor-pointer">
            {checkInDate && checkOutDate && !calendarState
              ? dateContent
              : 'Add Dates'}
          </p>
        </div>
        <div
          className={`flex gap-1 absolute left-1 p-3 rounded-lg bg-cyan-100 ${
            calendarState ? 'block' : 'hidden'
          }`}
        >
          <div>
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
          <div>
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
      <div className="w-1/6">
        <div className="flex items-center gap-1 w-auto font-medium">
          <BsPeople /> Guests
        </div>
        <p className="flex items-center gap-2 text-sm text-center">
          <button
            className="btn-square btn-secondary btn-xs rounded-lg ml-2"
            onClick={() => {
              if (people === 0) return;
              setPeople(people - 1);
            }}
          >
            -
          </button>
          {people}
          <button
            className="btn-square btn-secondary btn-xs rounded-lg"
            onClick={() => setPeople(people + 1)}
          >
            +
          </button>
        </p>
      </div>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md">
        <BsSearch />
        Search
      </button>
    </section>
  );
};
