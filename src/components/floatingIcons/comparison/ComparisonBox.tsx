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
      className={`flex flex-col justify-between chat chat-end absolute bottom-6 right-16 md:right-20 w-80 h-fit ${
        display ? 'block' : 'hidden'
      }`}
    >
      <div className="chat-bubble chat-bubble-info flex flex-col justify-between w-full h-fit">
        {selectedAcc.length === 0 && (
          <div className="flex items-center justify-center w-full h-20 mb-2 text-sm bg-white rounded-xl">
            상품을 담아주세요
          </div>
        )}
        {selectedAcc.map((el, idx) => {
          return (
            <div
              key={idx}
              className="flex justify-between gap-1 mb-2 h-20 rounded-lg bg-white"
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
              <div className="w-5/12 text-sm">
                <p className="truncate font-semibold text-base">
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
                className="badge badge-neutral badge-sm mt-1 mr-1 w-3 text-white"
              >
                ✕
              </button>
            </div>
          );
        })}
        <div onClick={handleComparison} className="flex justify-end items-end">
          <button className="btn btn-sm bg-white  border-none text-sm font-normal">
            비교하기
          </button>
        </div>
      </div>
      <ComparisonModal
        modalState={comparisonModalState}
        handleModal={setComparisonModalState}
      />
      <AlertModal
        content="최소 2개의 상품을 담아주세요!"
        modalState={alertModalState}
        handleModal={setAlertModalState}
      />
    </article>
  );
};
