# Planna Frontend Execution Plan for AI Development

## Project Overview
Build a minimalist calendar and list sharing app using Expo, React Native, and TypeScript. The app should have a clean, modern design with only essential features.

## Step 1: Initialize Expo Project
```bash
npx create-expo-app planna --template blank-typescript
cd planna
```

## Step 2: Install All Dependencies
```bash
# Navigation and core
npx expo install expo-router expo-font expo-status-bar expo-constants

# UI and gestures
npm install react-native-calendars react-native-gesture-handler react-native-reanimated
npm install react-native-safe-area-context react-native-screens

# State management and storage
npm install zustand @react-native-async-storage/async-storage

# Development
npm install --save-dev @types/react @types/react-native
```

## Step 3: Create Project File Structure
Create the following directory structure:
```
/app
  /(auth)
    /login.tsx
    /register.tsx
    /_layout.tsx
  /(app)
    /(tabs)
      /index.tsx
      /lists.tsx
      /_layout.tsx
    /event
      /create.tsx
      /edit.tsx
    /group
      /create.tsx
      /join.tsx
    /_layout.tsx
  /index.tsx
  /_layout.tsx
/components
  /calendar
    /MonthView.tsx
    /WeekView.tsx
    /AgendaView.tsx
    /EventCard.tsx
    /CalendarHeader.tsx
    /ViewSwitcher.tsx
  /lists
    /ListItem.tsx
    /ListCard.tsx
    /AddItemInput.tsx
  /common
    /Button.tsx
    /Input.tsx
    /Header.tsx
    /EmptyState.tsx
    /LoadingState.tsx
/constants
  /Colors.ts
  /Layout.ts
  /Typography.ts
/store
  /authStore.ts
  /calendarStore.ts
  /listStore.ts
  /groupStore.ts
/types
  /index.ts
/utils
  /mockData.ts
  /dateHelpers.ts
```

## Step 4: Define Types and Interfaces
Create `/types/index.ts`:
```typescript
export interface User {
  id: string
  email: string
  name: string
  color: string
}

export interface Group {
  id: string
  name: string
  code: string
  createdBy: string
  createdAt: Date
}

export interface GroupMember {
  id: string
  userId: string
  groupId: string
  name: string
  color: string
}

export interface Event {
  id: string
  groupId: string
  title: string
  date: string // YYYY-MM-DD
  time?: string // HH:MM
  note?: string
  memberIds: string[]
  createdBy: string
  createdAt: Date
}

export interface List {
  id: string
  groupId: string
  name: string
  createdAt: Date
}

export interface ListItem {
  id: string
  listId: string
  text: string
  completed: boolean
  createdBy: string
  createdAt: Date
  completedAt?: Date
}
```

## Step 5: Create Design System Constants
Create `/constants/Colors.ts`:
```typescript
export const Colors = {
  primary: '#000000',
  secondary: '#666666',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  border: '#E0E0E0',
  
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#CCCCCC',
    inverse: '#FFFFFF',
  },
  
  memberColors: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#F4A460', '#98D8C8'
  ],
  
  status: {
    error: '#FF4444',
    success: '#00C851',
    warning: '#FFBB33',
  },
}
```

Create `/constants/Typography.ts`:
```typescript
export const Typography = {
  largeTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: -1,
    lineHeight: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
}
```

Create `/constants/Layout.ts`:
```typescript
export const Layout = {
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  headerHeight: 60,
  tabBarHeight: 60,
}
```

