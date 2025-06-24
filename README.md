# Planna - Minimalist Family Calendar App

A clean, modern React Native app built with Expo for sharing calendars and lists between family members.

## Features Implemented

- **Authentication Flow**: Login and registration screens with minimal design
- **Tab Navigation**: Calendar and Lists tabs with clean interface
- **Calendar View**: Interactive calendar with date selection
- **Lists Management**: Shared grocery lists with item completion
- **State Management**: Zustand stores for auth, calendar, and lists
- **Design System**: Consistent colors, typography, and layout

## Project Structure

```
app/
├── (auth)/               # Authentication screens
│   ├── login.tsx        # Login screen
│   ├── register.tsx     # Registration screen
│   └── _layout.tsx      # Auth layout
├── (app)/               # Main app screens
│   └── (tabs)/          # Tab navigation
│       ├── index.tsx    # Calendar screen
│       ├── lists.tsx    # Lists screen
│       └── _layout.tsx  # Tabs layout
├── index.tsx            # Entry point with auth redirect
└── _layout.tsx          # Root layout

components/
├── common/              # Reusable components
│   ├── Button.tsx       # Custom button component
│   └── Input.tsx        # Custom input component

constants/               # Design system
├── Colors.ts            # Color palette
├── Typography.ts        # Text styles
└── Layout.ts            # Spacing and dimensions

store/                   # State management
├── authStore.ts         # Authentication state
├── calendarStore.ts     # Calendar events state
├── listStore.ts         # Lists and items state
└── groupStore.ts        # Group and members state

types/
└── index.ts             # TypeScript interfaces

utils/
├── mockData.ts          # Development data
└── dateHelpers.ts       # Date utility functions
```

## Getting Started

1. **Start the Development Server**:
   ```bash
   npx expo start
   ```

2. **View the App**:
   - Press `w` to open in web browser
   - Press `i` to open iOS simulator (requires Xcode)
   - Press `a` to open Android emulator (requires Android Studio)
   - Scan QR code with Expo Go app on your phone

## Current Status

✅ **Complete**:
- Project structure and configuration
- Authentication flow with mock login
- Basic calendar interface
- Simple lists functionality
- Minimalist design system
- Navigation between screens

🚧 **In Progress**:
- Calendar event creation and management
- Real-time synchronization (currently uses mock data)
- Group management features

## Design Principles

Following the PRD requirements:
- **Minimalist**: Clean, uncluttered interface
- **Adult-focused**: Professional aesthetic, no childish elements  
- **Fast**: Optimized for quick interactions
- **Focused**: Calendar and lists only - no feature bloat

## Next Steps

1. **Backend Integration**: Replace mock data with Supabase
2. **Event Management**: Add/edit/delete calendar events
3. **Real-time Sync**: Live updates across devices
4. **Group Features**: Create/join family groups
5. **Notifications**: Event reminders and updates

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Expo Router**: File-based navigation
- **TypeScript**: Type safety and better DX
- **Zustand**: Lightweight state management
- **React Native Calendars**: Calendar component
- **AsyncStorage**: Local data persistence

The app embodies the tagline: "The calendar app that doesn't try to do everything." 