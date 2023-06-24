import { addCommasToPrice } from '../../helpers';
import { useNavigate } from 'react-router-dom';

interface IConfirmModal {
  data: {
    accommodationName: string;
    accommodationId: number;
    address: string;
    rate: string;
    roomId: number;
    roomName: string;
    roomImg: string;
    price: number;
    checkInDate: string;
    checkOutDate: string;
    people: string;
  };
}

export const ConfirmModal = ({ data }: IConfirmModal) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/payment?accommodation=${data.accommodationName}&checkindate=${data.checkInDate}&checkoutdate=${data.checkOutDate}&people=${data.people}&price=${data.price}`,
      {
        state: {
          accommodationId: data.accommodationId,
          roomId: data.roomId,
          roomName: data.roomName,
          roomImg: data.roomImg,
          address: data.address,
          rate: data.rate
        }
      }
    );
  };

  return (
    <>
      <input type="checkbox" id="confirmModal" className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col gap-5 modal-box w-full max-w-2xl">
          <div className="flex gap-5">
            <figure className="w-full">
              <img src={data.roomImg} className="w-full" />
            </figure>
          </div>
          <div>
            <div className="flex gap-2 justify-around flex-wrap">
              <div>
                <p>
                  <span className="font-semibold">{data.roomName}</span>
                </p>
                <p>
                  <span className="font-semibold">인원</span>: {data.people}명
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">체크인: </span>
                  {data.checkOutDate}
                </p>
                <p>
                  <span className="font-semibold">체크아웃</span>:{' '}
                  {data.checkOutDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary modal-action mt-0 w-fit text-white btn-sm text-xs md:btn-md md:text-base"
              onClick={handleClick}
            >
              {addCommasToPrice(data.price)}원 예약하기
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
