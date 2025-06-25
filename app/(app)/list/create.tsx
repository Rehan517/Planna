import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Pressable, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useListStore } from '../../../store/listStore'
import { useAuthStore } from '../../../store/authStore'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'

export default function CreateListScreen() {
  const [listName, setListName] = useState('')
  const [isShared, setIsShared] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { createList } = useListStore()
  const { user } = useAuthStore()
  
  const handleCreate = async () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name')
      return
    }
    
    setLoading(true)
    
    try {
      createList({
        groupId: '1',
        name: listName.trim(),
        shared: isShared,
        createdBy: user?.id || '1',
      })
      
      router.back()
      
      // Show success message
      Alert.alert(
        'List Created',
        `"${listName.trim()}" has been created as a ${isShared ? 'shared' : 'personal'} list.`
      )
    } catch (error) {
      Alert.alert('Error', 'Failed to create list. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleCancel = () => {
    router.back()
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
          <Text style={styles.title}>New List</Text>
          <Pressable 
            onPress={handleCreate} 
            style={[styles.headerButton, !listName.trim() && styles.disabledButton]}
            disabled={!listName.trim() || loading}
          >
            <Text style={[styles.headerButtonText, styles.createButton, !listName.trim() && styles.disabledText]}>
              Create
            </Text>
          </Pressable>
        </View>
        
        <View style={styles.content}>
          <View style={styles.section}>
            <Input
              placeholder="List name"
              value={listName}
              onChangeText={setListName}
              autoFocus
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>List Type</Text>
            
            <Pressable 
              style={styles.checkboxRow}
              onPress={() => setIsShared(!isShared)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, isShared && styles.checkboxChecked]}>
                  {isShared && (
                    <Ionicons name="checkmark" size={16} color={Colors.text.inverse} />
                  )}
                </View>
                <View style={styles.checkboxInfo}>
                  <Text style={styles.checkboxTitle}>Shared List</Text>
                  <Text style={styles.checkboxDescription}>
                    {isShared 
                      ? 'All group members can view and edit this list'
                      : 'Only you can view and edit this list'
                    }
                  </Text>
                </View>
              </View>
            </Pressable>
            
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons 
                  name={isShared ? "people-outline" : "person-outline"} 
                  size={20} 
                  color={isShared ? Colors.primary : Colors.text.secondary} 
                />
                <Text style={[styles.infoTitle, isShared && styles.infoTitleActive]}>
                  {isShared ? 'Shared List' : 'Personal List'}
                </Text>
              </View>
              <Text style={styles.infoDescription}>
                {isShared 
                  ? 'This list will appear in the "Shared Lists" section for all group members. Everyone can add, edit, and check off items.'
                  : 'This list will appear in your "Personal Lists" section. Only you can see and manage items in this list.'
                }
              </Text>
            </View>
          </View>
        </View>
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
  createButton: {
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
  content: {
    flex: 1,
    padding: Layout.padding.lg,
  },
  section: {
    marginBottom: Layout.padding.xl,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  checkboxRow: {
    marginBottom: Layout.padding.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.padding.md,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxInfo: {
    flex: 1,
  },
  checkboxTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  checkboxDescription: {
    ...Typography.caption,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.border,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.padding.sm,
  },
  infoTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginLeft: Layout.padding.sm,
    color: Colors.text.secondary,
  },
  infoTitleActive: {
    color: Colors.primary,
  },
  infoDescription: {
    ...Typography.caption,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
}) 