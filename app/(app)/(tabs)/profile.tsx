import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useAuthStore } from '../../../store/authStore'
import { useGroupStore } from '../../../store/groupStore'
import { Button } from '../../../components/common/Button'

export default function ProfileScreen() {
  const { user, logout } = useAuthStore()
  const { currentGroup, members } = useGroupStore()
  const currentMember = members.find(m => m.userId === user?.id)
  
  const handleLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }
  
  const settingsOptions = [
    { id: 'notifications', title: 'Notifications', subtitle: 'Event reminders and updates' },
    { id: 'privacy', title: 'Privacy', subtitle: 'Data and sharing preferences' },
    { id: 'about', title: 'About Planna', subtitle: 'Version 1.0.0' },
  ]
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Account</Text>
          <View style={styles.profileCard}>
            <View style={[styles.colorDot, { backgroundColor: currentMember?.color || Colors.primary }]} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>
        </View>
        
        {/* Group Information */}
        {currentGroup && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Group</Text>
            <View style={styles.groupCard}>
              <Text style={styles.groupName}>{currentGroup.name}</Text>
              <Text style={styles.groupCode}>Group Code: {currentGroup.code}</Text>
              <Text style={styles.memberCount}>{members.length} member{members.length !== 1 ? 's' : ''}</Text>
            </View>
          </View>
        )}
        
        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option) => (
            <Pressable key={option.id} style={styles.settingItem}>
              <View>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
        
        {/* Sign Out */}
        <View style={styles.section}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="secondary"
          />
        </View>
        
        {/* App Tagline */}
        <View style={styles.footer}>
          <Text style={styles.tagline}>
            The calendar app that doesn't try to do everything.
          </Text>
          <Text style={styles.version}>Planna v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.lg,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  colorDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.padding.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...Typography.heading,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    ...Typography.body,
    color: Colors.text.secondary,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  groupName: {
    ...Typography.heading,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupCode: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  memberCount: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingTitle: {
    ...Typography.body,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  chevron: {
    ...Typography.title,
    color: Colors.text.disabled,
    fontWeight: '300',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Layout.padding.xl,
    paddingHorizontal: Layout.padding.lg,
  },
  tagline: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: Layout.padding.sm,
  },
  version: {
    ...Typography.small,
    color: Colors.text.disabled,
  },
}) 