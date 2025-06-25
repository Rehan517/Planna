import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Switch,
  Pressable,
  Alert
} from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'

const NOTIFICATIONS_KEY = '@planna_notifications_enabled'

export default function NotificationsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadNotificationSettings()
  }, [])
  
  const loadNotificationSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(NOTIFICATIONS_KEY)
      if (saved !== null) {
        setNotificationsEnabled(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading notification settings:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const saveNotificationSettings = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(enabled))
    } catch (error) {
      console.error('Error saving notification settings:', error)
      Alert.alert('Error', 'Failed to save notification settings')
    }
  }
  
  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value)
    await saveNotificationSettings(value)
    
    if (value) {
      // Here you would request notification permissions
      // For now, we'll just show a success message
      console.log('Notifications enabled')
    } else {
      console.log('Notifications disabled')
    }
  }
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive reminders for upcoming events and updates from your group
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ 
                false: Colors.border, 
                true: Colors.primary 
              }}
              thumbColor={Colors.background}
              ios_backgroundColor={Colors.border}
            />
          </View>
          
          {notificationsEnabled && (
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationInfoTitle}>You'll receive notifications for:</Text>
              <View style={styles.notificationList}>
                <Text style={styles.notificationItem}>• Upcoming events (15 minutes before)</Text>
                <Text style={styles.notificationItem}>• New events added to your group</Text>
                <Text style={styles.notificationItem}>• When someone adds you to an event</Text>
                <Text style={styles.notificationItem}>• Important group updates</Text>
              </View>
            </View>
          )}
          
          {!notificationsEnabled && (
            <View style={styles.disabledInfo}>
              <Text style={styles.disabledInfoText}>
                Notifications are disabled. You won't receive reminders or updates about events and group activities.
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerNote}>
            You can change this setting at any time. Some system notifications may still appear regardless of this setting.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    paddingVertical: Layout.padding.sm,
    paddingRight: Layout.padding.sm,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontSize: 18,
  },
  title: {
    ...Typography.heading,
    fontWeight: '600',
  },
  placeholder: {
    width: 50, // Same width as back button for centering
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.lg,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: Layout.padding.md,
    paddingHorizontal: Layout.padding.lg,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
  },
  settingInfo: {
    flex: 1,
    marginRight: Layout.padding.lg,
  },
  settingTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    ...Typography.caption,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  notificationInfo: {
    marginTop: Layout.padding.lg,
    padding: Layout.padding.lg,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationInfoTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Layout.padding.md,
  },
  notificationList: {
    gap: Layout.padding.sm,
  },
  notificationItem: {
    ...Typography.caption,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  disabledInfo: {
    marginTop: Layout.padding.lg,
    padding: Layout.padding.lg,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.text.disabled,
  },
  disabledInfoText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.xl,
  },
  footerNote: {
    ...Typography.small,
    color: Colors.text.disabled,
    textAlign: 'center',
    lineHeight: 16,
  },
}) 