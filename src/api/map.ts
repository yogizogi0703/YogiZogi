import { fetchData } from '../api';
import axios from 'axios';

export interface PositionProps {
  lat: number;
  lng: number;
}

export interface LocalPlaceProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: number;
  id: number;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: number;
  y: number;
}

export interface MapSearchProps {
  checkInDate: string;
  checkOutDate: string;
  leftUpLat: number;
  leftUpLon: number;
  rightDownLat: number;
  rightDownLon: number;
}

export const fetchLocalAPI = async (
  position: PositionProps,
  category: string
) => {
  const res = await axios({
    url: 'https://dapi.kakao.com/v2/local/search/category.json',
    method: 'get',
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`
    },
    params: {
      x: position.lng,
      y: position.lat,
      radius: 500,
      category_group_code: category
    }
  }).catch((e) => console.log(e));

  return res;
};

export const fetchMapAPI = async (data: MapSearchProps) => {
  const res = await fetchData.post('/accommodation/amp', data);
  return res?.data;
};
