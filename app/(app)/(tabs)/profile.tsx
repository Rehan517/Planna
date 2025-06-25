import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, Image } from 'react-native'
import { router } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useAuthStore } from '../../../store/authStore'
import { useGroupStore } from '../../../store/groupStore'
import { Button } from '../../../components/common/Button'

export default function ProfileScreen() {
  const { user, logout } = useAuthStore()
  const { currentGroup, members, createGroupCode, joinGroup, leaveGroup } = useGroupStore()
  const currentMember = members.find(m => m.userId === user?.id)
  
  const handleLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }
  
  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  
  const handleCreateGroupCode = () => {
    Alert.alert(
      'Create Group',
      'This will create a new group with a unique code. Once created, others can join using this code.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Create Group', 
          onPress: () => {
            const newCode = generateRandomCode()
            createGroupCode(newCode)
            Alert.alert('Group Created', `Your group code is: ${newCode}\n\nShare this code with others to invite them to your group.`)
          }
        }
      ]
    )
  }
  
  const handleJoinGroup = () => {
    Alert.prompt(
      'Join Group',
      'Enter the group code to join an existing group:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Join', 
          onPress: (code) => {
            if (code?.trim()) {
              const upperCode = code.trim().toUpperCase()
              // Here you would validate the code with the backend
              // For now, we'll simulate a successful join
              joinGroup(upperCode)
              Alert.alert('Joined Group', `Successfully joined group with code: ${upperCode}`)
            } else {
              Alert.alert('Invalid Code', 'Please enter a valid group code.')
            }
          }
        }
      ],
      'plain-text',
      '',
      'default'
    )
  }
  
  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      `Are you sure you want to leave "${currentGroup?.name}"? You'll need a group code to rejoin.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Leave Group', 
          style: 'destructive',
          onPress: () => {
            leaveGroup()
            Alert.alert('Left Group', 'You have successfully left the group.')
          }
        }
      ]
    )
  }
  
  const settingsOptions = [
    { id: 'notifications', title: 'Notifications', subtitle: 'Event reminders and updates' },
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
          <Pressable 
            style={styles.profileCard}
            onPress={() => router.push('/(app)/account/settings')}
          >
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
            ) : (
              <View style={[styles.colorDot, { backgroundColor: currentMember?.color || Colors.primary }]} />
            )}
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>
        
        {/* Group Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group</Text>
          {currentGroup ? (
            <View style={styles.groupCard}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{currentGroup.name}</Text>
                <Text style={styles.memberCount}>{members.length} member{members.length !== 1 ? 's' : ''}</Text>
              </View>
              
              <View style={styles.groupCodeContainer}>
                <Text style={styles.groupCode}>Group Code: {currentGroup.code}</Text>
                <Text style={styles.groupCodeNote}>Share this code to invite others</Text>
              </View>
              
              <View style={styles.groupActions}>
                <Button
                  title="Leave Group"
                  onPress={handleLeaveGroup}
                  variant="secondary"
                />
              </View>
            </View>
          ) : (
            <View style={styles.noGroupCard}>
              <Text style={styles.noGroupText}>You're not in a group yet</Text>
              <Text style={styles.noGroupSubtext}>Create a new group or join an existing one</Text>
              
              <View style={styles.groupOptionsContainer}>
                <Button
                  title="Create Group"
                  onPress={handleCreateGroupCode}
                  variant="primary"
                />
                <Button
                  title="Join Group"
                  onPress={handleJoinGroup}
                  variant="secondary"
                />
              </View>
            </View>
          )}
        </View>
        
        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option) => (
            <Pressable 
              key={option.id} 
              style={styles.settingItem}
              onPress={() => {
                if (option.id === 'notifications') {
                  router.push('/(app)/settings/notifications')
                }
                // Add other settings navigation here if needed
              }}
            >
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
  profilePicture: {
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
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.padding.md,
  },
  groupName: {
    ...Typography.heading,
    fontWeight: '600',
    flex: 1,
  },
  memberCount: {
    ...Typography.caption,
    color: Colors.text.secondary,
    backgroundColor: Colors.border,
    paddingHorizontal: Layout.padding.sm,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.sm,
  },
  groupCodeContainer: {
    backgroundColor: Colors.background,
    padding: Layout.padding.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.padding.md,
  },
  groupCode: {
    ...Typography.body,
    fontWeight: '500',
    marginBottom: 4,
  },
  groupCodeNote: {
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
  noGroupCard: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
  },
  noGroupText: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.sm,
  },
  noGroupSubtext: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  groupOptionsContainer: {
    flexDirection: 'column',
    gap: Layout.padding.sm,
    marginTop: Layout.padding.lg,
    width: '100%',
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Layout.padding.md,
  },
}) 