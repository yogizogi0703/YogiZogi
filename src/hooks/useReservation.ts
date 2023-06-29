import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { ReservationAddProps, fetchReservation } from '../api/reservation';
import useModal from './useModal';

interface ReservationProps {
  name: string;
}

const useReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuth();
  const { openModal } = useModal();
  const roomInfoRef = useRef(location.state);
  const params = new URLSearchParams(location.search);
  const accommodationInfoRef = useRef({
    accommodationName: params.get('accommodation'),
    checkInDate: params.get('checkindate'),
    checkOutDate: params.get('checkoutdate'),
    price: params.get('price'),
    people: params.get('people')
  });
  const [reservationData, setReservationData] = useState<ReservationProps>({
    name: ''
  });

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checked = target.checked;
    if (checked) {
      setReservationData({
        name: String(authUser.user.nickname)
      });
    } else {
      setReservationData({ name: '' });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setReservationData((reservationData) => ({
      ...reservationData,
      [name]: value
    }));
  };

  const getReservationFormdata = (): ReservationAddProps => {
    return {
      roomId: Number(roomInfoRef.current.roomId),
      checkInDate: String(accommodationInfoRef.current.checkInDate),
      checkOutDate: String(accommodationInfoRef.current.checkOutDate),
      people: Number(accommodationInfoRef.current.people),
      payAmount: Number(accommodationInfoRef.current.price),
      bookName: reservationData.name
    };
  };

  const handleReservationSubmit = async () => {
    if (!reservationData.name) {
      openModal({ content: '예약자명을 입력해주세요.' });
      return;
    }

    openModal({
      content: '숙소를 예약합니다.',
      btnTitle: '예약',
      handle: submitReservation
    });
  };

  const submitReservation = async () => {
    const accommodationId = Number(roomInfoRef.current.accommodationId);
    const data = getReservationFormdata();
    const res = await fetchReservation(accommodationId, data);

    if (!res) {
      openModal({ content: '문제가 발생했습니다.' });
      return;
    }

    if (res.status === 'OK') {
      openModal({ content: res.data.msg });
      navigate('/reservationConfirm');
    } else {
      openModal({ content: res.msg });
      console.error(res.code);
    }
  };

  return {
    roomInfoRef,
    accommodationInfoRef,
    reservationData,
    handleChangeInput,
    handleChangeChecked,
    handleReservationSubmit
  };
};

export default useReservation;
