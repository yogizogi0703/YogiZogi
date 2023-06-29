import DynamicMap from './DynamicMap';
import { ISearchResultContent } from '../../api/search';

interface MapViewProps {
  searchData: ISearchResultContent[];
}

const MapView = ({ searchData }: MapViewProps) => {
  return <DynamicMap searchData={searchData} />;
};

export default MapView;
