import { PositionProps } from 'api/map';
import { useLocalMap } from '../../hooks/useLocalMap';
import LocalMap from './LocalMap';

const MapModal = ({ position }: { position: PositionProps }) => {
  const { localData } = useLocalMap(position);

  return (
    <div
      className="max-w-5xl"
      style={{
        width: 'calc(100vw - 80px)',
        height: 'calc(100vh - 500px)',
        minHeight: '360px'
      }}
    >
      <LocalMap position={position} type="full" localData={localData} />
    </div>
  );
};

export default MapModal;
