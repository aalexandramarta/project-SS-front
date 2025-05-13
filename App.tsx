import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
import SignupScreen from './src/screens/SignupScreen';
import MenuScreen from './src/screens/MenuScreen';

import VisitorSignupScreen from './src/screens/VisitorSignupScreen';
import VisitorMenuScreen from './src/screens/VisitorMenuScreen';

import MapsScreen from './src/screens/MapsScreen';
import VisitorMapsScreen from './src/screens/VisitorMapsScreen';

import HealthScreen from './src/screens/HealthScreen';
import VisitorHealthScreen from './src/screens/VisitorHealthScreen';

import AIChatScreen from './src/screens/AIChatScreen';
import VisitorAIChatScreen from './src/screens/VisitorAIChatScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="VisitorSignup" component={VisitorSignupScreen} />
        <Stack.Screen name="VisitorMenu" component={VisitorMenuScreen} />
      <Stack.Screen name="Maps" component={MapsScreen} />
      <Stack.Screen name="VisitorMaps" component={VisitorMapsScreen} />
      <Stack.Screen name="Health" component={HealthScreen} />
      <Stack.Screen name="VisitorHealth" component={VisitorHealthScreen} />
      <Stack.Screen name="AIChatScreen" component={AIChatScreen} />
      <Stack.Screen name="VisitorAIChatScreen" component={VisitorAIChatScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
} 