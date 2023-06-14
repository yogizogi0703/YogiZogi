import React from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import FacilityMarker from './marker/FacilityMarker';

const DynamicMap = () => {
  return (
    <div
      className="mx-auto max-w-5xl"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CustomOverlayMap
          position={{
            lat: 33.5554,
            lng: 126.79582
          }}
        >
          <FacilityMarker info={{ price: 1000000 }} />
        </CustomOverlayMap>
        <CustomOverlayMap
          position={{
            lat: 33.5558,
            lng: 126.78584
          }}
          clickable={true}
        >
          <FacilityMarker info={{ price: 800000 }} />
        </CustomOverlayMap>
      </Map>
    </div>
  );
};

export default DynamicMap;
