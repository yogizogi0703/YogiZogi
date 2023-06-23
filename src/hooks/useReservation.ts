import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from './useAuth';

interface ReservationProps {
  name: string;
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
        name: String(authUser.user.iss)
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

  const handleReservationSubmit = () => {
    const data = {
      roomId: 0,
      checkInDate: accommodationInfoRef.current.checkInDate,
      checkOutDate: accommodationInfoRef.current.checkOutDate,
      people: accommodationInfoRef.current.people,
      payAmount: accommodationInfoRef.current.price,
      bookName: reservationData.name
    };

    console.log(data);
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
