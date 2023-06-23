import { fetchData } from '.';

export interface IReservationInfo {
  id: number;
  accommodationId: number;
  bookName: string;
  picUrl: string;
  accommodationName: string;
  startDate: string;
  endDate: string;
  price: number;
  rate: number;
  reviewRegistered: boolean;
}

interface IReservationListResponse {
  data: {
    content: IReservationInfo[];
  };
}

export const getReservationList = async (userId: number) => {
  const RESERVATION_LIST_URL = `/user/${userId}/mybook`;

  const res = await fetchData.get<IReservationListResponse>(
    RESERVATION_LIST_URL
  );

  if (!res || !res.data) {
    return [];
  }

  const sorted = Array.from(res.data.content).sort((c1, c2) => {
    const start1 = new Date(c1.startDate).getTime();
    const start2 = new Date(c2.startDate).getTime();

    if (start1 === start2) {
      const end1 = new Date(c1.endDate).getTime();
      const end2 = new Date(c2.endDate).getTime();
      return end2 - end1;
    }
    return start2 - start1;
  });

  return sorted;
};
