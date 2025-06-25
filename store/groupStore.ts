import { create } from 'zustand'
import { Group, GroupMember } from '../types'
import { mockGroup, mockGroupMembers } from '../utils/mockData'

interface GroupStore {
  currentGroup: Group | null
  members: GroupMember[]
  setGroup: (group: Group) => void
  addMember: (member: GroupMember) => void
  updateMember: (memberId: string, updates: Partial<GroupMember>) => void
  createGroupCode: (code: string) => void
  joinGroup: (code: string) => void
  leaveGroup: () => void
}

export const useGroupStore = create<GroupStore>((set) => ({
  currentGroup: null, // Start with no group/code
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
  
  createGroupCode: (code) => set((state) => ({
    currentGroup: {
      id: '1',
      name: 'My Group',
      code,
      createdBy: '1', // This should come from auth store
      createdAt: new Date(),
    }
  })),
  
  joinGroup: (code) => set((state) => ({
    currentGroup: {
      id: '2', // Different ID for joined group
      name: 'Joined Group',
      code,
      createdBy: 'other', // Someone else created this group
      createdAt: new Date(),
    }
  })),
  
  leaveGroup: () => set({ currentGroup: null }),
})) 