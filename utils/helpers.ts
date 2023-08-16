export const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  const monthAbbreviation = dateObject.toLocaleString('en-US', { month: 'short' });
  const dayNumber = dateObject.getDate();

  return `${monthAbbreviation}, ${dayNumber}`;
}
