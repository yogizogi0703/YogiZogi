import { useCallback, useRef, useState } from 'react';
import { ISearchResultContent } from '../api/search';
import { MapSearchProps, PositionProps, fetchMapAPI } from '../api/map';

const initialize = {
  lat: 37.557295350602715,
  lng: 126.97312061611817
};

const useDynamicMap = (searchData: ISearchResultContent[]) => {
  const [center, setCenter] = useState<PositionProps>(initialize);
  const [mapData, setMapData] = useState(searchData);
  const [activeMarker, setActiveMarker] = useState<number>(0);
  const mapBoundRef = useRef<MapSearchProps>({
    checkInDate: '',
    checkOutDate: '',
    leftUpLat: 0,
    leftUpLon: 0,
    rightDownLat: 0,
    rightDownLon: 0
  });

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

  const setMapBounds = (map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    mapBoundRef.current = {
      checkInDate: '2023-07-01',
      checkOutDate: '2023-07-02',
      leftUpLat: bounds.getNorthEast().getLat(),
      leftUpLon: bounds.getSouthWest().getLng(),
      rightDownLat: bounds.getSouthWest().getLat(),
      rightDownLon: bounds.getNorthEast().getLng()
    };
  };

  const mapBounds = useCallback(() => {
    const bounds = new kakao.maps.LatLngBounds();
    mapData.forEach((item) => {
      bounds.extend(new kakao.maps.LatLng(item.lat, item.lon));
    });
    return bounds;
  }, [mapData]);

  const searchMapData = async () => {
    const res = await fetchMapAPI(mapBoundRef.current);
    if (res) {
      setMapData(res.data);
    }
  };

  return {
    mapData,
    center,
    activeMarker,
    mapBounds,
    handleCloseInfo,
    setMapBounds,
    handleOnClickMove,
    searchMapData
  };
};

export default useDynamicMap;
