import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../store/atom/authAtom';

export interface ReservationAddProps {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  people: number;
  payAmount: number;
  bookName: string;
}

export const fetchReservation = async (
  accommodationId: number,
  data: ReservationAddProps
) => {
  const res = await axios({
    method: 'post',
    url: `/api/accommodation/${accommodationId}/book`,
    headers: {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': localStorage.getItem(AUTH_TOKEN_KEY)
    },
    data: data
  }).catch((e) => console.log(e));

  return res?.data;
};
