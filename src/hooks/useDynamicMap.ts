import { useCallback, useState } from 'react';
import { ISearchResultContent } from '../api/search';
import { PositionProps } from '../api/map';

const useDynamicMap = (mapData: ISearchResultContent[]) => {
  const [center, setCenter] = useState<PositionProps>({
    lat: 37.557295350602715,
    lng: 126.97312061611817
  });
  const [activeMarker, setActiveMarker] = useState<number>(0);

  const handleOnClickMove = useCallback(
    (position: PositionProps, id: number) => {
      setCenter(position);
      setActiveMarker(activeMarker === id ? 0 : id);
    },
    []
  );

  const handleCloseInfo = useCallback(() => {
    setActiveMarker(0);
  }, []);

  const mapBounds = useCallback(() => {
    const bounds = new kakao.maps.LatLngBounds();
    mapData.forEach((item) => {
      bounds.extend(new kakao.maps.LatLng(item.lat, item.lon));
    });
    return bounds;
  }, [mapData]);

  return {
    center,
    activeMarker,
    mapBounds,
    handleCloseInfo,
    handleOnClickMove
  };
};

export default useDynamicMap;
