export interface IPrice {
  date: string;
  id: number;
  price: number;
  roomCnt: number;
}

export interface IRoomResponse {
  id: number;
  roomName: string;
  checkInTime: number;
  checkOutTime: number;
  defaultPeople: number;
  maxPeople: number;
  pictureUrlList: string[];
  price: IPrice[]
}

export interface IAccommodationDetailResponse {
  accommodationName: string;
  address: string;
  category: number;
  id: number;
  info: string;
  lat: number;
  lon: number;
  location: string;
  pictureUrlList: string[];
  room: IRoomResponse[];
}

export const AccommodationDetailInitData = {
  accommodationName: '',
  address: '',
  category: 0,
  id: 0,
  info: '',
  lat: 0,
  lon: 0,
  location: '',
  pictureUrlList: [''],
  room: [
    {
      id: 0,
      roomName: '',
      checkInTime: 0,
      checkOutTime: 0,
      defaultPeople: 0,
      maxPeople: 0,
      pictureUrlList: [''],
      price: [
        {
          date: '',
          id: 0,
          price: 0,
          roomCnt: 0
        }
      ]
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