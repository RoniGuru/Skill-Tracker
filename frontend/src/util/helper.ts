export const formatDate = (date: Date): string => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(newDate.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
