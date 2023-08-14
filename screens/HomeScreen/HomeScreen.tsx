import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { getData, storeData } from '../../utils/asyncStorage';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import {
  fetchWeatherForSearch,
  fetchWeatherForecast,
} from '../../api/fetchWeather';
import { LinearGradient } from 'expo-linear-gradient';
// import { RootStackParamList } from '../../App';
// import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { WeatherData } from '../../types/WeatherData';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

// Define the type for the navigation prop in the HomeScreen component
// type HomeScreenNavigationProp = ReturnType<typeof useNavigation>;

// Define the props for the HomeScreen component
/* type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
}; */

/* type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>; */

export const HomeScreen: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fontsLoaded] = useFonts({
    SFPRODisplayRegular: require('../../assets/fonts/SFPRODisplayRegular.OTF'),
  });

  const handleSearch = (cityName: string) => {
    setLocations([]);

    if (cityName && cityName.length > 2) {
      const loadWeatherSearchData = async () => {
        try {
          const weatherSearchData = await fetchWeatherForSearch({
            city: cityName,
          });
          console.log(weatherSearchData);
          setLocations(weatherSearchData);
          console.log(locations);
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

      try {
        const weatherData = await fetchWeatherForecast(lat, lon);
        console.log(weatherData);
        setWeather(weatherData);
        console.log(weather.city.name);
        storeData('usersLat', lat);
        storeData('usersLon', lon);
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
    const loadData = async () => {
      const usersLat = Number(getData('usersLat'));
      const usersLon = Number(getData('usersLon'));
      const latKyiv = 50.4333;
      const lonKyiv = 30.5167;

      try {
        if (usersLat && usersLon) {
          const location = await fetchWeatherForecast(
            usersLat,
            usersLon,
            'metric',
          );
          console.log(location);
          setWeather(location);
        } else {
          const locationKyiv = await fetchWeatherForecast(
            latKyiv,
            lonKyiv,
            'metric',
          );
          console.log(locationKyiv);

          setWeather(locationKyiv);
          console.log(weather.list[0].rain['3h']);
          console.log(weather);
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
      className={'font-sfrprodisplay container flex-1 relative'}
      style={{ width: '100%', height: '100%' }}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['#08244F', '#134CB5', '#0B42AB']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {weather && !isLoading && !hasError && (
        <SafeAreaView className={'flex flex-1'}>
          <StyledView style={{ height: '7%' }} className={'mx-5 relative z-50'}>
            {/* <Pressable
              onPress={() => navigation?.navigate('Settings')}>
              <Text>London</Text>
            </Pressable> */}
            <StyledView
              className={'flex-row justify-between items-center mt-4'}
            >
              {showSearch ? (
                <StyledView
                  className={
                    'flex-row justify-end items-center w-full rounded-full bg-white'
                  }
                >
                  <StyledPressable
                    onPress={() => setShowSearch(!showSearch)}
                    className={'rounded-full p-3.5 mt-1 ml-2 mb-1'}
                  >
                    <Image
                      source={require('../../assets/icons/icon-back.png')}
                      style={{ width: 12, height: 12 }}
                    />
                  </StyledPressable>

                  <StyledTextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search a city"
                    placeholderTextColor={'lightgray'}
                    className={'pl-2 flex-1 text-lg text-black'}
                    style={{ height: 62 }}
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
                        style={{ fontFamily: 'SFPRODisplayRegular' }}
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
                    <StyledPressable className={'flex rounded-full p-3 m-1'}>
                      <Image
                        source={require('../../assets/icons/settings.png')}
                        style={{ width: 22, height: 22 }}
                      />
                    </StyledPressable>
                  </StyledView>
                </>
              )}

              {locations.length > 0 && showSearch ? (
                <StyledView className="absolute w-full bg-white top-16 rounded-3xl">
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

                        <Text className="text-black text-base ml-2">
                          {loc?.name}, {loc?.state}
                        </Text>
                      </StyledPressable>
                    );
                  })}
                </StyledView>
              ) : null}
            </StyledView>
          </StyledView>

          <StyledView className="mx-5 flex justify-around flex-1 mb-2">
            <StyledView className="flex-row justify-center">
              <Image
                // source={{uri: 'https:'+current?.condition?.icon}}
                source={require('../../assets/images/Sun.png')}
                className="w-32 h-32"
              />
            </StyledView>

            <StyledView className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {Math.round(weather.list[0].main.temp)}&#176;
              </Text>

              <Text className="text-center text-white text-lg tracking-widest">
                Sunny
                <br />
                Max.: {Math.round(weather.list[0].main.temp_max)}&#176; Min.:{' '}
                {Math.round(weather.list[0].main.temp_min)}&#176;
              </Text>
            </StyledView>

            <StyledView className="flex-row justify-between mx-5 px-4 h-12 bg-dark-blue/30 rounded-medium">
              <StyledView className="flex-row space-x-1.5 items-center">
                <Image
                  source={require('../../assets/icons/icon-rain.png')}
                  className="w-6 h-6"
                />
                <StyledText className="text-white text-sm">
                  {/* {Object.keys(weather.list[0].rain).length > 0  ? (
                    weather.list[0].rain['3h']
                  ) : (0)}% */}
                </StyledText>
              </StyledView>

              <StyledView className="flex-row space-x-1.5 items-center">
                <Image
                  source={require('../../assets/icons/icon-humidity.png')}
                  className="w-6 h-6"
                />
                <StyledText className="text-white text-sm">
                  {weather.list[0].main.humidity}%
                </StyledText>
              </StyledView>

              <StyledView className="flex-row space-x-1.5 items-center">
                <Image
                  source={require('../../assets/icons/icon-wind.png')}
                  className="w-6 h-6"
                />
                <StyledText className="text-white text-sm">19km/h</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          {/* <StyledView className="mb-2 space-y-3">
            <StyledView className="flex-row items-center mx-5 space-x-2">
              <Text className="text-white text-base">Daily forecast</Text>
            </StyledView>
            <ScrollView   
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item,index)=>{
                  const date = new Date(item.date);
                  const options = { weekday: 'long' };
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];

                  return (
                    <StyledView 
                      key={index} 
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" 
                      style={{backgroundColor: theme.bgWhite(0.15)}}
                    >
                      <Image 
                        // source={{uri: 'https:'+item?.day?.condition?.icon}}
                        source={weatherImages[item?.day?.condition?.text || 'other']}
                          className="w-11 h-11" />
                      <StyledText className="text-white">{dayName}</Text>
                      <StyledText className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </StyledText>
                    </StyledView>
                  )
                })
              }            
            </ScrollView>
          </StyledView> */}
        </SafeAreaView>
      )}
    </StyledView>
  );
};

/* const styles = StyleSheet.create({
  container: {
    fontFamily: 'SFPRODisplayRegular',
  },
}); */
