import { BiMap } from 'react-icons/bi';
import { FcCalendar } from 'react-icons/fc';
import { BsPeople } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { GetGeoInfo } from '../../utils/getGeoInfo';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userGeoInfo, setGeoInfo] = useState([37.57, 126.9]);

  return (
    <section className="flex border rounded-md w-2/3 mx-auto p-3">
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
        <div>
          <div className="flex gap-1 items-center font-medium cursor-pointer">
            <FcCalendar /> Date
          </div>
          <p className="text-sm cursor-pointer">Add Dates</p>
        </div>
      </div>
      <div className="w-1/6">
        <div className="flex items-center gap-1 w-auto font-medium">
          <BsPeople /> Guests
        </div>
        <p className="flex items-center gap-1 text-sm text-center">
          <button className="btn-square btn-secondary btn-xs rounded-lg ml-2">
            -
          </button>
          0
          <button className="btn-square btn-secondary btn-xs rounded-lg">
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
