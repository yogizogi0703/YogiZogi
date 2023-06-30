interface IFacility {
  facility: string;
}

interface IComparison {
  accommodationName: string;
  accommodationId: number;
  address: string;
  roomName: string;
  rate: number;
  price: number;
  priceArr: number[];
  imgUrl: string;
  facility: string | IFacility;
}

const comparisonInitData = {
  accommodationName: '',
  accommodationId: 0,
  address: '',
  roomName: '',
  rate: 0,
  price: 0,
  priceArr: [],
  imgUrl: '',
  facility: ''
};
