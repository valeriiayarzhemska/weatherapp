import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import cn from 'classnames';
import { getData, storeData } from '../../utils/asyncStorage';
import { getDateFromString } from '../../utils/helpers';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
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
// import { RootStackParamList } from '../../App';
// import { useNavigation } from '@react-navigation/native';
import { SettingsProps } from '../../types/Navigation';
import { StyledPressable, StyledView } from '../../screens/HomeScreen';

export const Header: React.FC<SettingsProps> = ({ navigation }) => {
 

  return (
    <StyledView
      className={
        'flex-row justify-end items-center w-full rounded-full bg-white'
      }
    >
      <StyledPressable
        className={'mt-1 ml-2 mb-1 p-3.5 rounded-full'}
        onPress={() =>
          navigation.push('Home')
        }
      >
        <Image
          source={require('../../assets/icons/icon-back.png')}
          style={{ width: 12, height: 12 }}
        />
      </StyledPressable>
    </StyledView>
  );
};
