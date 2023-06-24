import { useRecoilState } from 'recoil';
import { selectedAccommodation } from '../../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertModal } from '../../common/AlertModal';
import { ComparisonModal } from './ComparisonModal';

export const ComparisonBox = ({ display }: { display: boolean }) => {
  const [selectedAcc, setSelectedAcc] = useRecoilState(selectedAccommodation);
  const [alertModalState, setAlertModalState] = useState(false);
  const [comparisonModalState, setComparisonModalState] = useState(false);

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
    if (selectedAcc.length < 2) setAlertModalState(true);
    else setComparisonModalState(true);
  };
  const deleteSelectedAcc = (idx: number) => {
    const newItems = selectedAcc.filter((_, i) => i !== idx);
    setSelectedAcc(newItems);
  };

  return (
    <article
      className={`flex flex-col justify-between chat chat-end absolute bottom-6 right-16 md:right-20 w-56 sm:w-72 h-40 sm:h-52 ${
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
            <div
              key={idx}
              className="flex justify-between gap-1 h-12 sm:h-16 rounded-lg bg-white"
            >
              <figure
                className="w-5/12 object-cover rounded-s-lg cursor-pointer tooltip tooltip-warning tooltip-right"
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
                  className="rounded-s-lg h-full w-full"
                />
              </figure>
              <div className="w-5/12 text-[10px] md:text-sm">
                <p className="truncate font-semibold text-sm sm:text-base">
                  {el.accommodationName}
                </p>
                <p>
                  {convertDateFormat(checkInDate)} ~{' '}
                  {convertDateFormat(checkOutDate)}
                </p>
                <p>{addCommasToPrice(el.price)}원</p>
              </div>
              <button
                onClick={() => deleteSelectedAcc(idx)}
                className="badge badge-neutral badge-sm w-3 text-white"
              >
                ✕
              </button>
            </div>
          );
        })}
        <div onClick={handleComparison} className="flex justify-end items-end">
          <button className="btn btn-xs bg-white text-[10px] sm:text-base font-normal">
            비교하기
          </button>
        </div>
      </div>
      <ComparisonModal
        modalState={comparisonModalState}
        handleModal={setComparisonModalState}
      />
      <AlertModal
        content="2개의 상품을 담아주세요!"
        modalState={alertModalState}
        handleModal={setAlertModalState}
      />
    </article>
  );
};