## Step 6: Create Mock Data
Create `/utils/mockData.ts`:
```typescript
import { User, Group, GroupMember, Event, List, ListItem } from '@/types'

export const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John',
  color: '#FF6B6B',
}

export const mockGroup: Group = {
  id: '1',
  name: 'Family',
  code: 'FAM123',
  createdBy: '1',
  createdAt: new Date(),
}

export const mockGroupMembers: GroupMember[] = [
  { id: '1', userId: '1', groupId: '1', name: 'John', color: '#FF6B6B' },
  { id: '2', userId: '2', groupId: '1', name: 'Sarah', color: '#4ECDC4' },
  { id: '3', userId: '3', groupId: '1', name: 'Mike', color: '#45B7D1' },
]

export const mockEvents: Event[] = [
  {
    id: '1',
    groupId: '1',
    title: 'Family Dinner',
    date: '2024-01-20',
    time: '19:00',
    memberIds: ['1', '2', '3'],
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    groupId: '1',
    title: 'Soccer Practice',
    date: '2024-01-21',
    time: '16:00',
    memberIds: ['3'],
    note: 'Bring water bottle',
    createdBy: '2',
    createdAt: new Date(),
  },
]

export const mockLists: List[] = [
  {
    id: '1',
    groupId: '1',
    name: 'Grocery List',
    createdAt: new Date(),
  },
]

export const mockListItems: ListItem[] = [
  {
    id: '1',
    listId: '1',
    text: 'Milk',
    completed: false,
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    listId: '1',
    text: 'Bread',
    completed: true,
    createdBy: '2',
    createdAt: new Date(),
    completedAt: new Date(),
  },
]
```

## Step 7: Create Zustand Stores
Create `/store/authStore.ts`:
```typescript
import { create } from 'zustand'
import { User } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
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
  
  logout: async () => {
    await AsyncStorage.removeItem('user')
    set({ user: null, isAuthenticated: false })
  },
}))
```

Create `/store/calendarStore.ts`:
```typescript
import { create } from 'zustand'
import { Event } from '@/types'
import { mockEvents } from '@/utils/mockData'

interface CalendarStore {
  events: Event[]
  selectedDate: string
  view: 'month' | 'week' | 'agenda'
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => void
  setSelectedDate: (date: string) => void
  setView: (view: 'month' | 'week' | 'agenda') => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: mockEvents,
  selectedDate: new Date().toISOString().split('T')[0],
  view: 'month',
  
  addEvent: (event) => set((state) => ({
    events: [...state.events, {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date(),
    }]
  })),
  
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...e, ...updates } : e)
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(e => e.id !== id)
  })),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setView: (view) => set({ view }),
}))
```

## Step 8: Create Root Layout
Create `/app/_layout.tsx`:
```typescript
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RootLayout() {
  const { user, isAuthenticated } = useAuthStore()
  
  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    const userJson = await AsyncStorage.getItem('user')
    if (userJson) {
      const user = JSON.parse(userJson)
      useAuthStore.setState({ user, isAuthenticated: true })
    }
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  )
}
```

## Step 9: Create Redirect Screen
Create `/app/index.tsx`:
```typescript
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/store/authStore'

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />
  }
  
  return <Redirect href="/(auth)/login" />
}
```

## Step 10: Create Common Components
Create `/components/common/Button.tsx`:
```typescript
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors, Typography } from '@/constants'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  loading?: boolean
}

export function Button({ title, onPress, variant = 'primary', disabled, loading }: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.text.inverse : Colors.text.primary} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...Typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.text.inverse,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  textText: {
    color: Colors.text.primary,
  },
})
```

Create `/components/common/Input.tsx`:
```typescript
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { Colors, Typography } from '@/constants'
import { useState } from 'react'

interface InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  error?: string
}

export function Input({ placeholder, value, onChangeText, error, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          focused && styles.focused,
          error && styles.error
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.disabled}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    ...Typography.body,
    color: Colors.text.primary,
  },
  focused: {
    borderColor: Colors.primary,
  },
  error: {
    borderColor: Colors.status.error,
  },
  errorText: {
    ...Typography.small,
    color: Colors.status.error,
    marginTop: 4,
    marginLeft: 4,
  },
})
```

