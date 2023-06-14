import KakaoMapScriptLoader from './KakaoMapScriptLoader';
import LocalMap from './LocalMap';

const LocalMapView = () => {
  const position = {
    lat: 33.5554,
    lng: 126.79582
  };

  return (
    <KakaoMapScriptLoader>
      <LocalMap position={position} type="mini" />
    </KakaoMapScriptLoader>
  );
};

export default LocalMapView;
