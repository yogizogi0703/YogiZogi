import React from 'react';
import HomeMarker from './HomeMarker';
import ConvenienceMarker from './ConvenienceMarker';
import TourMarker from './TourMarker';
import StationMarker from './StationMarker';

const Marker = ({ type }: { type: string }) => {
  return (
    <>
      {type === 'home' && <HomeMarker />}
      {type === 'CS2' && <ConvenienceMarker />}
      {type === 'AT4' && <TourMarker />}
      {type === 'SW8' && <StationMarker />}
    </>
  );
};

export default Marker;
