import { termFilterList } from './constants';

export type TermFilterTypes = (typeof termFilterList)[number];

export interface IReservationInfoCard {
  data: {
    accommodationId: number;
    bookName: string;
    picUrl: string;
    accommodationName: string;
    startDate: string;
    endDate: string;
    price: number;
    rate: number;
    reviewRegistered: boolean;
  };
}
