# Product Requirements Document: Planna

## 1. Executive Summary

### Product Overview
Planna is a sleek, minimalist React Native application that enables groups (families, roommates, partners) to synchronize calendars and manage shared lists. The app focuses on intuitive design and core functionality, avoiding the feature bloat and childish themes common in existing solutions.

### Problem Statement
Current family calendar apps suffer from over-complexity and juvenile design aesthetics that alienate adult users. Families need a sophisticated, easy-to-use tool that handles two core functions exceptionally well: schedule coordination and shared list management.

### Solution
Planna - a modern, minimalist calendar and list application designed for adults and teens (14+) that prioritizes usability and elegant design over excessive features.

## 2. Goals & Objectives

### Primary Goals
- Create an intuitive, clutter-free calendar sharing experience
- Provide simple, effective list management for groups
- Maintain a sophisticated, modern design aesthetic
- Focus on doing two things exceptionally well rather than many things poorly

### Design Principles
- **Minimalist**: Every feature must justify its existence
- **Intuitive**: Zero learning curve for basic functions
- **Sophisticated**: Professional aesthetic appealing to adults
- **Fast**: Instant load times and real-time updates
- **Focused**: Calendar and lists only - no feature creep

### Success Metrics
- Time to first event creation: Under 30 seconds
- User satisfaction: 4.7+ app store rating
- Daily active usage: 80% of users check app daily
- Feature usage: 90% of users actively use both calendar and lists
- Simplicity score: Less than 5 taps to complete any core action

## 3. User Personas

### Primary Persona: Modern Adult User
- **Age**: 25-55 years old
- **Tech Comfort**: High
- **Needs**: Clean interface, quick actions, no childish elements
- **Pain Points**: Existing apps too cluttered, unprofessional design, too many unnecessary features
- **Values**: Efficiency, aesthetics, simplicity

### Secondary Persona: Teen User
- **Age**: 14-18 years old
- **Tech Comfort**: Very high
- **Needs**: Fast performance, modern design, privacy from family
- **Pain Points**: Apps that feel "made for parents", slow interfaces
- **Values**: Speed, privacy, cool factor

## 4. Core Features (Strictly Limited)

### 4.1 User & Group Management
- **Simple Group Creation**: Create group with name only
- **Easy Invites**: Share link or code to join
- **Minimal Profiles**: Name and color only
- **No Complex Roles**: All members equal (except group creator can delete group)

### 4.2 Calendar (Primary Feature)
- **Clean Calendar Views**:
  - Month view (default)
  - Week view
  - List view (agenda style)
- **Event Essentials Only**:
  - Title (required)
  - Date & time
  - Which members involved
  - Optional note (one line)
- **Smart Defaults**: 
  - 1-hour duration default
  - Current time rounded to next hour
  - Today's date
- **Visual Clarity**:
  - Color coding per member
  - Clean typography
  - Plenty of whitespace
  - No icons or decorations

### 4.3 Lists (Secondary Feature)
- **Shared Lists**: 
  - Simple text items
  - Check off completed items
  - See who added what
  - No categories or complex features
- **List Types**: User-created, no pre-defined templates
- **Interaction**: Single tap to check, swipe to delete

### 4.4 Sync & Notifications
- **Real-time Sync**: Instant updates, no refresh needed
- **Minimal Notifications**:
  - Event reminders (optional)
  - When someone adds you to an event
  - Daily summary (optional)
- **No Notification Spam**: Strict limits on notification frequency

### 4.5 What We're NOT Building
- No chat/messaging
- No photo sharing
- No expense tracking
- No chore charts
- No reward systems
- No family games
- No meal planning
- No complex permissions
- No themes or customization
- No widgets
- No integrations (MVP)

## 5. User Flow

### Onboarding Flow (Under 60 seconds)
1. Open Planna → Create account (email/password only)
2. Create group or join with code
3. Choose name and color
4. See calendar immediately
5. Add first event with single tap

### Daily Usage Flow
1. Open Planna → See today in calendar
2. Tap to add event or check list
3. Swipe to navigate days
4. Done

### List Usage Flow
1. Tap lists tab
2. Add item with single line of text
3. Others see item appear instantly
4. Tap to check off
5. Completed items move to bottom

## 6. Technical Requirements

### Platform Requirements
- **Primary Platform**: React Native with Expo
- **Minimum OS Versions**: iOS 13.0+, Android 8.0+
- **Offline Capability**: View schedules offline, sync when connected

### Tech Stack
- **Frontend Framework**: Expo (SDK 50+)
  - Expo Router for navigation
  - Expo Notifications for push notifications
  - Expo Calendar for native calendar integration
  - Expo Secure Store for secure local storage
- **Backend Services**: Supabase
  - PostgreSQL database with real-time subscriptions
  - Supabase Auth for authentication
  - Supabase Storage for profile images
  - Row Level Security (RLS) for data protection
  - Edge Functions for complex business logic
- **Additional Libraries**:
  - React Native Calendars for UI components
  - React Query for data fetching and caching
  - Zustand for state management
  - React Hook Form for form handling

