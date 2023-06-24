import { fetchData } from '.';

export interface IRegisterReviewRequestBody {
  accommodationId: number;
  rating: number;
  description: string;
  email: string;
}

interface IRegisterReviewResponse {
  data: {
    status: string;
    msg: string;
  };
}

export const registerReview = async (data: IRegisterReviewRequestBody) => {
  const url = `/accommodation/${data.accommodationId}/review`;

  const res = await fetchData.post<IRegisterReviewRequestBody>(url, data);

  return res as IRegisterReviewResponse;
};
