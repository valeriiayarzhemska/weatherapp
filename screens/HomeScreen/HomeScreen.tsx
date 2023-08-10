import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { fetchWeatherForecast } from './api/fetchWeather';
import { LinearGradient } from 'expo-linear-gradient';
// import { RootStackParamList } from '../../App';
// import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { background } from '../../constants/constants';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
  const [locations, setLocations] = useState([1, 2, 3]);
  const [hasError, setHasError] = useState(false);
  const [fontsLoaded] = useFonts({
    'SFPRODisplayRegular': require('../../assets/fonts/SFPRODisplayRegular.OTF'),
  });

  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data=>{
      setLoading(false);
      setWeather(data);
      storeData('city',loc.name);
    })
  };

  /* useEffect(() => {
    const loadData = async () => {
      try {
        const nameLocation = await fetchWeatherForecast(
          33.44, -94.04, 'metric');
        console.log(nameLocation);
        setLocation(nameLocation);
      } catch {
        setHasError(true);
      } finally {
        setHasError(false);
      }
    };

    loadData();
  }, [location]); */

  return (
    <StyledView className={'font-sfrprodisplay container flex-1 relative'} style={{ width: '100%', height: '100%' }}>
      <StatusBar style='light' />
      <LinearGradient
        colors={['#08244F', '#134CB5', '#0B42AB']}
        start={[0, 0]}
        end={[1, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <SafeAreaView className={'flex flex-1'}>  
        <StyledView style={{ height: '7%' }} className={'mx-4 relative z-50'}>
          {/* <TouchableOpacity
            onPress={() => navigation?.navigate('Settings')}>
            <Text>London</Text>
          </TouchableOpacity> */}
          <StyledView className={'flex-row justify-between items-center mt-4'}>
            {showSearch ? (
              <StyledView
                className={'flex-row justify-end items-center rounded-full'}
                style={{ backgroundColor: background.white(0.2) }}
              >
                <StyledTextInput
                  placeholder='Search a city'
                  placeholderTextColor={'lightgray'}
                  className={'pl-6 pb-1 flex-1 text-lg text-white'}
                  style={{ height: 62 }}
                />

                <StyledTouchableOpacity
                  onPress={()=> setShowSearch(!showSearch)} 
                  className={'rounded-full p-3.5 mt-1 mb-1 mr-2'}
                  style={{ backgroundColor: background.white(0.3) }}
                >
                  <Image
                    source={ require('../../assets/icons/icon-search.png') }
                    style={{ width: 20, height: 20 }}
                  />
                </StyledTouchableOpacity>
              </StyledView>
            ) : (
              <StyledView>
                <StyledTouchableOpacity
                  onPress={()=> setShowSearch(!showSearch)} 
                  className={'flex-row items-center rounded-full p-3 m-1'}
                >
                  <Image
                    source={ require('../../assets/icons/icon-geo.png') }
                    style={{ width: 25, height: 25 }}
                  />

                  <StyledText className={'ml-3 text-lg font-bold color-white'} style={{ fontFamily: 'SFPRODisplayRegular' }}>
                    Kyiv
                  </StyledText>

                  <Image
                    source={ require('../../assets/icons/icon-arrow.png') }
                    className={'ml-3'}
                    style={{ width: 30, height: 30 }}
                  />
                </StyledTouchableOpacity>
              </StyledView>
            )}

            {locations.length > 0 && showSearch && (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                  {locations.map((loc, index)=>{
                      let showBorder = index+1 != locations.length;
                      let borderClass = showBorder? ' border-b-2 border-b-gray-400':'';
                      return (
                        <TouchableOpacity 
                          key={index}
                          onPress={()=> handleLocation(loc)} 
                          className={"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}>
                            <MapPinIcon size="20" color="gray" />
                            <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            }

            <StyledView>
              <StyledTouchableOpacity
                className={'flex rounded-full p-3 m-1'}
              >
                <Image
                  source={ require('../../assets/icons/settings.png') }
                  style={{ width: 22, height: 22 }}
                />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </SafeAreaView>
    </StyledView>
  );
};

/* const styles = StyleSheet.create({
  container: {
    fontFamily: 'SFPRODisplayRegular',
  },
}); */
