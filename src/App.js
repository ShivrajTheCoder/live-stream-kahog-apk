import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import AppNavigation from './AppNavigation';
import {
  ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import { ThemeProvider } from './contexts/ThemeProvider';
import { AuthProvider } from './contexts/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer >
          <AppNavigation />
          <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
