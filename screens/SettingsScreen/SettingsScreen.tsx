import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, ScrollView } from 'react-native';
import { RadioButton, RadioButtonProps } from 'react-native-radio-buttons-group';
import cn from 'classnames';

import { SettingsProps } from '../../types/Navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { timeCheck } from '../../constants/constants';
import { StyledPressable, StyledText, StyledView } from '../HomeScreen';
import { storeData } from '../../utils/asyncStorage';

export const SettingsScreen: React.FC<SettingsProps> = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Fahrenheit',
        value: 'imperial',
      },
      {
        id: '2',
        label: 'Celsius',
        value: 'metric',
      },
      {
        id: '3',
        label: 'Kelvin',
        value: 'standart',
      },
    ],
    [],
  );

  const handleSelection = (id: string, value: string) => {
    setSelectedId(id);
    storeData('usersUnits', value);
  }

  return (
    <StyledView
      className={'flex-1 relative'}
      style={{ width: '100%', height: '100%' }}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={
          timeCheck
            ? ['#08244F', '#134CB5', '#0B42AB']
            : ['#29B2DD', '#33AADD', '#2DC8EA']
        }
        start={[0, 0]}
        end={[1, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <SafeAreaView className={'flex flex-1'}>
        <ScrollView>
          <StyledView className={'mx-5 relative z-50'}>
            <StyledView
              className={'flex-row justify-between items-center mt-4'}
            >
              <StyledPressable
                onPress={() => navigation.push('Home')}
                className={'mt-1 ml-2 mb-1 p-3.5 rounded-full'}
              >
                <Image
                  source={require('../../assets/icons/icon-back-white.png')}
                  className={'ml-3'}
                  style={{ width: 15, height: 15 }}
                />
              </StyledPressable>
            </StyledView>

            <StyledView
              className={cn(
                'flex-column items-start mx-5 px-4 rounded-medium',
                { 'bg-light-blue/30': !timeCheck },
                { 'bg-dark-blue/30': timeCheck },
              )}
            >
              <StyledText className={'font-bold text-xl text-white'}>
                Units
              </StyledText>

              {radioButtons.map((button) => (
                <RadioButton
                  {...button}
                  onPress={() => handleSelection(button.id, button.value)}
                  key={button.id}
                  selected={button.id === selectedId}
                />
              ))}
            </StyledView>
          </StyledView>
        </ScrollView>
      </SafeAreaView>
    </StyledView>
  );
};
