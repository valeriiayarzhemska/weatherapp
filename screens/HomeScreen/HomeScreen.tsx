import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [location, setLocation] = useState({});
  const [hasError, setHasError] = useState(false);

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
    <StyledView className={'flex-1 relative'} style={{ width: '100%', height: '100%' }}>
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
          <StyledView className={'flex-row justify-between items-center'}>
            <StyledView>
              <StyledTouchableOpacity
                className={'flex-row items-center rounded-full p-3 m-1'}
              >
                <Image
                  source={ require('../../assets/icons/icon-geo.png') }
                  style={{ width: 25, height: 25 }}
                />

                <StyledText className={'ml-3 color-white'}>
                  Kyiv
                </StyledText>

                <Image
                  source={ require('../../assets/icons/icon-arrow.png') }
                  className={'ml-3'}
                  style={{ width: 30, height: 30 }}
                />
              </StyledTouchableOpacity>
            </StyledView>

            {/* <StyledView
              className={'flex-row justify-end items-center rounded-full'}
              style={{ backgroundColor: background.white(0.2) }}
            >
              <StyledTextInput
                placeholder='Search a city'
                placeholderTextColor={'lightgray'}
                className={'pl-6 h-10 pb-1 flex-1 text-base text-white'}
              />

              <StyledTouchableOpacity
                className={'rounded-full p-3 m-1'}
                style={{ backgroundColor: background.white(0.3) }}
              >
                <Image
                  source={ require('../../assets/icons/icon-search.png') }
                  style={{ width: 20, height: 20 }}
                />
              </StyledTouchableOpacity>
            </StyledView> */}

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
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
}); */