## Step 11: Create Login Screen
Create `/app/(auth)/login.tsx`:
```typescript
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { Button, Input } from '@/components/common'
import { Colors, Typography, Layout } from '@/constants'
import { useAuthStore } from '@/store/authStore'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  
  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
      router.replace('/(app)/(tabs)')
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Planna</Text>
          <Text style={styles.subtitle}>
            The calendar app that doesn't try to do everything.
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />
          
          <Button
            title="Create Account"
            variant="text"
            onPress={() => router.push('/(auth)/register')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.padding.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.padding.xl * 2,
  },
  title: {
    ...Typography.largeTitle,
    marginBottom: Layout.padding.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
})
```

## Step 12: Create Register Screen
Create `/app/(auth)/register.tsx`:
```typescript
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { Button, Input } from '@/components/common'
import { Colors, Typography, Layout } from '@/constants'
import { useAuthStore } from '@/store/authStore'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const register = useAuthStore((state) => state.register)
  
  const handleRegister = async () => {
    setLoading(true)
    try {
      await register(email, password, name)
      router.replace('/(app)/group/create')
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join Planna to sync calendars with your group
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
          />
          
          <Button
            title="Already have an account? Sign In"
            variant="text"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.padding.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.padding.xl * 2,
  },
  title: {
    ...Typography.title,
    marginBottom: Layout.padding.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
})
```

## Step 13: Create Group Management Screens
Create `/app/(app)/group/create.tsx`:
```typescript
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { Button, Input } from '@/components/common'
import { Colors, Typography, Layout } from '@/constants'

export default function CreateGroupScreen() {
  const [groupName, setGroupName] = useState('')
  const [selectedColor, setSelectedColor] = useState(Colors.memberColors[0])
  
  const handleCreate = () => {
    // Mock group creation
    router.replace('/(app)/(tabs)')
  }
  
  const handleJoinInstead = () => {
    router.replace('/(app)/group/join')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Group</Text>
        <Text style={styles.subtitle}>
          Start a new group to share calendars and lists
        </Text>
        
        <Input
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
        
        <View style={styles.colorSection}>
          <Text style={styles.label}>Choose Your Color</Text>
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
              />
            ))}
          </View>
        </View>
        
        <Button
          title="Create Group"
          onPress={handleCreate}
          disabled={!groupName.trim()}
        />
        
        <Button
          title="Join Existing Group"
          variant="text"
          onPress={handleJoinInstead}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.padding.lg,
    paddingTop: Layout.padding.xl * 3,
  },
  title: {
    ...Typography.title,
    marginBottom: Layout.padding.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.xl,
  },
  label: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Layout.padding.md,
  },
  colorSection: {
    marginVertical: Layout.padding.lg,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.padding.md,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.full,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: Colors.primary,
  },
})
```

## Step 14: Create Tab Navigation
Create `/app/(app)/(tabs)/_layout.tsx`:
```typescript
import { Tabs } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Typography, Layout } from '@/constants'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <View style={[styles.icon, { backgroundColor: color }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => (
            <View style={[styles.icon, { backgroundColor: color }]} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.border,
    height: Layout.tabBarHeight,
  },
  tabBarLabel: {
    ...Typography.caption,
    marginBottom: 4,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
})
```

## Step 15: Create Calendar Screen
Create `/app/(app)/(tabs)/index.tsx`:
```typescript
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { MonthView } from '@/components/calendar/MonthView'
import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { EventList } from '@/components/calendar/EventList'
import { Colors } from '@/constants'
import { useCalendarStore } from '@/store/calendarStore'

export default function CalendarScreen() {
  const { selectedDate, view } = useCalendarStore()
  
  return (
    <View style={styles.container}>
      <CalendarHeader />
      
      <View style={styles.calendarContainer}>
        {view === 'month' && <MonthView />}
        {/* Add WeekView and AgendaView components here */}
      </View>
      
      <EventList date={selectedDate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  calendarContainer: {
    flex: 1,
  },
})
```

