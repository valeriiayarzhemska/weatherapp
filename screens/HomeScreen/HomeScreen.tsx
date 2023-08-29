import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import cn from 'classnames';
import { getData, storeData } from '../../utils/asyncStorage';
import { getDateFromString, getUnits, getWeatherImage } from '../../utils/helpers';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Platform,
  Image,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  fetchWeatherForSearch,
  fetchWeatherForecast,
} from '../../api/fetchWeather';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';
import { WeatherData } from '../../types/WeatherData';
import {
  forecastDays,
  timeCheck,
  todaysDate,
  weatherImages
} from '../../constants/constants';
import { HomeProps } from '../../types/Navigation';

export const StyledView = styled(View);
export const StyledText = styled(Text);
export const StyledTextInput = styled(TextInput);
export const StyledPressable = styled(Pressable);

export const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  let forecastDaysIndex = -1;
  let minForecastTemp;

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleSearch = (cityName: string) => {
    setLocations([]);

    if (cityName && cityName.length > 2) {
      const loadWeatherSearchData = async () => {
        try {
          const weatherSearchData = await fetchWeatherForSearch({
            city: cityName,
          });
          setLocations(weatherSearchData);
        } catch {
          setHasError(true);
        } finally {
          setHasError(false);
        }
      };

      loadWeatherSearchData();
    }
  };

  const handleLocation = (location) => {
    setIsLoading(true);
    setShowSearch(false);
    setLocations([]);

    const loadWeatherData = async () => {
      const { lat, lon } = location;
      const usersWeatherUnits = await getUnits();

      try {
        const weatherData = await fetchWeatherForecast(lat, lon, usersWeatherUnits);
        console.log(weatherData);
        setWeather(weatherData);
        storeData('usersLat', lat.toString());
        storeData('usersLon', lon.toString());
      } catch {
        setIsLoading(false);
        setHasError(true);
      } finally {
        setHasError(false);
        setIsLoading(false);
      }
    };

    loadWeatherData();
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  useEffect(() => {
    setIsLoading(true);

    const loadData = async () => {
      const usersLat = await getData('usersLat');
      const usersLon = await getData('usersLon');
      const usersUnits = await getUnits();
      const latKyiv = '50.4333';
      const lonKyiv = '30.5167';

      try {
        if (usersLat && usersLon) {
          const location = await fetchWeatherForecast(
            usersLat.toString(),
            usersLon.toString(),
            usersUnits.toString(),
          );
          console.log(location);
          setWeather(location);
        } else {
          const locationKyiv = await fetchWeatherForecast(
            latKyiv,
            lonKyiv,
            usersUnits.toString(),
          );

          setWeather(locationKyiv);
        }
      } catch {
        setIsLoading(false);
        setHasError(true);
      } finally {
        setHasError(false);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <StyledView
      className={'flex-1 relative'}
      style={{ width: '100%', height: '100%' }}
    >
      <StatusBar style='light' />
      <LinearGradient
        colors={timeCheck ? ['#08244F', '#134CB5', '#0B42AB'] : ['#29B2DD', '#33AADD', '#2DC8EA']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {isLoading && (
        <StyledView className={'flex flex-1 justify-around items-center'}>
          <ActivityIndicator size="large" color='#2566A3' />
        </StyledView>
      )}

      {hasError && (
        <StyledView className={'flex flex-1 justify-center items-center'}>
          <StyledText className={'mb-4 text-xl font-bold text-white'}>
            Sorry, something went wrong
          </StyledText>

          <StyledPressable onPress={handleRefresh}>
            <Image
              source={require('../../assets/icons/icon-refresh.png')}
              style={{ width: 25, height: 25 }}
            />
          </StyledPressable>
        </StyledView>
      )} 

      {weather && !isLoading && !hasError && (
        <SafeAreaView className={'flex flex-1'}>
          <ScrollView>
            <StyledView className={'mx-5 relative z-50'}>
              <StyledView
                className={'flex-row justify-between items-center mt-4'}
              >
                {showSearch ? (
                  <StyledView
                    className={
                      'flex-row content-center items-center w-full h-input rounded-full bg-white'
                    }
                  >
                    <StyledPressable
                      onPress={() => setShowSearch(!showSearch)}
                      className={'flex justify-center ml-2 p-3.5 rounded-full'}
                    >
                      <Image
                        source={require('../../assets/icons/icon-back.png')}
                        style={{ width: 12, height: 12 }}
                      />
                    </StyledPressable>

                    <StyledTextInput
                      onChangeText={handleTextDebounce}
                      placeholder='Search a city'
                      placeholderTextColor={'lightgray'}
                      className={'flex items-center py-0 pl-2 w-full text-lg text-black leading-middle'}
                      // style={{ marginBottom: Platform.OS === 'ios' ? 2 : 0 }}
                    />
                  </StyledView>
                ) : (
                  <>
                    <StyledView>
                      <StyledPressable
                        onPress={() => setShowSearch(!showSearch)}
                        className={'flex-row items-center rounded-full p-3 m-1'}
                      >
                        <Image
                          source={require('../../assets/icons/icon-geo.png')}
                          style={{ width: 25, height: 25 }}
                        />

                        <StyledText
                          className={'ml-3 text-lg font-bold color-white'}
                        >
                          {weather.city.name}
                        </StyledText>

                        <Image
                          source={require('../../assets/icons/icon-arrow.png')}
                          className={'ml-3'}
                          style={{ width: 30, height: 30 }}
                        />
                      </StyledPressable>
                    </StyledView>

                    <StyledView>
                      <StyledPressable 
                        className={'flex rounded-full p-3 m-1'}
                        onPress={() =>
                          navigation.push('Settings')
                        }
                      >
                        <Image
                          source={require('../../assets/icons/settings.png')}
                          style={{ width: 22, height: 22 }}
                        />
                      </StyledPressable>
                    </StyledView>
                  </>
                )}

                {locations.length > 0 && showSearch ? (
                  <StyledView className={'absolute w-full bg-white top-16 rounded-3xl'}>
                    {locations.map((loc, index) => {
                      let showBorder = index + 1 != locations.length;
                      let borderClass = showBorder
                        ? ' border-b-2 border-slate-50'
                        : '';
                      return (
                        <StyledPressable
                          key={index}
                          onPress={() => handleLocation(loc)}
                          className={
                            'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                            borderClass
                          }
                        >
                          <Image
                            source={require('../../assets/icons/icon-geo-black.png')}
                            style={{ width: 15, height: 15 }}
                          />

                          <StyledText
                            className={'text-black text-base ml-2'}
                          >
                            {loc?.name}, {loc?.country}
                          </StyledText>
                        </StyledPressable>
                      );
                    })}
                  </StyledView>
                ) : null}
              </StyledView>
            </StyledView>

            <StyledView className={'flex justify-around items-center mt-2 mb-5 mx-9'}>
              <StyledView className={'flex-column justify-center items-center mb-6 w-32 h-32'}>
                <Image
                  source={weatherImages[getWeatherImage(weather.list[0].weather[0].description || 'else')]}
                  className={'w-full h-full'}
                />
              </StyledView>

              <StyledView className={'mb-8'}>
                <Text
                  className={'mb-1.5 ml-5 text-center font-bold text-white text-6xl '}
                >
                  {Math.round(weather.list[0].main.temp)}&#176;
                </Text>

                <Text
                  className={'font-light text-center text-white text-lg tracking-widest'}
                >
                  Sunny
                </Text>

                <Text
                  className={'font-light text-center text-white text-lg tracking-widest'}
                >
                  Max.: {Math.round(weather.list[0].main.temp_max)}&#176; Min.:{' '}
                  {Math.round(weather.list[0].main.temp_min)}&#176;
                </Text>
              </StyledView>

              <StyledView className={cn(
                'flex-row justify-between mx-5 px-4 w-full h-12 rounded-medium',
                { 'bg-light-blue/30': !timeCheck },
                { 'bg-dark-blue/30': timeCheck },
              )}>
                <StyledView className={'flex-row space-x-1.5 items-center'}>
                  <Image
                    source={require('../../assets/icons/icon-rain.png')}
                    className={'w-6 h-6'}
                  />
                  <StyledText
                    className={'text-white text-sm font-semibold'}
                  >
                    {weather.list[0].main.humidity}%
                  </StyledText>
                </StyledView>

                <StyledView className={'flex-row space-x-1.5 items-center'}>
                  <Image
                    source={require('../../assets/icons/icon-humidity.png')}
                    className={'w-6 h-6'}
                  />
                  <StyledText
                    className={'text-white text-sm font-semibold'}
                  >
                    {Math.round(weather.list[0].main.feels_like)}&#176;
                  </StyledText>
                </StyledView>

                <StyledView className={'flex-row space-x-1.5 items-center'}>
                  <Image
                    source={require('../../assets/icons/icon-wind.png')}
                    className={'w-6 h-6'}
                  />
                  <StyledText
                    className={'text-white text-sm font-semibold'}
                  >
                    {Math.round(weather.list[0].wind.speed)} km/h
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>

            <StyledView className={cn(
                'mb-5 mx-9 py-3 space-y-3 rounded-medium',
                { 'bg-light-blue/30': !timeCheck },
                { 'bg-dark-blue/30': timeCheck },
              )}>
              <StyledView className={'flex-row justify-between mx-5 space-x-2'}>
                <StyledText className={'font-bold text-xl text-white'}>Today</StyledText>

                <StyledText className={'text-lg text-white'}>{getDateFromString(weather.list[0].dt_txt)}</StyledText>
              </StyledView>

              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                className={'space-x-3'}
              >
                {weather.list.slice(0, 9).map((item, index) => {
                  const datetimeString = item.dt_txt;                
                  const timeArray = datetimeString.split(' ')[1].split(':');
                  const timePortion = `${timeArray[0]}:${timeArray[1]}`;
                  const firstChild = index === 0;

                  return (
                    <StyledView
                      key={index}
                      className={cn(
                        'flex justify-center items-center space-y-7 p-3 w-container rounded-3xl',
                        {'bg-medium-blue-bg/20 border-min border-br-blue': firstChild && timeCheck},
                        {'bg-light-blue-bg/20 border-min border-br-blue-light': firstChild && !timeCheck},
                      )}
                    >
                      <StyledText className={'text-lg text-white'}>
                        {Math.round(item.main.temp)}&#176;
                      </StyledText>

                      <StyledView className={'w-9 h-9'}>
                        <Image
                          source={weatherImages[getWeatherImage(item.weather[0].description || 'else')]}
                          className={'w-full h-full'}
                        />
                      </StyledView>

                      <StyledText className={'text-base text-white'}>
                        {timePortion}
                      </StyledText>
                    </StyledView>
                  );
                })}
              </ScrollView>
            </StyledView>

            <StyledView className={cn(
                'mb-9 mx-9 py-3 space-y-3 rounded-medium',
                { 'bg-light-blue/30': !timeCheck },
                { 'bg-dark-blue/30': timeCheck },
              )}>
              <StyledView className={'flex-row justify-between mx-5 space-x-2'}>
                <StyledText className={'font-bold text-xl text-white'}>Next Forecast</StyledText>

                <Image
                  source={require('../../assets/icons/icon-calendar.png')}
                  className={'w-6 h-6'}
                />
              </StyledView>

              <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather.list.map((item, index) => {
                  let datetimeString = todaysDate();                
                  const datetimeStringPart = item.dt_txt.split(' ');

                  if (datetimeString !== datetimeStringPart[0]
                  && datetimeStringPart[1] === '00:00:00') {
                    minForecastTemp = Math.round(item.main.temp_min);
                  }

                  if (datetimeString !== datetimeStringPart[0]
                  && datetimeStringPart[1] === '15:00:00') {
                    datetimeString = datetimeStringPart[0];
                    forecastDaysIndex += 1;

                    return (
                      <StyledView
                        key={index}
                        className={'flex-row justify-between items-center w-full py-4'}
                      >
                        <StyledText className={' font-bold text-lg text-white'}>
                          {forecastDays[forecastDaysIndex]}
                        </StyledText>

                        <StyledView className={'flex-row justify-between items-center w-7/12'}>
                          <StyledView className={'w-7 h-7'}>
                            <Image
                              source={weatherImages[getWeatherImage(item.weather[0].description || 'else')]}
                              className={'w-full h-full'}
                            />
                          </StyledView>

                          <StyledView className={'flex-row'}>
                            <StyledText className={'text-lg text-white'}>
                              {Math.ceil(item.main.temp_max)}&#176;
                            </StyledText>

                            <StyledText className={'ml-2.5 text-lg text-white/50'}>
                              {minForecastTemp}&#176;
                            </StyledText>
                          </StyledView>
                        </StyledView>
                      </StyledView>
                    );
                  }
                })}
              </ScrollView>
            </StyledView>
          </ScrollView>
        </SafeAreaView>
      )}
    </StyledView>
  );
};
