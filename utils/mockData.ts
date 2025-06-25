import { User, Group, GroupMember, Event, List, ListItem } from '../types'

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
    shared: true,
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    groupId: '1',
    name: 'My Personal Tasks',
    shared: false,
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: '3',
    groupId: '1',
    name: 'House Chores',
    shared: true,
    createdBy: '2',
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
  {
    id: '3',
    listId: '2',
    text: 'Call dentist',
    completed: false,
    createdBy: '1',
    createdAt: new Date(),
  },
  {
    id: '4',
    listId: '2',
    text: 'Review work presentation',
    completed: true,
    createdBy: '1',
    createdAt: new Date(),
    completedAt: new Date(),
  },
  {
    id: '5',
    listId: '3',
    text: 'Vacuum living room',
    completed: false,
    createdBy: '2',
    createdAt: new Date(),
  },
  {
    id: '6',
    listId: '3',
    text: 'Take out trash',
    completed: true,
    createdBy: '3',
    createdAt: new Date(),
    completedAt: new Date(),
  },
] 