/* import axios, { AxiosResponse } from 'axios';
import { BASE_URL, api_key } from '../utils/constants/constants';

const locationsEndpoint = (lat: number, lon: number, limit: number): string =>
  `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${api_key}`;

const apiLocationCall = async (url: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchWeatherForecast = (data) => {
  const locationUrl = locationsEndpoint(lat, lon, limit);

  return apiLocationCall(locationUrl);
};
*/
