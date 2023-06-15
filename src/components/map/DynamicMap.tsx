import { useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import FacilityMarker from './marker/FacilityMarker';
import { PositionProps } from 'api/map';

const DynamicMap = () => {
  const [center, setCenter] = useState<PositionProps>({
    lat: 33.5563,
    lng: 126.79581
  });
  const [activeMarker, setActiveMarker] = useState<number>(0);

  const handleOnClickMove = (position: PositionProps, id: number) => {
    setCenter(position);
    setActiveMarker(activeMarker === id ? 0 : id);
  };

  const handleCloseInfo = () => {
    setActiveMarker(0);
  };

  return (
    <div
      className="mx-auto max-w-5xl"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        isPanto={true}
        onClick={handleCloseInfo}
      >
        <CustomOverlayMap
          position={{
            lat: 33.5554,
            lng: 126.79582
          }}
          clickable={true}
        >
          <FacilityMarker
            info={{
              id: 1,
              price: 1000000,
              position: {
                lat: 33.5554,
                lng: 126.79582
              }
            }}
            isActive={activeMarker === 1}
            handleOnClickMove={handleOnClickMove}
          />
        </CustomOverlayMap>
        <CustomOverlayMap
          position={{
            lat: 33.5558,
            lng: 126.78584
          }}
          clickable={true}
        >
          <FacilityMarker
            info={{
              id: 2,
              price: 800000,
              position: {
                lat: 33.5558,
                lng: 126.78584
              }
            }}
            isActive={activeMarker === 2}
            handleOnClickMove={handleOnClickMove}
          />
        </CustomOverlayMap>
      </Map>
    </div>
  );
};

export default DynamicMap;
