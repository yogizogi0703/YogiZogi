import { useEffect, useState } from 'react';
import FacilityDetailMarker from './FacilityDetailMarker';
import { PositionProps } from 'api/map';
import { useNavigate } from 'react-router-dom';
import { ISearchResultContent } from '../../../api/search';

interface FacilityMarkerProps {
  info: ISearchResultContent;
  isActive: boolean;
  handleOnClickMove: (arg1: PositionProps, arg2: number) => void;
  handleOnClick: () => void;
}

const FacilityMarker = ({
  info,
  isActive,
  handleOnClickMove,
  handleOnClick
}: FacilityMarkerProps) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState<boolean>(isActive);
  const { id, price, lat, lon } = info;
  const formatPrice = price.toLocaleString('kr');

  const handleMarkerClick = () => {
    handleOnClickMove({ lat, lng: lon }, id);
  };

  useEffect(() => {
    setIsShow(isActive);
  }, [isActive]);

  return (
    <>
      <div
        className="cursor-pointer px-4 py-1 rounded-lg bg-white text-center drop-shadow-md hover:scale-105 transition-all"
        onClick={handleMarkerClick}
      >
        <span>₩{formatPrice}</span>
      </div>
      {isShow && (
        <FacilityDetailMarker info={info} handleOnClick={handleOnClick} />
      )}
    </>
  );
};

export default FacilityMarker;
