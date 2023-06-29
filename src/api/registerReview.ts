import { fetchData } from '.';

export interface IRegisterReviewRequestBody {
  bookId: number;
  rate: number;
  description: string;
}

interface IRegisterReviewResponse {
  data: {
    status: string;
    msg: string;
  };
}

export const registerReview = async (
  accommodationId: number,
  data: IRegisterReviewRequestBody
) => {
  const url = `/accommodation/${accommodationId}/review`;

  const res = await fetchData.post<IRegisterReviewRequestBody>(url, data);

  return res as IRegisterReviewResponse;
};
