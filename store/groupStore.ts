import { create } from 'zustand'
import { Group, GroupMember } from '../types'
import { mockGroup, mockGroupMembers } from '../utils/mockData'

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