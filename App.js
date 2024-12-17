import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import UploadScreen from './screens/UploadScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import DietScreen from './screens/DietScreen';
import BeginnerScreen from './screens/BeginnerScreen';
import IntermediateScreen from './screens/IntermediateScreen';
import AdvanceScreen from './screens/AdvanceScreen';
import DetailScreen from './screens/DetailScreen';
import RatingScreen from './screens/RatingScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VideoScreen from './screens/VideoScreen'; // Import VideoScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        
        {/* Authentication Screens */}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        
        {/* Dashboard and Features */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="BeginnerScreen" component={BeginnerScreen} />
        <Stack.Screen name="IntermediateScreen" component={IntermediateScreen} />
        <Stack.Screen name="AdvanceScreen" component={AdvanceScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        
        {/* New VideoScreen */}
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
