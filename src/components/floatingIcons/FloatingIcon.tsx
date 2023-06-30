import { MdOutlineBedroomParent } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import { useState } from 'react';
import { ComparisonBox } from './comparison/ComparisonBox';
import { useRecoilValue } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { RoomComparisonBox } from './comparison/RoomComparisonBox';

export const FloatingIcon = () => {
  const selectedAcc = useRecoilValue(selectedAccommodation);
  const [roomComparisonState, setRoomComparisonState] = useState(false);
  const [comparisonState, setComparisonState] = useState(false);

  return (
    <div className="fixed bottom-[5%] flex flex-col gap-1 md:gap-5 right-1 sm:right-5 md:right-10 z-20">
      <div className="indicator">
        <button
          onClick={() => {
            setRoomComparisonState(!roomComparisonState);
          }}
          className="btn btn-warning md:w-16 md:h-16 rounded-[50%]"
        >
          <MdOutlineBedroomParent className="md:w-6 md:h-6" />
        </button>
      </div>
      <RoomComparisonBox display={roomComparisonState} />
      <div className="indicator">
        <span className="indicator-item badge bg-red-500 text-white w-4 h-4 md:w-6 md:h-6 right-3 top-3 text-[10px] md:text-base border-none">
          {selectedAcc.length}
        </span>
        <button
          onClick={() => {
            setComparisonState(!comparisonState);
          }}
          className="btn btn-info md:w-16 md:h-16 rounded-[50%]"
        >
          <BsBuilding className="md:w-6 md:h-6" />
        </button>
      </div>
      <ComparisonBox display={comparisonState} />
    </div>
  );
};