## Step 16: Create Calendar Components
Create `/components/calendar/MonthView.tsx`:
```typescript
import { Calendar, DateData } from 'react-native-calendars'
import { useCalendarStore } from '@/store/calendarStore'
import { Colors, Typography } from '@/constants'
import { mockGroupMembers } from '@/utils/mockData'

export function MonthView() {
  const { events, selectedDate, setSelectedDate } = useCalendarStore()
  
  // Process events for calendar marking
  const markedDates = events.reduce((acc, event) => {
    const members = event.memberIds.map(id => 
      mockGroupMembers.find(m => m.id === id)
    ).filter(Boolean)
    
    acc[event.date] = {
      marked: true,
      dots: members.map(member => ({
        color: member?.color || Colors.primary,
      })),
    }
    
    return acc
  }, {} as any)
  
  // Mark selected date
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: Colors.primary,
    }
  }
  
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString)
  }
  
  return (
    <Calendar
      markedDates={markedDates}
      onDayPress={handleDayPress}
      markingType="multi-dot"
      theme={{
        backgroundColor: Colors.background,
        calendarBackground: Colors.background,
        selectedDayBackgroundColor: Colors.primary,
        selectedDayTextColor: Colors.text.inverse,
        todayTextColor: Colors.primary,
        dayTextColor: Colors.text.primary,
        textDisabledColor: Colors.text.disabled,
        monthTextColor: Colors.text.primary,
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontSize: Typography.body.fontSize,
        textMonthFontSize: Typography.heading.fontSize,
        textDayHeaderFontSize: Typography.caption.fontSize,
        'stylesheet.calendar.header': {
          week: {
            marginTop: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      }}
    />
  )
}
```

Create `/components/calendar/EventCard.tsx`:
```typescript
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Event } from '@/types'
import { Colors, Typography, Layout } from '@/constants'
import { mockGroupMembers } from '@/utils/mockData'

interface EventCardProps {
  event: Event
  onPress: () => void
}

export function EventCard({ event, onPress }: EventCardProps) {
  const members = event.memberIds.map(id => 
    mockGroupMembers.find(m => m.id === id)
  ).filter(Boolean)
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{event.time || 'All day'}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        {event.note && <Text style={styles.note}>{event.note}</Text>}
        
        <View style={styles.members}>
          {members.map((member) => (
            <View
              key={member?.id}
              style={[styles.memberDot, { backgroundColor: member?.color }]}
            />
          ))}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Layout.padding.md,
    paddingHorizontal: Layout.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timeContainer: {
    width: 60,
    marginRight: Layout.padding.md,
  },
  time: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  note: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  members: {
    flexDirection: 'row',
    gap: 6,
  },
  memberDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
})

## Step 17: Create Week View Component
Create `/components/calendar/WeekView.tsx`:
```typescript
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Colors, Typography, Layout } from '@/constants'
import { useCalendarStore } from '@/store/calendarStore'
import { getWeekDates } from '@/utils/dateHelpers'
import { mockGroupMembers } from '@/utils/mockData'

