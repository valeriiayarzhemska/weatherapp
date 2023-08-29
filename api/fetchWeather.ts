/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;
const searchURL = `${baseURL}/geo/1.0/direct`;
const findByLatLonURL = `${baseURL}/data/2.5/forecast`;

export interface Coords {
  lon: number,
  lat: number,
}

const apiWeatherCallLatLong = async (
  lat: string,
  lon: string,
  unit?: string,
) => {  
  try {
    const response = await axios.get(findByLatLonURL, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: unit,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

const apiWeatherCallCity = async (params, url) => {
  const { city, unit, limit } = params;

  try {
    const response = await axios.get(url, {
      params: {
        q: city,
        appid: apiKey,
        units: unit,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchWeatherForecast = async (
  lat: string,
  lon: string,
  unit?: string,
) => {
  const weatherDataByLatLong = await apiWeatherCallLatLong(
    lat,
    lon,
    unit,
  );

  return weatherDataByLatLong;
};

export const fetchWeatherForSearch = async (params) => {
  const weatherDataByCity = await apiWeatherCallCity({ ...params, limit: 5 }, searchURL);

  return weatherDataByCity;
};
