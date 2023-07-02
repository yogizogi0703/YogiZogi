import { SetterOrUpdater, useRecoilState } from 'recoil';
import {
  selectedAccommodation,
  selectedRoom
} from '../../../store/atom/comparisonAtom';
import { addCommasToPrice } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AlertModal } from '../../common/AlertModal';
import { ComparisonModal } from './ComparisonModal';
import { convertDateFormat } from '../../../utils/handleDate';
import {
  IComparisonBoxProps,
  IComparisonItem,
} from './Comparison';

interface IComparisonBox {
  display: boolean;
  source: string;
}

export const ComparisonBox = ({ display, source }: IComparisonBox) => {
  let data: IComparisonBoxProps[],
    setData: SetterOrUpdater<IComparisonBoxProps[]>;

  if (source === 'room') {
    const [selectedRooms, setSelectedRooms] = useRecoilState(selectedRoom);
    data = selectedRooms;
    setData = setSelectedRooms;
  } else {
    const [selectedAcc, setSelectedAcc] = useRecoilState(selectedAccommodation);
    data = selectedAcc;
    setData = setSelectedAcc;
  }

  const [alertModalState, setAlertModalState] = useState(false);
  const [comparisonModalState, setComparisonModalState] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<IComparisonItem[]>(
    []
  );

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(
    '?' + window.location.hash.split('?')[1]
  );

  const {
    checkindate: checkInDate,
    checkoutdate: checkOutDate,
    people: people
  } = Object.fromEntries(urlParams.entries());

  const handleComparison = () => {
    if (data.length < 2) setAlertModalState(true);
    else {
      const comparisonData = data.map((el) => {
        return {
          accommodationId: el.accommodationId,
          roomId: el.roomId.toString(),
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          people: people
        };
      });
      setComparisonItems(comparisonData)
      setComparisonModalState(true);
    }
  };

  const deleteSelectedAcc = (idx: number) => {
    const newItems = data.filter((_, i) => i !== idx);
    setData(newItems);
  };

  return (
    <article
      className={`flex flex-col justify-between chat chat-end absolute ${
        source === 'room'
          ? 'bottom-16 md:bottom-28 right-16 md:right-20'
          : 'bottom-6 right-16 md:right-20'
      } w-80 h-fit ${display ? 'block' : 'hidden'}`}
    >
      <div className="chat-bubble bg-[#1A1A3D] flex flex-col justify-between w-full h-fit">
        {data.length === 0 && (
          <div className="flex items-center justify-center w-full h-20 mb-2 text-sm bg-white rounded-xl text-black">
            {source === 'room'
              ? '원하시는 객실을 담아주세요'
              : '원하시는 숙소를 담아주세요'}
          </div>
        )}
        {data.map((el, idx) => {
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
                    `/accommodation/${el.accommodationId}?&checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}`
                  )
                }
              >
                <img
                  src={el.imgUrl}
                  alt={`${el.accommodationName} image`}
                  className="rounded-s-lg h-full w-full"
                />
              </figure>
              <div className="w-5/12 text-sm text-black">
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
        data={comparisonItems}
        setData={setComparisonItems}
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
