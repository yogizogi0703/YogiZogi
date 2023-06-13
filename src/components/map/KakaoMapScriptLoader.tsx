import { useEffect, useState } from 'react';

const KAKAO_API_KEY = '4d8797181781ff2fa698697b867a3d58';
const KAKAO_MAP_SCRIPT_ID = 'kakaoMapScript';

interface KakaoMapScriptLoaderProps {
  children: React.ReactNode;
}

const KakaoMapScriptLoader = ({ children }: KakaoMapScriptLoaderProps) => {
  const [isSetMapScript, setIsMapScript] = useState<boolean>(false);

  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

    if (mapScript && !window.kakao) return;

    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=clusterer`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapScript(true);
      });
    };

    script.onerror = () => {
      setIsMapScript(false);
    };
    document.getElementById('root')?.appendChild(script);
  }, []);

  if (!isSetMapScript) {
    return <></>;
  }

  return <>{children}</>;
};

export default KakaoMapScriptLoader;
