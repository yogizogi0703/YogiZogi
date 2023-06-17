import React, { useEffect, useState } from 'react';
import HomeMarker from './HomeMarker';
import ConvenienceMarker from './ConvenienceMarker';
import TourMarker from './TourMarker';
import StationMarker from './StationMarker';

const Marker = ({ type, title }: { type: string; title?: string }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleShowInfo = (flag: boolean) => {
    setIsShow(flag);
  };

  return (
    <>
      <div
        onClick={() => handleShowInfo(!isShow)}
        onMouseMove={() => handleShowInfo(true)}
        onMouseLeave={() => handleShowInfo(false)}
      >
        {type === 'home' && <HomeMarker />}
        {type === 'CS2' && <ConvenienceMarker />}
        {type === 'AT4' && <TourMarker />}
        {type === 'SW8' && <StationMarker />}
      </div>
      {isShow && title && (
        <div className="absolute bottom-full p-2 font-semibold bg-white rounded-lg bg-opacity-100 shadow-md">
          {title}
        </div>
      )}
    </>
  );
};

export default Marker;
