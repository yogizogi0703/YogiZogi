import { IRoomData, IRoomResponse } from 'api/accommodationDetail';
import { addCommasToPrice } from '../../helpers';
import { ConfirmModal } from './ConfirmModal';
import { useState } from 'react';
import { IModalProps } from './CarouselModal';

interface IRoomInfo {
  roomInfo: IRoomResponse[];
  setModalProps: React.Dispatch<React.SetStateAction<IModalProps>>;
  accommodationName: string;
  setRoomData: React.Dispatch<React.SetStateAction<IRoomData>>;
  roomData: IRoomData;
}

export const RoomInfo = ({
  roomInfo,
  setModalProps,
  accommodationName,
  setRoomData,
  roomData
}: IRoomInfo) => {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      {roomInfo.map((el, idx) => {
        return (
          <div
            key={idx}
            className="flex flex-col items-center sm:flex-row gap-3"
          >
            <label
              key={idx}
              htmlFor="reservationModal"
              className="flex"
              onClick={() =>
                setModalProps({
                  imgList: el.pictureUrlList,
                  alt: 'accommodation detail image',
                  selectedImg: idx
                })
              }
            >
              <figure className="mx-auto cursor-pointer">
                <img
                  src={el.pictureUrlList[0].url}
                  alt={`${accommodationName}-${el.roomName} image`}
                />
              </figure>
            </label>
            <div className="flex flex-col flex-wrap ml-2 w-fit sm:w-1/3">
              <h3 className="text-base md:text-xl font-semibold md:mb-1">
                {el.roomName}
              </h3>
              <div className="flex sm:flex-col gap-2">
                <p>
                  <span className="font-semibold">체크인: </span>
                  {el.checkInTime}시
                </p>
                <p>
                  <span className="font-semibold">체크아웃</span>:{' '}
                  {el.checkOutTime}시
                </p>
                <p>
                  <span className="font-semibold">기본인원</span>:{' '}
                  {el.defaultPeople}명
                </p>
                <p>
                  <span className="font-semibold">최대인원</span>:{' '}
                  {el.maxPeople}명
                </p>
              </div>
            </div>
            <div className="divider divider-horizontal mt-[-12px]" />
            <div className="flex flex-row sm:w-1/3 justify-center">
              <div className="flex sm:flex-col gap-3 my-auto items-center">
                <div className="font-semibold text-lg">
                  {addCommasToPrice(el.price)}원
                </div>
                <button
                  className="flex gap-2 btn btn-sm text-xs md:btn-md md:text-base bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    setRoomData((prev) => ({
                      ...prev,
                      roomId: el.id,
                      roomName: el.roomName,
                      roomImg: el.pictureUrlList[0].url,
                      price: el.price
                    }));
                    setModalState(true);
                  }}
                >
                  예약하기
                </button>
                <ConfirmModal
                  data={roomData}
                  modalState={modalState}
                  setModalState={setModalState}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
