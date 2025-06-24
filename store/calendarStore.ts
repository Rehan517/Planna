import { create } from 'zustand'
import { Event } from '../types'
import { mockEvents } from '../utils/mockData'

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