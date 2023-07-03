export interface IPicUrlList {
  id: number;
  url: string;
}

export interface IRoomResponse {
  id: number;
  roomName: string;
  checkInTime: number;
  checkOutTime: number;
  defaultPeople: number;
  maxPeople: number;
  conveniences: string;
  pictureUrlList: IPicUrlList[];
  price: number;
}

export interface IFacility {
  facility: '';
}

export interface IAccommodationDetailResponse {
  id: number;
  accommodationName: string;
  category: number;
  rate: number;
  address: string;
  region: string;
  picUrlList: IPicUrlList[];
  convenienceList: {}[];
  info: string;
  lat: number;
  lon: number;
  rooms: IRoomResponse[];
}

export const AccommodationDetailInitData = {
  id: 0,
  accommodationName: '',
  category: 0,
  rate: 0,
  address: '',
  info: '',
  lat: 0,
  lon: 0,
  region: '',
  picUrlList: [{ id: 0, url: '' }],
  convenienceList: [{ facility: '' }],
  rooms: [
    {
      id: 0,
      roomName: '',
      checkInTime: 0,
      checkOutTime: 0,
      defaultPeople: 0,
      maxPeople: 0,
      conveniences: '',
      pictureUrlList: [{ id: 0, url: '' }],
      price: 0
    }
  ]
};

export interface IRoomData {
  accommodationName: string;
  accommodationId: number;
  address: string;
  rate: number;
  roomId: number;
  roomName: string;
  roomImg: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  people: string;
}

export interface IReview {
  id: number;
  nickName: string;
  accommodationId: number;
  rating: number;
  description: string;
}

export interface IReviewResponse {
  content: IReview[];
  totalElements: number;
  totalPages: number;
}

export const IReviewResponseContentInitData = {
  id: 0,
  nickName: '',
  accommodationId: 0,
  rating: 10,
  description: ''
};
