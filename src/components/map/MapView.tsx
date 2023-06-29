import { useEffect, useState } from 'react';
import DynamicMap from './DynamicMap';
import { ISearchResultContent } from '../../api/search';
import { useQuery } from 'react-query';
import { fetchMapAPI } from 'api/map';

interface MapViewProps {
  searchData: ISearchResultContent[];
}

const MapView = ({ searchData }: MapViewProps) => {
  const [mapData, setMapData] = useState(searchData);
  // const { data, isLoading } = useQuery(['/api/map'], () => fetchMapAPI());

  return <DynamicMap mapData={mapData} />;
};

export default MapView;