### Backend Requirements
- **Database Schema**:
  - Users table (profiles, preferences)
  - Families table (family groups)
  - Family_members junction table
  - Events table with RLS policies
  - Notifications table
- **Authentication**: Supabase Auth with email/password and social logins
- **Real-time**: Supabase Realtime for instant synchronization
- **Push Notifications**: Expo Push Notification Service
- **API Integration**: Calendar service APIs via Supabase Edge Functions

### Performance Requirements
- **Load Time**: App launch under 3 seconds
- **Sync Time**: Updates visible within 2 seconds using Supabase Realtime
- **Battery Usage**: Minimal background battery consumption
- **Offline Support**: Supabase offline-first with React Query caching

## 7. Design Requirements

### Visual Design Philosophy
- **Modern Minimalism**: 
  - Lots of white space
  - Clean typography (SF Pro or Inter)
  - No gradients, shadows, or decorations
  - Monochromatic with accent colors per user
- **Adult-Focused**:
  - No cartoon characters
  - No playful fonts
  - No stickers or emojis
  - Professional color palette
- **Information Hierarchy**:
  - Content first, chrome last
  - Important info in black, secondary in gray
  - Minimal UI elements

### Interaction Design
- **Gesture-First**: 
  - Swipe between months/weeks
  - Pull down to create event
  - Swipe list items to delete
- **Speed Optimized**:
  - No confirmations for non-destructive actions
  - Instant feedback
  - Optimistic updates
- **Accessibility**: 
  - High contrast mode
  - Large tap targets (44pt minimum)
  - Clear focus states

## 8. Security & Privacy

### Data Protection
- **Encryption**: Supabase SSL/TLS encryption in transit, encrypted at rest
- **Row Level Security**: Supabase RLS policies ensure users only access their family's data
- **Authentication**: Supabase Auth with MFA support
- **API Security**: Secure API keys management with Expo SecureStore

### Privacy Features
- **Private Events**: RLS policies to control event visibility
- **Teen Privacy**: Special RLS policies for teenage users
- **Data Export**: Supabase data export functionality
- **GDPR Compliance**: Right to deletion, data portability via Supabase

## 9. Monetization Strategy

### Premium Model (Simple)
- **Free Forever**: 
  - Up to 3 members per group
  - Full calendar features
  - 3 active lists
- **Premium ($4.99/month per group)**:
  - Unlimited members
  - Unlimited lists
  - Calendar export
  - Premium support
- **No Ads Ever**: Ads would compromise the minimalist design

## 10. MVP Scope

### Development Approach
- **AI-Assisted Development**: Utilizing AI tools for rapid development
- **Design-First**: Polish UI/UX before adding features
- **Performance Focus**: Optimize for speed over features

### Phase 1 (MVP) - 2-3 weeks
- Expo + Supabase setup
- Authentication (email/password only)
- Group creation/joining
- Calendar month view
- Basic event creation (title, date, time)
- Member color coding
- Real-time sync
- Single shared grocery list

### Phase 2 - 2 weeks
- Week and list calendar views
- Event editing/deletion
- Multiple lists (up to 3)
- Basic notifications
- List item assignment
- Performance optimizations

### Phase 3 - 2 weeks
- Premium tier implementation
- Calendar export
- Polish animations
- Offline support
- App store optimization

## 11. Success Criteria

### Launch Metrics
- 500 groups created in first week
- Average time to first event: Under 45 seconds
- App store rating: 4.5+ stars
- Zero complaints about complexity

### User Feedback Goals
- "Finally, a simple calendar app"
- "Love the clean design"
- "Planna is so fast and easy to use"
- "Not cluttered like other apps"

## 12. Risks & Mitigation

### Product Risks
- **Feature Request Pressure**: Strong product vision, say no often
- **Design Complexity Creep**: Regular design audits, remove rather than add
- **Competition from Feature-Rich Apps**: Market Planna as "The calendar app that doesn't do too much"

### Technical Risks
- **Performance with Simplicity**: Aggressive optimization, lazy loading
- **Sync Reliability**: Supabase real-time with offline queue
- **Scaling**: Start with solid architecture, optimize early

## 13. Future Considerations (Post-Success Only)

### Possible Additions (Year 2+)
- External calendar sync (Google, Apple)
- Web version
- Apple Watch app
- Natural language event creation
- End-to-end encryption option

### Never Add
- Chat/messaging
- Social features
- Games or rewards
- Complex permission systems
- Themes or heavy customization
- Business features

## 14. Competitive Positioning

### Planna's Advantage
- **Cozi**: Cluttered with ads, meal planning, recipes - Planna is calendar and lists only
- **Google Calendar**: Not designed for family sharing - Planna is built for groups
- **FamCal**: Childish design, too many features - Planna is sleek and minimal
- **Any.do**: Task management focus - Planna is time-based with calendar first

### Planna's Tagline
"The calendar app that doesn't try to do everything."

### Target Market
- Modern families who value design
- Roommates coordinating schedules
- Couples sharing calendars
- Multi-generational families (excluding young children)
- Anyone frustrated with bloated family apps