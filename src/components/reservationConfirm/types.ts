import { IReservationInfo } from '../../api/reservationList';
import { ModalTextList, termFilterList } from './constants';

export type TermFilterTypes = (typeof termFilterList)[number];

export interface IReservationInfoCard {
  data: IReservationInfo;
}

export type ModalTextTypes = (typeof ModalTextList)[number];

export interface IRateFactor {
  id: string;
  text: string;
}
