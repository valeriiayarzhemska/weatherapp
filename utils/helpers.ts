import { nightImages, timeCheck } from '../constants/constants';
import { getData } from './asyncStorage';

export const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  const monthAbbreviation = dateObject.toLocaleString('en-US', {
    month: 'short',
  });
  const dayNumber = dateObject.getDate();

  return `${monthAbbreviation}, ${dayNumber}`;
};

export const getWeatherImage = (description: string) => {
  const hasNightImage = nightImages.find((image) => image === description)
    ? true
    : false;
  const weatherImage =
    timeCheck && hasNightImage ? `${description} night` : description;
  
  return weatherImage;
};

export const getUnits = async () => {
  const units = await getData('usersUnits');
  
  return units !== null ? units : 'metric';
}
