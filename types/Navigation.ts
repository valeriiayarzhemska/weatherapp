
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RadioButtonsProps } from './Settings';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  Home: undefined;
  Settings: RadioButtonsProps;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/* type ProfileScreenNavigationProp = Props['navigation'];

type ProfileScreenRouteProp = Props['route']; */

