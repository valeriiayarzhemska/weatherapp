import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { debounce } from 'lodash';
// import { getData, storeData } from '../utils/asyncStorage';

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
import { fetchWeatherForSearch } from '../../api/fetchWeather';
import { LinearGradient } from 'expo-linear-gradient';
// import { RootStackParamList } from '../../App';
// import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

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
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState({});
  const [locations, setLocations] = useState([1, 2, 3]);
  const [hasError, setHasError] = useState(false);
  const [fontsLoaded] = useFonts({
    SFPRODisplayRegular: require('../../assets/fonts/SFPRODisplayRegular.OTF'),
  });

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      fetchLocations({ cityName: search })
        .then((data) => {
          setLocations(data);
        })
    }
  }


  const handleLocation = (loc) => {
    /* setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForSearch({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc.name);
    }) */

    console.log(loc);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  useEffect(() => {
    console.log('loc');
  });

  /* useEffect(() => {
    const loadData = async () => {
      try {
        const nameLocation = await fetchWeatherForSearch(
          50.4333, 30.5167, 'metric');
        console.log(nameLocation);
        setLocation(nameLocation);
      } catch {
        setHasError(true);
      } finally {
        setHasError(false);
      }
    };

    loadData();
  }, []); */

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
      <SafeAreaView className={'flex flex-1'}>
        <StyledView style={{ height: '7%' }} className={'mx-5 relative z-50'}>
          {/* <Pressable
            onPress={() => navigation?.navigate('Settings')}>
            <Text>London</Text>
          </Pressable> */}
          <StyledView className={'flex-row justify-between items-center mt-4'}>
            {showSearch ? (
              <StyledView
                className={
                  'flex-row justify-end items-center w-full rounded-full bg-white'
                }
              >
                <StyledTextInput
                  placeholder="Search a city"
                  placeholderTextColor={'lightgray'}
                  className={'pl-6 pb-1 flex-1 text-lg text-black'}
                  style={{ height: 62 }}
                />

                <StyledPressable
                  onPress={() => setShowSearch(!showSearch)}
                  className={'rounded-full p-3.5 mt-1 mb-1 mr-2'}
                >
                  <Image
                    source={require('../../assets/icons/icon-search.png')}
                    style={{ width: 20, height: 20 }}
                  />
                </StyledPressable>
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
                      Kyiv
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

            {locations.length > 0 && showSearch && (
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
                      <Text className="text-black text-base ml-2">
                        Kyiv{/* {loc?.name}, {loc?.country} */}
                      </Text>
                    </StyledPressable>
                  );
                })}
              </StyledView>
            )}
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
              23&#176;
            </Text>

            <Text className="text-center text-white text-lg tracking-widest">
              Sunny
              <br />
              Max.: 23&#176; Min.: 20&#176;
            </Text>
          </StyledView>

          <StyledView className="flex-row justify-between mx-5 px-4 h-12 bg-dark-blue/30 rounded-medium">
            <StyledView className="flex-row space-x-1.5 items-center">
              <Image
                source={require('../../assets/icons/icon-rain.png')}
                className="w-6 h-6"
              />
              <StyledText className="text-white text-sm">6%</StyledText>
            </StyledView>

            <StyledView className="flex-row space-x-1.5 items-center">
              <Image
                source={require('../../assets/icons/icon-humidity.png')}
                className="w-6 h-6"
              />
              <StyledText className="text-white text-sm">90%</StyledText>
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
    </StyledView>
  );
};

/* const styles = StyleSheet.create({
  container: {
    fontFamily: 'SFPRODisplayRegular',
  },
}); */
