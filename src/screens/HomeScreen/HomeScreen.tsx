import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
// import { fetchWeatherForecast } from './api/fetchWeather';
// import { LinearGradient } from 'expo-linear-gradient';
// import { RootStackParamList } from '../../App';
// import { useNavigation } from '@react-navigation/native';

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
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <SafeAreaView>
        <View style={{ height: '7%' }} className="mx-4 relative z-50 border-2 border-rose-600">
          {/* <TouchableOpacity
            onPress={() => navigation?.navigate('Settings')}>
            <Text>London</Text>
          </TouchableOpacity> */}
          <Text>London</Text>
        </View>
      </SafeAreaView>
    </View>
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
