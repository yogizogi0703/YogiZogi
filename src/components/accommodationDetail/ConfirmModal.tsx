import { IPrice, IRoomResponse } from 'api/accommodationDetail';
import { useNavigate } from 'react-router-dom';

interface IConfirmModal {
  roomImg: string;
  roomInfo: IRoomResponse;
  price: number;
  checkInDate: string;
  checkOutDate: string;
  people: string;
}

export const ConfirmModal = ({
  roomImg,
  roomInfo,
  price,
  checkInDate,
  checkOutDate,
  people
}: IConfirmModal) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/payment/book?accommodation=${roomInfo.roomName}checkindate=${checkInDate}&checkoutdate=${checkOutDate}&people=${people}&price=${price}`,
      { state: { roomImg: roomImg, roomInfo: roomInfo } }
    );
  };
  return (
    <>
      <input type="checkbox" id="confirmModal" className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col gap-5 modal-box w-full max-w-2xl">
          <div className="flex gap-5">
            <figure className="w-full">
              <img src={roomImg} className="w-full" />
            </figure>
          </div>
          <div>
            <div className="flex gap-2 justify-around flex-wrap">
              <div>
                <p>
                  <span className="font-semibold">{roomInfo.roomName}</span>
                </p>
                <p>
                  <span className="font-semibold">인원</span>: {people}명
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">체크인: </span>
                  {checkOutDate}
                </p>
                <p>
                  <span className="font-semibold">체크아웃</span>:{' '}
                  {checkOutDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary modal-action mt-0 w-fit text-white btn-sm text-xs md:btn-md md:text-base"
              onClick={handleClick}
            >
              {price}원 예약하기
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="confirmModal">
          Close
        </label>
      </div>
    </>
  );
};
