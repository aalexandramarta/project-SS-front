import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
import SignupScreen from './src/screens/SignupScreen';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 