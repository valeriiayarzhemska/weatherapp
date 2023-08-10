import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

export const SettingsScreen: React.FC = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <SafeAreaView>
        <Text>ooooo</Text>
      </SafeAreaView>
    </View>
  );
};
