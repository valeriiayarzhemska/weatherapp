import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { SettingsProps } from '../../types/Navigation';
import { StyledPressable, StyledView } from '../HomeScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { timeCheck } from '../../constants/constants';

export const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
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

      <StyledView>
        <StyledPressable onPress={() => navigation.push('Home')}>
          <Image
            source={require('../../assets/icons/icon-arrow.png')}
            className={'ml-3'}
            style={{ width: 30, height: 30 }}
          />
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
};
