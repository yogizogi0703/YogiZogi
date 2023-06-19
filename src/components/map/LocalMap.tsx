import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { LocalPlaceProps, PositionProps } from '../../api/map';
import Marker from './marker/Marker';
import { useState } from 'react';

interface LocalMapProps {
  position: PositionProps;
  type: 'mini' | 'full';
  localData: LocalPlaceProps[];
}

const LocalMap = ({ position, type, localData }: LocalMapProps) => {
  const [center, setCenter] = useState<PositionProps>(position);
  const [activeMarker, setActiveMarker] = useState<number>(0);

  const handleOnClickMove = (position: PositionProps, id: number) => {
    setCenter(position);
    setActiveMarker(activeMarker === id ? 0 : id);
  };

  const handleCloseInfo = () => {
    setActiveMarker(0);
  };

  return (
    <div className="mx-auto max-w-5xl w-full h-full">
      <Map
        center={center}
        level={3}
        isPanto={true}
        style={{ width: '100%', height: '100%' }}
        disableDoubleClickZoom={type === 'mini' || false}
        draggable={type === 'full' || false}
        onClick={handleCloseInfo}
      >
        <CustomOverlayMap position={position} zIndex={99}>
          <Marker type={'home'} />
        </CustomOverlayMap>
        {type === 'full' &&
          localData.map((item) => (
            <CustomOverlayMap
              key={item.id}
              position={{ lat: item.y, lng: item.x }}
              clickable={true}
            >
              <Marker
                type={item.category_group_code}
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

export default LocalMap;
