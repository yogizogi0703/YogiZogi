import { IReservationInfo } from '../../api/reservationList';
import { termFilterList } from './constants';

export type TermFilterTypes = (typeof termFilterList)[number];

export interface IReservationInfoCard {
  data: IReservationInfo;
}
