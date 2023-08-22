import { nightImages, timeCheck } from '../constants/constants';

export const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  const monthAbbreviation = dateObject.toLocaleString('en-US', {
    month: 'short',
  });
  const dayNumber = dateObject.getDate();

  return `${monthAbbreviation}, ${dayNumber}`;
};

export const getWeatherImage = (description: string) => {
  console.log(description);
  const hasNightImage = nightImages.find((image) => image === description)
    ? true
    : false;
  const weatherImage =
    timeCheck && hasNightImage ? `${description} night` : description;
  
  return weatherImage;
};
