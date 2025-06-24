import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '../store/authStore'

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />
  }
  
  return <Redirect href="/(auth)/login" />
} 