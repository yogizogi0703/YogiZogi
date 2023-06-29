import {
  IAccommodationDetailResponse,
  IReview,
  IReviewResponse
} from '../../api/accommodationDetail';
import RatingStars from '../../components/common/RatingStars';

interface IReviewSection {
  reviewRes: IReviewResponse;
  reviewArr: IReview[];
  accommodationData: IAccommodationDetailResponse;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export const ReviewSection = ({
  reviewRes,
  reviewArr,
  accommodationData,
  page,
  setPage
}: IReviewSection) => {
  const rateAdj = [
    'Terrible',
    'Poor',
    'Bad',
    'Okay',
    'Good',
    'Fine',
    'Very good',
    'Excellent',
    'Outstanding',
    'Perfect'
  ];

  return (
    <>
      <h2 className="text-lg md:text-2xl font-semibold mb-4">리뷰</h2>
      {reviewRes.content.length > 0 && reviewArr.length > 0 ? (
        <>
          <div>
            <div className="flex items-center text-xl md:text-3xl text-center">
              <div className="my-5 w-1/3 p-2">
                <span className="font-semibold text-red-500">
                  {accommodationData && accommodationData.rate}
                </span>{' '}
                / 10 점
              </div>
              <div className="divider divider-horizontal mx-1" />
              <div className="w-2/3 text-center">
                <p className="mb-3 font-semibold">
                  {accommodationData &&
                    rateAdj[Math.trunc(accommodationData.rate) - 1]}
                </p>
                <p className="text-xs md:text-lg">
                  총 {reviewRes.totalElements}개의 확인된 리뷰가 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div>
            {Object.values(reviewArr[page - 1]).map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-3 p-3 border rounded-lg mb-5 text-xs md:text-base"
                >
                  <p className="font-semibold">{el.userId}</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs md:text-base font-medium">
                    <div className="flex items-center gap-2 font-semibold">
                      평점 : <RatingStars rate={el.rating} />
                    </div>
                  </div>
                  <p> {el.description}</p>
                </div>
              );
            })}
            <div className="flex justify-center">
              {reviewRes &&
                new Array(reviewRes.totalPages + 1).fill(0).map((_, idx) => {
                  return (
                    <div key={idx} className="join">
                      <input
                        aria-label={idx.toString()}
                        className="join-item btn btn-square btn-ghost btn-sm mr-1 checked:bg-red-500 checked:text-white border-none important"
                        type="radio"
                        name="options"
                        checked={page === idx}
                        onChange={() => setPage(idx)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <div className="p-3 border rounded-lg mb-5">
          <div className="text-center">등록된 리뷰가 없습니다.</div>
        </div>
      )}
    </>
  );
};
