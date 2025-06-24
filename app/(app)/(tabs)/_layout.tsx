import React from 'react'
import { Tabs } from 'expo-router'
import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: Layout.tabBarHeight + insets.bottom,
            paddingBottom: insets.bottom,
          }
        ],
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <View style={[styles.icon, { backgroundColor: color }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => (
            <View style={[styles.icon, { backgroundColor: color }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <View style={[styles.icon, { backgroundColor: color }]} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    ...Typography.caption,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
}) 