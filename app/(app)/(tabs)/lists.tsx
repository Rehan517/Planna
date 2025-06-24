import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useListStore } from '../../../store/listStore'

export default function ListsScreen() {
  const { lists, createList, items, deleteList } = useListStore()
  
  const handleCreateList = () => {
    Alert.prompt(
      'New List',
      'Enter list name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Create', 
          onPress: (listName) => {
            if (listName?.trim()) {
              createList({
                groupId: '1',
                name: listName.trim(),
              })
            }
          }
        }
      ],
      'plain-text',
      '',
      'default'
    )
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
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lists</Text>
        <Pressable style={styles.addButton} onPress={handleCreateList}>
          <Ionicons name="add" size={24} color={Colors.text.inverse} />
        </Pressable>
      </View>
      
      <ScrollView style={styles.listsContainer} showsVerticalScrollIndicator={false}>
        {lists.length > 0 ? (
          lists.map((list) => (
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
                <Ionicons name="list-outline" size={24} color={Colors.primary} />
              </View>
              
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{list.name}</Text>
                <Text style={styles.listSubtitle}>
                  {getItemCount(list.id)} items
                </Text>
              </View>
              
              <Ionicons name="chevron-forward" size={20} color={Colors.text.disabled} />
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color={Colors.text.disabled} />
            <Text style={styles.emptyTitle}>No Lists Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to create your first list
            </Text>
          </View>
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
  listsContainer: {
    flex: 1,
    padding: Layout.padding.lg,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.padding.md,
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.padding.xl * 4,
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
}) 