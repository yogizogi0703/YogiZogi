import { useEffect, useState } from 'react';
import FacilityDetailMarker from './FacilityDetailMarker';
import { PositionProps } from 'api/map';
import { useNavigate } from 'react-router-dom';

interface FacilityMarkerProps {
  info: {
    id: number;
    price: number;
    position: PositionProps;
  };
  isActive: boolean;
  handleOnClickMove: (arg1: PositionProps, arg2: number) => void;
}

const FacilityMarker = ({
  info,
  isActive,
  handleOnClickMove
}: FacilityMarkerProps) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState<boolean>(isActive);
  const formatPrice = info.price.toLocaleString('kr');

  const handleMarkerClick = () => {
    handleOnClickMove(info.position, info.id);
  };

  const handleDetailMove = (id: number) => {
    navigate(`/accommodationDetai/${id}`);
  };

  useEffect(() => {
    setIsShow(isActive);
  }, [isActive]);

  return (
    <>
      <div
        className="cursor-pointer px-4 py-1 rounded-lg bg-white text-center drop-shadow-md hover:scale-105"
        onClick={handleMarkerClick}
      >
        <span>₩{formatPrice}</span>
      </div>
      {isShow && (
        <FacilityDetailMarker
          info={{}}
          handleOnClick={() => handleDetailMove(1)}
        />
      )}
    </>
  );
};

export default FacilityMarker;
