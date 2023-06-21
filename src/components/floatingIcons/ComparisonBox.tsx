import { useRecoilValue } from 'recoil';
import { selectedAccommodation } from '../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertModal } from '../../components/common/AlertModal';

export const ComparisonBox = ({ display }: { display: boolean }) => {
  const selectedAcc = useRecoilValue(selectedAccommodation);
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
  );
  const {
    checkindate: checkInDate,
    checkoutdate: checkOutDate,
    people: people
  } = Object.fromEntries(urlParams.entries());

  const convertDateFormat = (date: string) => {
    const [, month, day] = date.split('-');
    return `${month}/${day}`;
  };

  const handleComparison = () => {
    if(selectedAcc.length < 2) setModalState(true) 
  }

  return (
    <article
      className={`flex flex-col justify-between chat chat-end absolute bottom-6 right-20 w-72 h-52 ${
        display ? 'block' : 'hidden'
      }`}
    >
      <div className="chat-bubble chat-bubble-info flex flex-col justify-between w-full h-full">
        {selectedAcc.length === 0 && (
          <div className="flex items-center justify-center w-full h-1/3 text-sm bg-white rounded-xl">
            상품을 담아주세요
          </div>
        )}
        {selectedAcc.map((el, idx) => {
          return (
            <div key={idx} className="flex gap-1 rounded-lg bg-white">
              <figure
                className="w-1/2 rounded-s-lg cursor-pointer tooltip tooltip-warning tooltip-right"
                data-tip="자세히보기"
                onClick={() =>
                  navigate(
                    `/accommodation/${el.id}?&checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}&rate=${el.rate}`
                  )
                }
              >
                <img
                  src={el.pictureUrlList[0]}
                  alt={`${el.accommodationName} image`}
                  className="rounded-s-lg h-full"
                />
              </figure>
              <div className="w-1/2">
                <p className="truncate font-semibold">{el.accommodationName}</p>
                <p>
                  {convertDateFormat(checkInDate)} ~{' '}
                  {convertDateFormat(checkOutDate)}
                </p>
                <p>{addCommasToPrice(el.price)}원</p>
              </div>
            </div>
          );
        })}
        <div
          onClick={handleComparison}
          className="flex justify-end items-end"
        >
          <button className="btn btn-xs bg-white">비교하기</button>
        </div>
      </div>
      <AlertModal
        content="2개의 상품을 담아주세요!"
        modalState={modalState}
        handleModal={setModalState}
      />
    </article>
  );
};
