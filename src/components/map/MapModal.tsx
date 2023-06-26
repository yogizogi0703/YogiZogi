import { PositionProps } from 'api/map';
import { useLocalMap } from '../../hooks/useLocalMap';
import LocalMap from './LocalMap';

const MapModal = ({ position }: { position: PositionProps }) => {
  const { localData } = useLocalMap(position);

  return (
    <div className="w-[calc(100vw-80px)] max-w-5xl h-[500px] max-sm:h-80">
      <LocalMap position={position} type="full" localData={localData} />
    </div>
  );
};

export default MapModal;
