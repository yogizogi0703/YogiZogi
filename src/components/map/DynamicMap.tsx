import { useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import FacilityMarker from './marker/FacilityMarker';
import { ISearchResultContent } from 'api/search';
import useDynamicMap from '../../hooks/useDynamicMap';

interface DynamicMapProps {
  mapData: ISearchResultContent[];
}

const DynamicMap = ({ mapData }: DynamicMapProps) => {
  const [isMapLoad, setIsMapLoad] = useState<boolean>(false);
  const {
    center,
    handleCloseInfo,
    mapBounds,
    activeMarker,
    handleOnClickMove
  } = useDynamicMap(mapData);

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
        onCreate={(map) => {
          if (!isMapLoad) {
            const bounds = mapBounds();
            setTimeout(() => {
              map.setBounds(bounds);
            }, 10);
            setIsMapLoad(true);
          }
        }}
      >
        {mapData.map((item) => (
          <CustomOverlayMap
            position={{
              lat: item.lat,
              lng: item.lon
            }}
            clickable={true}
            key={item.id}
          >
            <FacilityMarker
              info={item}
              isActive={activeMarker === item.id}
              handleOnClickMove={handleOnClickMove}
            />
          </CustomOverlayMap>
        ))}
      </Map>
    </div>
  );
};

export default DynamicMap;
