/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosResponse } from 'axios';

const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

/* const weatherEndpoint = (city: string, units: string): string =>
  `${baseURL}/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
 */
const apiWeatherCallLatLong = async (
  latitude: number,
  longitude: number,
  unit: string,
) => {
  try {
    const response = await axios.get(`${baseURL}/data/3.0/onecall`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: unit,
      },
    });

    return {
      cityName: response.data.name,
      units: unit,
    };
  } catch (error) {
    console.log('error: ', error);
  }
};

const apiWeatherCallCity = async (
  city: string,
  unit: string,
) => {
  try {
    const response = await axios.get(`${baseURL}/data/2.5/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: unit,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchWeatherForSearch = async (
  latitude: number,
  longitude: number,
  unit: string,
) => {
  const weatherDataByLatLong = await apiWeatherCallLatLong(
    latitude,
    longitude,
    unit,
  );
  const weatherDataByCity = await apiWeatherCallCity(
    weatherDataByLatLong.cityName,
    unit,
  );

  return weatherDataByCity;
};
