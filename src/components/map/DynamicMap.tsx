import { useCallback, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import FacilityMarker from './marker/FacilityMarker';
import { PositionProps } from 'api/map';
import { ISearchResultContent } from '../../api/search';

interface DynamicMapProps {
  data: ISearchResultContent[];
}

const DynamicMap = ({ data }: DynamicMapProps) => {
  const [center, setCenter] = useState<PositionProps>({
    lat: 33.5563,
    lng: 126.79581
  });
  const [isMapLoad, setIsMapLoad] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<number>(0);

  const handleOnClickMove = (position: PositionProps, id: number) => {
    setCenter(position);
    setActiveMarker(activeMarker === id ? 0 : id);
  };

  const handleCloseInfo = () => {
    setActiveMarker(0);
  };

  const mapBounds = useCallback(() => {
    const bounds = new kakao.maps.LatLngBounds();
    data.forEach((item) => {
      bounds.extend(new kakao.maps.LatLng(item.lat, item.lon));
    });
    return bounds;
  }, [data]);

  return (
    <div
      className="mx-auto max-w-5xl"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        isPanto={true}
        onCreate={(map) => {
          if (!isMapLoad) {
            const bounds = mapBounds();
            setTimeout(() => {
              map.setBounds(bounds);
            }, 10);
            setIsMapLoad(true);
          }
        }}
        onClick={handleCloseInfo}
      >
        {data.map((item) => (
          <CustomOverlayMap
            position={{ lat: item.lat, lng: item.lon }}
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
