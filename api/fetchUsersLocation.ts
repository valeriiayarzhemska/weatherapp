/* import axios, { AxiosResponse } from 'axios';

const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

const locationsEndpoint = (lat: number, lon: number, limit: number): string =>
  `${baseURL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;

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
