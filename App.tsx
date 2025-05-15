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

import AIVoiceAssistanceScreen from './src/screens/AIVoiceAssistanceScreen';
import VisitorAIVoiceAssistanceScreen from './src/screens/VisitorAIVoiceAssistanceScreen';

import PersonalInfoScreen from './src/screens/PersonalInfoScreen';
import VisitorPersonalInfoScreen from './src/screens/VisitorPersonalInfoScreen';

import ChoiceScreen from './src/screens/ChoiceScreen';
import VisitorChoiceScreen from './src/screens/VisitorChoiceScreen';
import LoginScreen from './src/screens/LoginScreen';
import VisitorLoginScreen from './src/screens/VisitorLoginScreen';

import QRConnectScreen from './src/screens/QRConnectScreen'; // 

import VisitorQRcode from './src/screens/VisitorQRcode';
import VisitorQRConnectScreen from './src/screens/VisitorQRConnectScreen';

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
        <Stack.Screen name="AIVoiceAssistance" component={AIVoiceAssistanceScreen} />
        <Stack.Screen name="VisitorAIVoiceAssistance" component={VisitorAIVoiceAssistanceScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="VisitorPersonalInfo" component={VisitorPersonalInfoScreen} />
        <Stack.Screen name="Choice" component={ChoiceScreen} />
        <Stack.Screen name="VisitorChoice" component={VisitorChoiceScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="VisitorLogin" component={VisitorLoginScreen} />
        <Stack.Screen name="QRConnectScreen" component={QRConnectScreen} />
        <Stack.Screen name="VisitorQRcode" component={VisitorQRcode} />
        <Stack.Screen name="VisitorQRConnectScreen" component={VisitorQRConnectScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
} 