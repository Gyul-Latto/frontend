export const getYesterdayDate = (dayBefore) => {
  const date = new Date();
  date.setDate(date.getDate() - dayBefore);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getPreviousHour = () => {
  const date = new Date();
  date.setHours(date.getHours() - 1);
  const hours = String(date.getHours()).padStart(2, '0');
  return hours;
};
