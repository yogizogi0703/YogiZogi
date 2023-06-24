import DatePickInput from './DatePickInput';
import { useCallback } from 'react';

interface IReservationDatePicker {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const ReservationDatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: IReservationDatePicker) => {
  const handleStartDateChange = useCallback((date: Date) => {
    onStartDateChange(date);
  }, []);

  const handleEndDateChange = useCallback((date: Date) => {
    onEndDateChange(date);
  }, []);

  const getMaxStartDate = useCallback(() => {
    const date = new Date(endDate);
    date.setDate(date.getDate() - 1);
    return date;
  }, [endDate]);

  const getMinEndDate = useCallback(() => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date;
  }, [startDate]);

  return (
    <>
      <DatePickInput
        date={startDate}
        maxDate={getMaxStartDate()}
        onDateChange={handleStartDateChange}
      />
      <div className="w-4 h-px bg-gray-200"></div>
      <DatePickInput
        date={endDate}
        minDate={getMinEndDate()}
        onDateChange={handleEndDateChange}
      />
    </>
  );
};

export default ReservationDatePicker;
