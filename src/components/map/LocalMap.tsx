import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { LocalPlaceProps, PositionProps } from '../../api/map';
import Marker from './marker/Marker';

interface LocalMapProps {
  position: PositionProps;
  type: 'mini' | 'full';
  localData: LocalPlaceProps[];
}

const LocalMap = ({ position, type, localData }: LocalMapProps) => {
  return (
    <div className="mx-auto max-w-5xl w-full h-full">
      <Map
        center={position}
        level={3}
        isPanto={true}
        style={{ width: '100%', height: '100%' }}
        disableDoubleClickZoom={type === 'mini' || false}
        draggable={type === 'full' || false}
      >
        <CustomOverlayMap position={position}>
          <Marker type={'home'} />
        </CustomOverlayMap>
        {type === 'full' &&
          localData.map((item) => (
            <CustomOverlayMap
              key={item.id}
              position={{ lat: item.y, lng: item.x }}
            >
              <Marker type={item.category_group_code} title={item.place_name} />
            </CustomOverlayMap>
          ))}
      </Map>
    </div>
  );
};

export default LocalMap;
