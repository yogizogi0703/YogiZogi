import { useNavigate } from 'react-router-dom';
import { IReservationInfoCard } from './types';
import { getTodayString, getTomorrowString } from '../../utils/handleDate';
import { addCommasToPrice } from '../../helpers';
import ModalTriggerButton from './ModalTriggerButton';
import { ModalText } from './constants';

const ReservationInfoCard = ({ data }: IReservationInfoCard) => {
  const {
    id,
    accommodationId,
    bookName,
    picUrl,
    accommodationName,
    checkInDate,
    checkOutDate,
    price,
    rate,
    reviewRegistered
  } = data;

  const navigate = useNavigate();

  const handleNavigateButtonClick = () => {
    navigate(
      `/accommodation/${accommodationId}?checkindate=${getTodayString()}&checkoutdate=${getTomorrowString()}&people=${1}&rate=${rate}`
    );
  };

  return (
    <div className="bg-white shadow-md w-full h-64 md:h-52 rounded flex">
      <div
        className={`h-full w-2/5 bg-cover bg-center rounded-l`}
        style={{ backgroundImage: `url('${picUrl}')` }}
      ></div>
      <div className="py-4 px-6 w-full flex flex-col justify-between">
        <p className="font-bold">
          {accommodationName || '숙소 정보가 잘못되었습니다.'}
        </p>
        <div className="w-full h-px bg-gray-200 my-2"></div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">예약자명:&nbsp;</span>
            <span>{bookName}</span>
          </p>
          <p>
            <span className="font-bold">예약일자:&nbsp;</span>
            <span>{`${checkInDate} ~ ${checkOutDate}`}</span>
          </p>
          <p>
            <span className="font-bold">결제금액:&nbsp;</span>
            <span>{`${addCommasToPrice(price || 0)}원`}</span>
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="btn bg-teal-500 hover:bg-teal-600 text-white text-xs p-0 min-h-0 h-10 w-24"
            onClick={handleNavigateButtonClick}
          >
            자세히보기
          </button>
          {new Date().getTime() < new Date(checkInDate).getTime() ? (
            <ModalTriggerButton
              disabled={false}
              text={ModalText.CANCEL}
              accommodationId={accommodationId}
              bookId={id}
            />
          ) : reviewRegistered ? (
            <ModalTriggerButton
              disabled={true}
              text={ModalText.COMPLETE}
              accommodationId={accommodationId}
              bookId={id}
            />
          ) : (
            <ModalTriggerButton
              disabled={false}
              text={ModalText.REVIEW}
              accommodationId={accommodationId}
              bookId={id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationInfoCard;
