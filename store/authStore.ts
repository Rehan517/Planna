import { create } from 'zustand'
import { User } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Mock login - replace with Supabase later
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      color: '#FF6B6B',
    }
    await AsyncStorage.setItem('user', JSON.stringify(mockUser))
    set({ user: mockUser, isAuthenticated: true })
  },
  
  register: async (email: string, password: string, name: string) => {
    // Mock register
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      color: '#FF6B6B',
    }
    await AsyncStorage.setItem('user', JSON.stringify(mockUser))
    set({ user: mockUser, isAuthenticated: true })
  },
  
  updateUser: async (updates: Partial<User>) => {
    const currentUser = get().user
    if (!currentUser) return
    
    const updatedUser = { ...currentUser, ...updates }
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser))
    set({ user: updatedUser })
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
})) 