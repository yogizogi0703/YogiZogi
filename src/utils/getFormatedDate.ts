export const getFormatedDate = (selectedDate: Date) => {
    const dateString = selectedDate.toLocaleDateString().split('. ');
    const year = dateString[0];
    const month =
      Number(dateString[1]) < 10 ? '0' + dateString[1] : dateString[1];
    const date =
      selectedDate.getDate() < 10
        ? '0' + selectedDate.getDate()
        : selectedDate.getDate();
    return `${year}-${month}-${date}`;
  };