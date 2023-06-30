import { IRoomData, IRoomResponse } from 'api/accommodationDetail';
import { addCommasToPrice } from '../../helpers';
import { ConfirmModal } from './ConfirmModal';
import { useEffect, useState } from 'react';
import { IModalProps } from './CarouselModal';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { selectedRoom } from '../../store/atom/comparisonAtom';
import { AlertModal } from '../../components/common/AlertModal';

interface IRoomInfo {
  roomInfo: IRoomResponse[];
  setModalProps: React.Dispatch<React.SetStateAction<IModalProps>>;
  setRoomData: React.Dispatch<React.SetStateAction<IRoomData>>;
  roomData: IRoomData;
}

export const RoomInfo = ({
  roomInfo,
  setModalProps,
  setRoomData,
  roomData
}: IRoomInfo) => {
  const [modalContent, setModalContent] = useState('');
  const [modalState, setModalState] = useState(false);
  const [alertModalState, setAlertModalState] = useState(false);
  const [selectedRooms, setSelectedRooms] =
    useRecoilState<IComparison[]>(selectedRoom);

  const addRoomComparisonCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: IRoomResponse
  ) => {
    e.preventDefault();

    if (selectedRooms.some((el) => el.roomName === item.roomName)) {
      setModalContent('이미 담긴 상품입니다.');
      setAlertModalState(true);
    } else {
      const comparisonData = {
        accommodationName: roomData.accommodationName,
        accommodationId: roomData.accommodationId,
        address: roomData.address,
        roomName: item.roomName,
        rate: roomData.rate,
        price: item.price,
        priceArr: [],
        imgUrl: item.pictureUrlList[0].url,
        facility: item.conveniences
      };
      setSelectedRooms((prev) => [...prev, comparisonData]);
    }
  };

  return (
    <>
      {roomInfo.length > 0 ? (
        roomInfo.map((el, idx) => {
          return (
            <div key={idx}>
              {el.pictureUrlList.length > 0 && (
                <div className="flex flex-col items-center sm:flex-row gap-3">
                  <label
                    key={idx}
                    htmlFor="reservationModal"
                    className="flex sm:w-1/3 max-w-sm"
                    onClick={() =>
                      setModalProps({
                        imgList: el.pictureUrlList,
                        alt: 'accommodation detail image',
                        selectedImg: idx
                      })
                    }
                  >
                    <figure className="mx-auto cursor-pointer w-full">
                      <img
                        src={el.pictureUrlList[0].url}
                        alt={`${roomData.accommodationName}-${el.roomName} image`}
                        className="w-full h-full"
                      />
                    </figure>
                  </label>
                  <div className="flex flex-col flex-wrap ml-2 w-fit sm:w-1/3">
                    <h3 className="w-[90%] max-w-72 text-base md:text-xl font-semibold mt-0 md:mb-1 truncate">
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
                  <div className="flex flex-row sm:w-1/3 justify-center">
                    <div className="flex sm:flex-col gap-3 my-auto items-center">
                      <button
                        className="flex gap-2 btn btn-sm font-semibold md:min-w-[100px] md:btn-md md:text-base bg-red-500 disabled:bg-red-800 hover:bg-red-600 text-white"
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
                        disabled={el.price === null}
                      >
                        {addCommasToPrice(el.price)}원
                      </button>
                      <button
                        onClick={(e) => addRoomComparisonCart(e, el)}
                        className="flex gap-2 btn btn-sm min-w-[80px] md:min-w-[100px] md:btn-md btn-success text-white"
                      >
                        <MdOutlineBedroomParent className="w-5 h-5" />
                      </button>
                      <ConfirmModal
                        data={roomData}
                        modalState={modalState}
                        setModalState={setModalState}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-40 bg-base-200 border rounded-lg">
          <p>준비된 방이 없습니다.</p>
        </div>
      )}
      <AlertModal
        content={modalContent}
        modalState={alertModalState}
        handleModal={setAlertModalState}
      />
    </>
  );
};
