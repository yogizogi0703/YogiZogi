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
  pictureUrlList: IPicUrlList[];
  price: number;
}

export interface IAccommodationDetailResponse {
  id: number;
  accommodationName: string;
  category: number;
  rate: number;
  address: string;
  region: string;
  picUrlList: IPicUrlList[];
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
  rooms: [
    {
      id: 0,
      roomName: '',
      checkInTime: 0,
      checkOutTime: 0,
      defaultPeople: 0,
      maxPeople: 0,
      pictureUrlList: [{ id: 0, url: '' }],
      price: 0
    }
  ]
};

export interface IReview {
  accommodationId: number;
  description: string;
  id: number;
  rating: number;
  userId: number;
}

export interface IReviewResponse {
  content: IReview[];
  totalElement: number;
  totalPages: number;
}