export function WeekView() {
  const { events, selectedDate, setSelectedDate } = useCalendarStore()
  const weekDates = getWeekDates(new Date(selectedDate))
  
  const getEventsForDate = (date: string) => {
    return events.filter(e => e.date === date)
  }
  
  const getDayName = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
  }
  
  const getDayNumber = (date: string) => {
    return new Date(date).getDate()
  }
  
  const isToday = (date: string) => {
    return date === new Date().toISOString().split('T')[0]
  }
  
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {weekDates.map((date) => (
        <Pressable
          key={date}
          style={styles.dayColumn}
          onPress={() => setSelectedDate(date)}
        >
          <View style={[styles.dayHeader, isToday(date) && styles.todayHeader]}>
            <Text style={[styles.dayName, isToday(date) && styles.todayText]}>
              {getDayName(date)}
            </Text>
            <Text style={[styles.dayNumber, isToday(date) && styles.todayText]}>
              {getDayNumber(date)}
            </Text>
          </View>
          
          <View style={styles.eventsContainer}>
            {getEventsForDate(date).map((event) => (
              <View key={event.id} style={styles.eventBlock}>
                <Text style={styles.eventTime}>{event.time || 'All day'}</Text>
                <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
                <View style={styles.eventMembers}>
                  {event.memberIds.map((memberId) => {
                    const member = mockGroupMembers.find(m => m.id === memberId)
                    return (
                      <View
                        key={memberId}
                        style={[styles.memberDot, { backgroundColor: member?.color }]}
                      />
                    )
                  })}
                </View>
              </View>
            ))}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayColumn: {
    width: 120,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  dayHeader: {
    alignItems: 'center',
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  todayHeader: {
    backgroundColor: Colors.primary,
  },
  dayName: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  dayNumber: {
    ...Typography.heading,
    fontWeight: '600',
  },
  todayText: {
    color: Colors.text.inverse,
  },
  eventsContainer: {
    padding: Layout.padding.sm,
  },
  eventBlock: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.sm,
    borderRadius: Layout.borderRadius.sm,
    marginBottom: Layout.padding.sm,
  },
  eventTime: {
    ...Typography.small,
    color: Colors.text.secondary,
  },
  eventTitle: {
    ...Typography.caption,
    fontWeight: '500',
    marginVertical: 2,
  },
  eventMembers: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  memberDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})
```

## Step 18: Create Agenda View Component
Create `/components/calendar/AgendaView.tsx`:
```typescript
import { SectionList, View, Text, StyleSheet } from 'react-native'
import { Colors, Typography, Layout } from '@/constants'
import { useCalendarStore } from '@/store/calendarStore'
import { EventCard } from './EventCard'
import { router } from 'expo-router'

export function AgendaView() {
  const events = useCalendarStore((state) => state.events)
  
  // Group events by date
  const sections = events.reduce((acc, event) => {
    const dateKey = event.date
    const existing = acc.find(s => s.date === dateKey)
    
    if (existing) {
      existing.data.push(event)
    } else {
      acc.push({
        date: dateKey,
        data: [event]
      })
    }
    
    return acc
  }, [] as Array<{ date: string; data: typeof events }>)
  
  // Sort sections by date
  sections.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  const renderSectionHeader = ({ section }: { section: { date: string } }) => {
    const date = new Date(section.date)
    const isToday = section.date === new Date().toISOString().split('T')[0]
    
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionDate}>
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        {isToday && <Text style={styles.todayBadge}>Today</Text>}
      </View>
    )
  }
  
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventCard
          event={item}
          onPress={() => router.push(`/event/edit?id=${item.id}`)}
        />
      )}
      renderSectionHeader={renderSectionHeader}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No upcoming events</Text>
          <Text style={styles.emptySubtext}>
            Pull down on the calendar to create one
          </Text>
        </View>
      }
      stickySectionHeadersEnabled
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionDate: {
    ...Typography.body,
    fontWeight: '600',
  },
  todayBadge: {
    ...Typography.caption,
    color: Colors.text.inverse,
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.padding.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.padding.xl * 4,
  },
  emptyText: {
    ...Typography.heading,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
})
```

## Step 19: Create List Creation Screen
Create `/app/(app)/list/create.tsx`:
```typescript
import { View, Text, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { Button, Input } from '@/components/common'
import { Colors, Typography, Layout } from '@/constants'
import { useListStore } from '@/store/listStore'

export default function CreateListScreen() {
  const [listName, setListName] = useState('')
  const createList = useListStore((state) => state.createList)
  
  const handleCreate = () => {
    if (!listName.trim()) return
    
    createList({
      groupId: '1',
      name: listName,
    })
    
    router.back()
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Cancel" variant="text" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>New List</Text>
        <Button 
          title="Create" 
          variant="text" 
          onPress={handleCreate} 
          disabled={!listName.trim()} 
        />
      </View>
      
      <View style={styles.form}>
        <Input
          placeholder="List Name"
          value={listName}
          onChangeText={setListName}
          autoFocus
        />
        
        <Text style={styles.hint}>
          Create shared lists for groceries, tasks, or anything else your group needs to track together.
        </Text>
      </View>
    </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...Typography.heading,
    fontWeight: '600',
  },
  form: {
    padding: Layout.padding.lg,
  },
  hint: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Layout.padding.md,
  },
})
```

## Step 20: Create List Store
Create `/store/listStore.ts`:
```typescript
import { create } from 'zustand'
import { List, ListItem } from '@/types'
import { mockLists, mockListItems } from '@/utils/mockData'

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
```

## Step 21: Create Group Store
Create `/store/groupStore.ts`:
```typescript
import { create } from 'zustand'
import { Group, GroupMember } from '@/types'
import { mockGroup, mockGroupMembers } from '@/utils/mockData'

