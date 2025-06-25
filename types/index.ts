export interface User {
  id: string
  email: string
  name: string
  color: string
  dateOfBirth?: string // YYYY-MM-DD format
  profilePicture?: string // URI to image
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