import { create } from 'zustand'
import { List, ListItem } from '../types'
import { mockLists, mockListItems } from '../utils/mockData'

interface ListStore {
  lists: List[]
  items: ListItem[]
  createList: (list: Omit<List, 'id' | 'createdAt'>) => void
  deleteList: (listId: string) => void
  addItem: (item: Omit<ListItem, 'id' | 'createdAt'>) => void
  toggleItem: (itemId: string) => void
  deleteItem: (itemId: string) => void
}

export const useListStore = create<ListStore>((set) => ({
  lists: mockLists,
  items: mockListItems,
  
  createList: (list) => set((state) => ({
    lists: [...state.lists, {
      ...list,
      id: Date.now().toString(),
      createdAt: new Date(),
    }]
  })),
  
  deleteList: (listId) => set((state) => ({
    lists: state.lists.filter(l => l.id !== listId),
    items: state.items.filter(i => i.listId !== listId),
  })),
  
  addItem: (item) => set((state) => ({
    items: [...state.items, {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    }]
  })),
  
  toggleItem: (itemId) => set((state) => ({
    items: state.items.map(item =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completedAt: item.completed ? undefined : new Date(),
          }
        : item
    )
  })),
  
  deleteItem: (itemId) => set((state) => ({
    items: state.items.filter(i => i.id !== itemId),
  })),
})) 