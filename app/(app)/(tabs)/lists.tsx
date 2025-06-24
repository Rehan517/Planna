import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input'

export default function ListsScreen() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([
    { id: '1', text: 'Milk', completed: false },
    { id: '2', text: 'Bread', completed: true },
    { id: '3', text: 'Eggs', completed: false },
  ])
  
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now().toString(),
        text: newItem.trim(),
        completed: false
      }])
      setNewItem('')
    }
  }
  
  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grocery List</Text>
      </View>
      
      <View style={styles.addSection}>
        <Input
          placeholder="Add item..."
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      
      <ScrollView style={styles.listContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={styles.listItem}
            onPress={() => toggleItem(item.id)}
          >
            <View style={[
              styles.checkbox,
              item.completed && styles.checkedBox
            ]} />
            <Text style={[
              styles.itemText,
              item.completed && styles.completedText
            ]}>
              {item.text}
            </Text>
          </Pressable>
        ))}
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
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
  },
  addSection: {
    padding: Layout.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
}) 