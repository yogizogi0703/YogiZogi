import { fetchData } from '.';

interface ICancelReservationResponse {
  data: {
    status: string;
    msg: string;
  };
}

export const cancelReservation = async (userId: number, bookId: number) => {
  const url = `/user/${userId}/mybook/${bookId}`;

  const res = await fetchData.delete(url);

  return res as ICancelReservationResponse;
};
