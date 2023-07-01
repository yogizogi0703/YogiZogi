import { fetchData } from '../api';

export interface ReservationAddProps {
  accommodationId: number;
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
  const res = await fetchData.post(
    `/accommodation/${accommodationId}/book`,
    data
  );

  return res?.data;
};
