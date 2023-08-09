/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosResponse } from 'axios';
import { BASE_URL, API_KEY } from '../utils/constants/constants';

/* const forecastEndpoint = (city: string, units: string): string =>
  `${BASE_URL}/data/2.5/weather?q=${city}&units=${units}&appid=${api_key}`; */

const apiForecastCall = async (latitude: number, longitude: number, unit: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/3.0/onecall`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: unit,
      },
    });
    console.log(API_KEY);

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchWeatherForecast = (latitude: number, longitude: number, unit: string) => {
  // const forecastUrl = forecastEndpoint(city, units);

  return apiForecastCall(latitude, longitude, unit);
};