interface GroupStore {
  currentGroup: Group | null
  members: GroupMember[]
  setGroup: (group: Group) => void
  addMember: (member: GroupMember) => void
  updateMember: (memberId: string, updates: Partial<GroupMember>) => void
}

export const useGroupStore = create<GroupStore>((set) => ({
  currentGroup: mockGroup,
  members: mockGroupMembers,
  
  setGroup: (group) => set({ currentGroup: group }),
  
  addMember: (member) => set((state) => ({
    members: [...state.members, member]
  })),
  
  updateMember: (memberId, updates) => set((state) => ({
    members: state.members.map(m =>
      m.id === memberId ? { ...m, ...updates } : m
    )
  })),
}))
```

## Step 22: Add Pull-to-Create Event Gesture
Update `/components/calendar/MonthView.tsx` to add pull gesture:
```typescript
import { RefreshControl, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'

export function MonthView() {
  const [refreshing, setRefreshing] = useState(false)
  const { events, selectedDate, setSelectedDate } = useCalendarStore()
  
  const handleRefresh = () => {
    setRefreshing(true)
    // Navigate to create event with selected date
    router.push(`/event/create?date=${selectedDate}`)
    setTimeout(() => setRefreshing(false), 500)
  }
  
  // ... rest of the component code ...
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.primary}
          title="Pull to create event"
        />
      }
    >
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        markingType="multi-dot"
        theme={{
          // ... existing theme props ...
        }}
      />
    </ScrollView>
  )
}
```

## Step 23: Add Settings/Profile Screen
Create `/app/(app)/settings.tsx`:
```typescript
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router'
import { Colors, Typography, Layout } from '@/constants'
import { useAuthStore } from '@/store/authStore'
import { useGroupStore } from '@/store/groupStore'

