import React from 'react';
import KakaoMapScriptLoader from './KakaoMapScriptLoader';
import DynamicMap from './DynamicMap';

const MapView = () => {
  return (
    <KakaoMapScriptLoader>
      <DynamicMap />
    </KakaoMapScriptLoader>
  );
};

export default MapView;
