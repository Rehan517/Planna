import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useAuthStore } from '../store/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { user, isAuthenticated } = useAuthStore()
  
  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user')
      if (userJson) {
        const user = JSON.parse(userJson)
        useAuthStore.setState({ user, isAuthenticated: true })
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      // Hide splash screen
      await SplashScreen.hideAsync()
    }
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  )
} 