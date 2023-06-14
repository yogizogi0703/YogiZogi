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

const KAKAO_REST_KEY = 'bf715237136ba5b4f1da9b658e2ed3ab';

export const fetchLocalAPI = async (
  position: PositionProps,
  category: string
) => {
  const res = await axios({
    url: 'https://dapi.kakao.com/v2/local/search/category.json',
    method: 'get',
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_KEY}`
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
