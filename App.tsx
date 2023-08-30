import React from 'react';
import { withExpoSnack } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen/index';
import { SettingsScreen } from './screens/SettingsScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/Navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Home'>
        <RootStack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default withExpoSnack(App);
