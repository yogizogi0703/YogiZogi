import DynamicMap from './DynamicMap';
import { ISearchResultContent } from '../../api/search';

interface MapViewProps {
  searchData: ISearchResultContent[];
  param: {
    people: number;
    checkindate: string;
    checkoutdate: string;
  };
}

const MapView = ({ searchData, param }: MapViewProps) => {
  return <DynamicMap searchData={searchData} param={param} />;
};

export default MapView;
