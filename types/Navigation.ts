
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/* type ProfileScreenNavigationProp = Props['navigation'];

type ProfileScreenRouteProp = Props['route']; */

