import { useRecoilState } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../helpers';
import RatingStars from '../../components/common/RatingStars';
import { Link } from 'react-router-dom';

interface IComparisonModal {
  modalState: boolean;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComparisonModal = ({
  modalState,
  handleModal
}: IComparisonModal) => {
  const [selectedAcc, setSelectedAcc] = useRecoilState(selectedAccommodation);
  const criteria = ['숙소명', '평점', '가격', '위치', '편의시설'];

  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
  );

  const {
    checkindate: checkInDate,
    checkoutdate: checkOutDate,
    people: people
  } = Object.fromEntries(urlParams.entries());

  return (
    <>
      <input
        type="checkbox"
        id="alertModal"
        className="modal-toggle"
        checked={modalState}
        onChange={() => handleModal(!modalState)}
      />
      <div className="modal">
        <div className="modal-box">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-center">
              한 눈에 비교하기
            </h2>
            <div className="flex">
              <div className="flex flex-col gap-y-2 text-center font-semibold">
                <p className="w-1/5 h-32"></p>
                {criteria.map((el, idx) => {
                  return (
                    <p
                      key={idx}
                      className={`px-1 ${idx % 2 === 0 ? 'bg-gray-300' : ''}`}
                    >
                      {el}
                    </p>
                  );
                })}
              </div>
              {selectedAcc.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-y-2 text-center w-2/5"
                  >
                    <figure className="h-32 object-cover mx-1">
                      <img
                        src={el.pictureUrlList[0]}
                        className="w-full h-full rounded-lg"
                      />
                    </figure>
                    <div
                      className="tooltip tooltip-bottom z-30 cursor-pointer"
                      data-tip="상세페이지 바로가기"
                    >
                      <Link
                        to={`/accommodation/${el.id}?&checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}&rate=${el.rate}`}
                      >
                        <p className="truncate block bg-gray-300 font-semibold">
                          {el.accommodationName}
                        </p>
                      </Link>
                    </div>
                    <p className="flex items-center justify-center h-6">
                      <RatingStars rate={el.rate} />
                    </p>
                    <p className="bg-gray-300">
                      {addCommasToPrice(el.price)}원
                    </p>
                    <p>{el.address}</p>
                    <p className="bg-gray-300">편의시설</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => handleModal(false)}
            >
              닫기
            </label>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="alertModal"
          onClick={() => handleModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};
