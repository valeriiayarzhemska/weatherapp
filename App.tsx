import React, { useState } from 'react';
import { withExpoSnack } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen/index';
import { SettingsScreen } from './screens/SettingsScreen/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/Navigation';

/* const Home = () => {
  return <HomeScreen />;
};

const Settings = () => {
  return <SettingsScreen />;
}; */

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  //const [selectedId, setSelectedId] = useState<string | undefined>('2');
  // console.log(setSelectedId);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Settings'>
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
          // initialParams={{ selectedId: selectedId, setSelectedId: setSelectedId }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default withExpoSnack(App);
