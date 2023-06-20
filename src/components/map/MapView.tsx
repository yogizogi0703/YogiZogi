import { ISearchResultContent } from '../../api/search';
import DynamicMap from './DynamicMap';

interface MapViewProps {
  accommodationList: ISearchResultContent[] | undefined;
}

const MapView = ({ accommodationList }: MapViewProps) => {
  const positions = [
    {
      id: 1,
      accommodationName: '고급호텔',
      address: '강릉 주문진 1-23',
      rate: 5,
      price: 1000000,
      lat: 33.5554,
      lon: 126.79582,
      category: 1,
      pictureUrlList: [
        'https://www.p-city.com/mobilePub/static/images/hotelParadise/img_main_visual.jpg'
      ]
    },
    {
      id: 2,
      accommodationName: '고급호텔',
      address: '강릉 주문진 1-23',
      rate: 5,
      price: 800000,
      lat: 33.5558,
      lon: 126.78584,
      category: 1,
      pictureUrlList: [
        'https://www.p-city.com/mobilePub/static/images/hotelParadise/img_main_visual.jpg'
      ]
    }
  ];

  return <DynamicMap data={positions} />;
};

export default MapView;
