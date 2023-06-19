export interface IRoomResponse {
  id: number;
  roomName: '';
  checkInTime: number;
  checkOutTime: number;
  defaultPeople: number;
  maxPeople: number;
  pictureUrlList: string[];
  price: [
    {
      date: string;
      id: number;
      price: number;
      roomCnt: number;
    }
  ];
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
