import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useListStore } from '../../../store/listStore'
import { useAuthStore } from '../../../store/authStore'

export default function ListsScreen() {
  const { lists, items, deleteList } = useListStore()
  const { user } = useAuthStore()
  
  // Filter lists by type
  const personalLists = lists.filter(list => !list.shared && list.createdBy === user?.id)
  const sharedLists = lists.filter(list => list.shared)
  
  const handleCreateList = () => {
    router.push('/list/create')
  }
  
  const handleDeleteList = (listId: string, listName: string) => {
    const itemCount = getItemCount(listId)
    const itemText = itemCount === 1 ? 'item' : 'items'
    
    Alert.alert(
      'Delete List',
      `Are you sure you want to delete "${listName}"?${itemCount > 0 ? `\n\nThis will also delete ${itemCount} ${itemText}.` : ''}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteList(listId)
        }
      ]
    )
  }
  
  const navigateToList = (listId: string, listName: string) => {
    router.push({
      pathname: '/list/[id]',
      params: { id: listId, name: listName }
    })
  }
  
  const getItemCount = (listId: string) => {
    return items.filter(item => item.listId === listId).length
  }
  
  const renderListCard = (list: any) => (
    <Pressable
      key={list.id}
      style={({ pressed }) => [
        styles.listCard,
        pressed && styles.listCardPressed
      ]}
      onPress={() => navigateToList(list.id, list.name)}
      onLongPress={() => handleDeleteList(list.id, list.name)}
    >
      <View style={styles.listIcon}>
        <Ionicons 
          name={list.shared ? "people-outline" : "person-outline"} 
          size={24} 
          color={list.shared ? Colors.primary : Colors.text.secondary} 
        />
      </View>
      
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{list.name}</Text>
        <Text style={styles.listSubtitle}>
          {getItemCount(list.id)} items
          {list.shared && <Text style={styles.sharedIndicator}> • Shared</Text>}
        </Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color={Colors.text.disabled} />
    </Pressable>
  )
  
  const renderEmptySection = (sectionType: 'personal' | 'shared') => (
    <View style={styles.emptySectionState}>
      <Ionicons 
        name={sectionType === 'personal' ? "person-outline" : "people-outline"} 
        size={48} 
        color={Colors.text.disabled} 
      />
      <Text style={styles.emptySectionTitle}>
        No {sectionType === 'personal' ? 'Personal' : 'Shared'} Lists
      </Text>
      <Text style={styles.emptySectionSubtitle}>
        {sectionType === 'personal' 
          ? 'Create a personal list that only you can see'
          : 'Create a shared list that all group members can access'
        }
      </Text>
    </View>
  )
  
  const hasAnyLists = personalLists.length > 0 || sharedLists.length > 0
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lists</Text>
        <Pressable style={styles.addButton} onPress={handleCreateList}>
          <Ionicons name="add" size={24} color={Colors.text.inverse} />
        </Pressable>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!hasAnyLists ? (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color={Colors.text.disabled} />
            <Text style={styles.emptyTitle}>No Lists Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to create your first list
            </Text>
          </View>
        ) : (
          <>
            {/* Personal Lists Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={20} color={Colors.text.secondary} />
                <Text style={styles.sectionTitle}>Personal Lists</Text>
                <Text style={styles.sectionCount}>({personalLists.length})</Text>
              </View>
              
              {personalLists.length > 0 ? (
                <View style={styles.sectionContent}>
                  {personalLists.map(renderListCard)}
                </View>
              ) : (
                renderEmptySection('personal')
              )}
            </View>
            
            {/* Shared Lists Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people-outline" size={20} color={Colors.text.secondary} />
                <Text style={styles.sectionTitle}>Shared Lists</Text>
                <Text style={styles.sectionCount}>({sharedLists.length})</Text>
              </View>
              
              {sharedLists.length > 0 ? (
                <View style={styles.sectionContent}>
                  {sharedLists.map(renderListCard)}
                </View>
              ) : (
                renderEmptySection('shared')
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.padding.md,
  },
  sectionTitle: {
    ...Typography.heading,
    fontWeight: '600',
    marginLeft: Layout.padding.sm,
    flex: 1,
  },
  sectionCount: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  sectionContent: {
    gap: Layout.padding.md,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listCardPressed: {
    backgroundColor: Colors.surfacePressed,
  },
  listIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.padding.md,
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  listSubtitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  sharedIndicator: {
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.padding.xl * 4,
    paddingHorizontal: Layout.padding.lg,
  },
  emptyTitle: {
    ...Typography.heading,
    marginTop: Layout.padding.lg,
    marginBottom: Layout.padding.sm,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  emptySectionState: {
    alignItems: 'center',
    paddingVertical: Layout.padding.xl * 2,
    paddingHorizontal: Layout.padding.lg,
  },
  emptySectionTitle: {
    ...Typography.body,
    fontWeight: '500',
    marginTop: Layout.padding.md,
    marginBottom: Layout.padding.sm,
    color: Colors.text.secondary,
  },
  emptySectionSubtitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
}) 