export default function SettingsScreen() {
  const { user, logout } = useAuthStore()
  const { currentGroup, members } = useGroupStore()
  const currentMember = members.find(m => m.userId === user?.id)
  
  const handleLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.profileCard}>
          <View style={[styles.colorDot, { backgroundColor: currentMember?.color }]} />
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group</Text>
        <View style={styles.groupCard}>
          <Text style={styles.groupName}>{currentGroup?.name}</Text>
          <Text style={styles.groupCode}>Code: {currentGroup?.code}</Text>
          <Text style={styles.memberCount}>{members.length} members</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Planna v1.0.0</Text>
        <Text style={styles.tagline}>The calendar app that doesn't try to do everything.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Layout.padding.lg,
    paddingTop: Layout.padding.xl * 2,
    paddingBottom: Layout.padding.lg,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: Layout.padding.lg,
    marginBottom: Layout.padding.xl,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.md,
    textTransform: 'uppercase',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.padding.md,
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
  },
  email: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
  },
  groupName: {
    ...Typography.body,
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
  button: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.lg,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.status.error,
  },
  footer: {
    position: 'absolute',
    bottom: Layout.padding.xl * 2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  tagline: {
    ...Typography.caption,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
})
```

## Step 24: Add Error Boundaries and Error Handling
Create `/components/common/ErrorBoundary.tsx`:
```typescript
import React, { Component, ReactNode } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Colors, Typography, Layout } from '@/constants'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops, something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button
            title="Try Again"
            onPress={() => this.setState({ hasError: false, error: null })}
          />
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.padding.xl,
    backgroundColor: Colors.background,
  },
  title: {
    ...Typography.heading,
    marginBottom: Layout.padding.md,
  },
  message: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.padding.xl,
  },
})
```

## Step 25: Final App Configuration and Launch Screen
Update `/app/_layout.tsx` to include error boundary:
```typescript
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import * as SplashScreen from 'expo-splash-screen'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { user, isAuthenticated } = useAuthStore()
  
  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user')
      if (userJson) {
        const user = JSON.parse(userJson)
        useAuthStore.setState({ user, isAuthenticated: true })
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      // Hide splash screen
      await SplashScreen.hideAsync()
    }
  }
  
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </ErrorBoundary>
  )
}
```

Create `/assets/splash.png` specifications:
```
- Size: 1284x2778px (iPhone 14 Pro Max)
- Background: #FFFFFF
- Logo: Centered "Planna" text in black
- Keep it minimal and clean
```

Create `/assets/icon.png` specifications:
```
- Size: 1024x1024px
- Background: #000000
- Text: "P" in white, minimal design
- No rounded corners (iOS/Android will apply them)
```

Update `/app.json`:
```json
{
  "expo": {
    "name": "Planna",
    "slug": "planna",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.planna"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "com.yourcompany.planna"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## Additional Implementation Notes

### Update Calendar Screen to Use Views
Update `/app/(app)/(tabs)/index.tsx` to render different views:
```typescript
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { MonthView } from '@/components/calendar/MonthView'
import { WeekView } from '@/components/calendar/WeekView'
import { AgendaView } from '@/components/calendar/AgendaView'
import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { EventList } from '@/components/calendar/EventList'
import { Colors } from '@/constants'
import { useCalendarStore } from '@/store/calendarStore'

export default function CalendarScreen() {
  const { selectedDate, view } = useCalendarStore()
  
  return (
    <View style={styles.container}>
      <CalendarHeader />
      
      <View style={styles.calendarContainer}>
        {view === 'month' && <MonthView />}
        {view === 'week' && <WeekView />}
        {view === 'agenda' && <AgendaView />}
      </View>
      
      {view !== 'agenda' && <EventList date={selectedDate} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  calendarContainer: {
    flex: 1,
  },
})
```

### Add Settings to Tab Navigation
Update `/app/(app)/(tabs)/_layout.tsx` to include settings:
```typescript
<Tabs.Screen
  name="settings"
  options={{
    title: 'Settings',
    tabBarIcon: ({ color }) => (
      <View style={[styles.icon, { backgroundColor: color }]} />
    ),
  }}
/>
```

## Backend Integration Preparation
When ready to connect to Supabase:

1. **Create Supabase client** in `/lib/supabase.ts`
2. **Replace mock authentication** with Supabase Auth
3. **Implement real-time subscriptions** for calendar and lists
4. **Add offline queue** for sync when reconnected
5. **Handle errors gracefully** with proper user feedback

## Testing Checklist
- [ ] All screens navigate correctly
- [ ] Calendar views switch smoothly
- [ ] Events display with correct member colors
- [ ] Lists can be created (max 3)
- [ ] List items can be added, checked, and deleted
- [ ] Pull-to-create gesture works
- [ ] Settings screen displays user info
- [ ] Sign out returns to login
- [ ] Error boundary catches crashes
- [ ] App works offline with mock data
