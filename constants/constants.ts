const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayInAWeek = new Date().getDay();
export const forecastDays = weekDays
  .slice(dayInAWeek, weekDays.length)
  .concat(weekDays.slice(0, dayInAWeek));
const today = new Date();
const time = today.getHours();
export const timeCheck = time > 18;
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
export const todaysDate = () => {
  let updatedMonth = month.toString();

  if (updatedMonth.length < 2) {
    updatedMonth = '0' + updatedMonth;
  }

  return `${year}-${updatedMonth}-${day}`;
};

export const nightImages = [
  'very heavy rain',
  'extreme rain',
  'freezing rain',
  'light intensity shower rain',
  'shower rain',
  'heavy intensity shower rain',
  'ragged shower rain',
  'heavy snow',
  'sleet',
  'light shower sleet',
  'shower sleet',
  'light rain and snow',
  'rain and snow',
  'light shower snow',
  'shower snow',
  'heavy shower snow',
  'clear sky',
  'few clouds',
  'else',
];

export const weatherImages = {
  'thunderstorm with light rain': require('../assets/images/thunderstorm.png'),
  'thunderstorm with rain': require('../assets/images/thunderstorm.png'),
  'thunderstorm with heavy rain': require('../assets/images/heavy_thunderstorm.png'),
  'light thunderstorm': require('../assets/images/thunderstorm.png'),
  'thunderstorm': require('../assets/images/thunderstorm.png'),
  'heavy thunderstorm': require('../assets/images/heavy_thunderstorm.png'),
  'ragged thunderstorm': require('../assets/images/heavy_thunderstorm.png'),
  'thunderstorm with light drizzle': require('../assets/images/heavy_thunderstorm.png'),
  'thunderstorm with drizzle': require('../assets/images/heavy_thunderstorm.png'),
  'thunderstorm with heavy drizzle': require('../assets/images/heavy_thunderstorm.png'),
  'light intensity drizzle': require('../assets/images/drizzle.png'),
  'drizzle': require('../assets/images/drizzle.png'),
  'heavy intensity drizzle': require('../assets/images/drizzle.png'),
  'light intensity drizzle rain': require('../assets/images/drizzle.png'),
  'drizzle rain': require('../assets/images/drizzle.png'),
  'heavy intensity drizzle rain': require('../assets/images/drizzle.png'),
  'shower rain and drizzle': require('../assets/images/drizzle.png'),
  'heavy shower rain and drizzle': require('../assets/images/drizzle.png'),
  'shower drizzle': require('../assets/images/drizzle.png'),
  'light rain': require('../assets/images/light_rain.png'),
  'moderate rain': require('../assets/images/light_rain.png'),
  'heavy intensity rain': require(`../assets/images/heavy_intensity_rain.png`),
  'very heavy rain': require(`../assets/images/heavy_intensity_rain.png`),
  'very heavy rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'extreme rain': require(`../assets/images/heavy_intensity_rain.png`),
  'extreme rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'freezing rain': require(`../assets/images/heavy_intensity_rain.png`),
  'freezing rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'light intensity shower rain': require(`../assets/images/heavy_intensity_rain.png`),
  'light intensity shower rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'shower rain': require(`../assets/images/heavy_intensity_rain.png`),
  'shower rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'heavy intensity shower rain': require(`../assets/images/heavy_intensity_rain.png`),
  'heavy intensity shower rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'ragged shower rain': require(`../assets/images/heavy_intensity_rain.png`),
  'ragged shower rain night': require(`../assets/images/heavy_intensity_rain_night.png`),
  'light snow': require('../assets/images/snow.png'),
  'snow': require('../assets/images/snow.png'),
  'heavy snow': require(`../assets/images/heavy_snow.png`),
  'heavy snow night': require(`../assets/images/heavy_snow_night.png`),
  'sleet': require(`../assets/images/heavy_snow.png`),
  'sleet night': require(`../assets/images/heavy_snow_night.png`),
  'light shower sleet': require(`../assets/images/heavy_snow.png`),
  'light shower sleet night': require(`../assets/images/heavy_snow_night.png`),
  'shower sleet': require(`../assets/images/heavy_snow.png`),
  'shower sleet night': require(`../assets/images/heavy_snow_night.png`),
  'light rain and snow': require(`../assets/images/heavy_snow.png`),
  'light rain and snow night': require(`../assets/images/heavy_snow_night.png`),
  'rain and snow': require(`../assets/images/heavy_snow.png`),
  'rain and snow night': require(`../assets/images/heavy_snow_night.png`),
  'light shower snow': require(`../assets/images/heavy_snow.png`),
  'light shower snow night': require(`../assets/images/heavy_snow_night.png`),
  'shower snow': require(`../assets/images/heavy_snow.png`),
  'shower snow night': require(`../assets/images/heavy_snow_night.png`),
  'heavy shower snow': require(`../assets/images/heavy_snow.png`),
  'heavy shower snow night': require(`../assets/images/heavy_snow_night.png`),
  'mist': require('../assets/images/scattered_clouds.png'),
  'smoke': require('../assets/images/scattered_clouds.png'),
  'haze': require('../assets/images/scattered_clouds.png'),
  'sand/dust whirls': require('../assets/images/scattered_clouds.png'),
  'fog': require('../assets/images/scattered_clouds.png'),
  'sand': require('../assets/images/scattered_clouds.png'),
  'dust': require('../assets/images/scattered_clouds.png'),
  'volcanic ash': require('../assets/images/scattered_clouds.png'),
  'squalls': require('../assets/images/squalls.png'),
  'tornado': require('../assets/images/tornado.png'),
  'clear sky': require(`../assets/images/clear_sky.png`),
  'clear sky night': require(`../assets/images/clear_sky_night.png`),
  'few clouds': require(`../assets/images/few_clouds.png`),
  'few clouds night': require(`../assets/images/few_clouds_night.png`),
  'scattered clouds': require('../assets/images/scattered_clouds.png'),
  'broken clouds': require('../assets/images/scattered_clouds.png'),
  'overcast clouds': require('../assets/images/scattered_clouds.png'),
  'else': require(`../assets/images/few_clouds.png`),
  'else night': require(`../assets/images/few_clouds_night.png`),
}
