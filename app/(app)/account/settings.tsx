import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useAuthStore } from '../../../store/authStore'
import { useGroupStore } from '../../../store/groupStore'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'

export default function AccountSettingsScreen() {
  const { user, updateUser } = useAuthStore()
  const { members, updateMember } = useGroupStore()
  const [name, setName] = useState(user?.name || '')
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '')
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '')
  const [selectedColor, setSelectedColor] = useState(user?.color || Colors.memberColors[0])
  const [loading, setLoading] = useState(false)
  
  const currentMember = members.find(m => m.userId === user?.id)
  
  useEffect(() => {
    if (currentMember?.color) {
      setSelectedColor(currentMember.color)
    }
  }, [currentMember])
  
  const handlePickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your photo library to set a profile picture.')
      return
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    
    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri)
    }
  }
  
  const handleRemoveImage = () => {
    Alert.alert(
      'Remove Profile Picture',
      'Are you sure you want to remove your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => setProfilePicture('') }
      ]
    )
  }
  
  const formatDateInput = (text: string) => {
    // Remove all non-numeric characters
    const numbers = text.replace(/\D/g, '')
    
    // Add slashes in MM/DD/YYYY format
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`
    }
  }
  
  const handleDateChange = (text: string) => {
    const formatted = formatDateInput(text)
    setDateOfBirth(formatted)
  }
  
  const convertDateToISO = (dateString: string) => {
    // Convert MM/DD/YYYY to YYYY-MM-DD
    const parts = dateString.split('/')
    if (parts.length === 3 && parts[2].length === 4) {
      const month = parts[0].padStart(2, '0')
      const day = parts[1].padStart(2, '0')
      const year = parts[2]
      return `${year}-${month}-${day}`
    }
    return ''
  }
  
  const convertDateFromISO = (isoString: string) => {
    // Convert YYYY-MM-DD to MM/DD/YYYY
    if (isoString && isoString.includes('-')) {
      const parts = isoString.split('-')
      if (parts.length === 3) {
        return `${parts[1]}/${parts[2]}/${parts[0]}`
      }
    }
    return isoString
  }
  
  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(convertDateFromISO(user.dateOfBirth))
    }
  }, [user?.dateOfBirth])
  
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name')
      return
    }
    
    // Validate date of birth if provided
    let isoDate = ''
    if (dateOfBirth.trim()) {
      isoDate = convertDateToISO(dateOfBirth)
      if (!isoDate) {
        Alert.alert('Error', 'Please enter a valid date of birth in MM/DD/YYYY format')
        return
      }
    }
    
    setLoading(true)
    
    try {
      // Update user in auth store
      await updateUser({
        name: name.trim(),
        dateOfBirth: isoDate || undefined,
        profilePicture: profilePicture || undefined,
        color: selectedColor,
      })
      
      // Update member color in group store
      if (currentMember) {
        updateMember(currentMember.id, {
          name: name.trim(),
          color: selectedColor,
        })
      }
      
      Alert.alert('Success', 'Your account has been updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      Alert.alert('Error', 'Failed to update account. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleCancel = () => {
    // Reset form to original values
    setName(user?.name || '')
    setDateOfBirth(user?.dateOfBirth ? convertDateFromISO(user.dateOfBirth) : '')
    setProfilePicture(user?.profilePicture || '')
    setSelectedColor(user?.color || Colors.memberColors[0])
    router.back()
  }
  
  const hasChanges = () => {
    const currentISODate = convertDateToISO(dateOfBirth) || undefined
    return (
      name.trim() !== user?.name ||
      currentISODate !== user?.dateOfBirth ||
      profilePicture !== (user?.profilePicture || '') ||
      selectedColor !== user?.color
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Pressable onPress={handleCancel} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>Account Settings</Text>
          <Pressable 
            onPress={handleSave} 
            style={[styles.headerButton, !hasChanges() && styles.disabledButton]}
            disabled={!hasChanges() || loading}
          >
            <Text style={[styles.headerButtonText, styles.saveButton, !hasChanges() && styles.disabledText]}>
              Save
            </Text>
          </Pressable>
        </View>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <View style={styles.profilePictureContainer}>
              <Pressable style={styles.profilePictureWrapper} onPress={handlePickImage}>
                {profilePicture ? (
                  <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                ) : (
                  <View style={[styles.profilePicturePlaceholder, { backgroundColor: selectedColor }]}>
                    <Text style={styles.profilePicturePlaceholderText}>
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </Text>
                  </View>
                )}
                <View style={styles.cameraIcon}>
                  <Text style={styles.cameraIconText}>📷</Text>
                </View>
              </Pressable>
              <View style={styles.profilePictureActions}>
                <Button
                  title="Choose Photo"
                  onPress={handlePickImage}
                  variant="secondary"
                />
                {profilePicture && (
                  <Button
                    title="Remove"
                    onPress={handleRemoveImage}
                    variant="text"
                  />
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            
            <View style={styles.emailContainer}>
              <Text style={styles.emailLabel}>Email Address</Text>
              <Text style={styles.emailValue}>{user?.email}</Text>
              <Text style={styles.emailNote}>Email cannot be changed</Text>
            </View>
            
            <Input
              placeholder="Date of Birth (MM/DD/YYYY)"
              value={dateOfBirth}
              onChangeText={handleDateChange}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Color</Text>
            <Text style={styles.sectionDescription}>
              Choose a color that represents you in the group
            </Text>
            
            <View style={styles.colorGrid}>
              {Colors.memberColors.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preview</Text>
            <View style={styles.previewCard}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.previewProfilePicture} />
              ) : (
                <View style={[styles.previewDot, { backgroundColor: selectedColor }]}>
                  <Text style={styles.previewInitial}>
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
              )}
              <View>
                <Text style={styles.previewName}>{name || 'Your Name'}</Text>
                <Text style={styles.previewEmail}>{user?.email}</Text>
                {dateOfBirth && (
                  <Text style={styles.previewDate}>Born: {dateOfBirth}</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
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
  headerButton: {
    paddingVertical: Layout.padding.sm,
    paddingHorizontal: Layout.padding.sm,
  },
  headerButtonText: {
    ...Typography.body,
    color: Colors.primary,
  },
  saveButton: {
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: Colors.text.disabled,
  },
  title: {
    ...Typography.heading,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.lg,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionDescription: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.lg,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: Layout.padding.md,
  },
  profilePictureWrapper: {
    position: 'relative',
    marginBottom: Layout.padding.md,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicturePlaceholderText: {
    color: Colors.text.inverse,
    fontSize: 36,
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  cameraIconText: {
    fontSize: 14,
  },
  profilePictureActions: {
    flexDirection: 'row',
    gap: Layout.padding.md,
    alignItems: 'center',
  },
  emailContainer: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.md,
    borderRadius: Layout.borderRadius.md,
    marginVertical: Layout.padding.sm,
  },
  emailLabel: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  emailValue: {
    ...Typography.body,
    fontWeight: '500',
    marginBottom: 4,
  },
  emailNote: {
    ...Typography.small,
    color: Colors.text.disabled,
    fontStyle: 'italic',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.padding.md,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.text.inverse,
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  previewProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.padding.md,
  },
  previewDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.padding.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewInitial: {
    color: Colors.text.inverse,
    fontSize: 20,
    fontWeight: 'bold',
  },
  previewName: {
    ...Typography.heading,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewEmail: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  previewDate: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
}) 