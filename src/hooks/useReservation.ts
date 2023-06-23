import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from './useAuth';

interface ReservationProps {
  name: string;
  email: string;
}

export const useReservation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { authUser } = useAuth();
  const roomInfoRef = useRef(location.state);
  const accommodationInfoRef = useRef({
    accommodationName: params.get('accommodation'),
    checkInDate: params.get('checkindate'),
    checkOutDate: params.get('checkoutdate'),
    price: params.get('price')
  });
  const [reservationData, setReservationData] = useState<ReservationProps>({
    name: '',
    email: ''
  });

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const checked = target.checked;
    if (checked) {
      setReservationData({
        name: String(authUser.user.nickname),
        email: String(authUser.user.email)
      });
    } else {
      setReservationData({ name: '', email: '' });
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

  return {
    roomInfoRef,
    accommodationInfoRef,
    reservationData,
    handleChangeInput,
    handleChangeChecked
  };
};
