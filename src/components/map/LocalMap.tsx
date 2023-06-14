import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { PositionProps } from '../../api/map';
import { useLocalMap } from '../../hooks/useLocalMap';
import { useEffect } from 'react';
import Marker from './marker/Marker';

interface LocalMapProps {
  position: PositionProps;
  type: 'mini' | 'full';
}

const LocalMap = ({ position, type }: LocalMapProps) => {
  const { localData } = useLocalMap(position);

  console.log(type);

  useEffect(() => {
    console.log(localData);
  }, [localData]);

  return (
    <div
      className="mx-auto max-w-5xl"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <Map center={position} style={{ width: '100%', height: '100%' }}>
        <CustomOverlayMap position={position}>
          <Marker type={'home'} />
        </CustomOverlayMap>
        {type === 'full' &&
          localData.map((item) => (
            <CustomOverlayMap
              key={item.id}
              position={{ lat: item.y, lng: item.x }}
            >
              <Marker type={item.category_group_code} />
            </CustomOverlayMap>
          ))}
      </Map>
    </div>
  );
};

export default LocalMap;
