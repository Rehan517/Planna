import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'
import { useListStore } from '../../../store/listStore'

export default function ListDetailScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>()
  const { items, addItem, toggleItem, deleteItem } = useListStore()
  const [newItem, setNewItem] = useState('')
  
  // Filter items for this specific list
  const listItems = items.filter(item => item.listId === id)
  
  const handleAddItem = () => {
    if (newItem.trim() && id) {
      addItem({
        listId: id,
        text: newItem.trim(),
        completed: false,
        createdBy: '1', // This should come from auth store
      })
      setNewItem('')
    }
  }
  
  const handleToggleItem = (itemId: string) => {
    toggleItem(itemId)
  }
  
  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.addSection}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Add item..."
            value={newItem}
            onChangeText={setNewItem}
          />
        </View>
        <Button title="Add" onPress={handleAddItem} />
      </View>
      
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {listItems.length > 0 ? (
          <>
            {/* Active items */}
            {listItems.filter(item => !item.completed).map((item) => (
              <Pressable
                key={item.id}
                style={styles.listItem}
                onPress={() => handleToggleItem(item.id)}
              >
                <View style={styles.checkbox} />
                <Text style={styles.itemText}>{item.text}</Text>
                <Pressable 
                  onPress={() => handleDeleteItem(item.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="close" size={18} color={Colors.text.disabled} />
                </Pressable>
              </Pressable>
            ))}
            
            {/* Completed items */}
            {listItems.filter(item => item.completed).length > 0 && (
              <>
                <View style={styles.sectionSeparator}>
                  <Text style={styles.sectionTitle}>Completed</Text>
                </View>
                {listItems.filter(item => item.completed).map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.listItem}
                    onPress={() => handleToggleItem(item.id)}
                  >
                    <View style={[styles.checkbox, styles.checkedBox]}>
                      <Ionicons name="checkmark" size={16} color={Colors.text.inverse} />
                    </View>
                    <Text style={[styles.itemText, styles.completedText]}>
                      {item.text}
                    </Text>
                    <Pressable 
                      onPress={() => handleDeleteItem(item.id)}
                      style={styles.deleteButton}
                    >
                      <Ionicons name="close" size={18} color={Colors.text.disabled} />
                    </Pressable>
                  </Pressable>
                ))}
              </>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color={Colors.text.disabled} />
            <Text style={styles.emptyTitle}>No Items Yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first item to get started
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
    alignItems: 'center',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    marginRight: Layout.padding.md,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  addSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.padding.lg,
    gap: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  inputContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Layout.borderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Layout.padding.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  itemText: {
    ...Typography.body,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.text.secondary,
  },
  deleteButton: {
    padding: 4,
  },
  sectionSeparator: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    backgroundColor: Colors.surface,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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