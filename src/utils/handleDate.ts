export const getMonthDayFormat = (selectedDate: Date) => {
  const dateString = selectedDate.toLocaleDateString().split('. ');
  const month =
    Number(dateString[1]) < 10 ? '0' + dateString[1] : dateString[1];
  const date =
    selectedDate.getDate() < 10
      ? '0' + selectedDate.getDate()
      : selectedDate.getDate();
  return `${month}/${date}`;
};