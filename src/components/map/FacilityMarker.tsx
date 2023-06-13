import React, { useState } from 'react';
import FacilityDetailMarker from './FacilityDetailMarker';

interface FacilityMarkerProps {
  price: number;
}

const FacilityMarker = ({ info }: { info: FacilityMarkerProps }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const formatPrice = info.price.toLocaleString('kr');

  return (
    <>
      <div
        className="cursor-pointer px-4 py-1 rounded-lg bg-white text-center drop-shadow-md transition-all hover:scale-105"
        onClick={() => setIsShow(!isShow)}
      >
        <span>₩{formatPrice}</span>
      </div>
      {isShow && <FacilityDetailMarker />}
    </>
  );
};

export default FacilityMarker;
