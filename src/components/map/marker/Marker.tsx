import HomeMarker from './HomeMarker';
import ConvenienceMarker from './ConvenienceMarker';
import TourMarker from './TourMarker';
import StationMarker from './StationMarker';
import { LocalPlaceProps, PositionProps } from '../../../api/map';

interface MarkerProps {
  type: string;
  info?: LocalPlaceProps;
  isActive?: boolean;
  handleOnClickMove?: (arg1: PositionProps, arg2: number) => void;
}

const Marker = ({ type, info, isActive, handleOnClickMove }: MarkerProps) => {
  const handleMarkerClick = () => {
    if (info && handleOnClickMove) {
      handleOnClickMove({ lat: info?.y, lng: info?.x }, info?.id);
    }
  };

  const handleOpenPlaceWindow = () => {
    window.open(info?.place_url, '_blank')!.focus();
  };

  return (
    <>
      <div onClick={handleMarkerClick}>
        {type === 'home' && <HomeMarker />}
        {type === 'CS2' && <ConvenienceMarker />}
        {type === 'AT4' && <TourMarker />}
        {type === 'SW8' && <StationMarker />}
      </div>
      {isActive && info && (
        <div
          className="cursor-pointer absolute bottom-full p-2 font-semibold bg-white rounded-lg bg-opacity-100 shadow-md"
          onClick={handleOpenPlaceWindow}
        >
          {info.place_name}
        </div>
      )}
    </>
  );
};

export default Marker;
