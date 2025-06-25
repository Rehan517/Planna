import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Pressable, 
  Modal, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Colors } from '../../../constants/Colors'
import { Typography } from '../../../constants/Typography'
import { Layout } from '../../../constants/Layout'
import { useCalendarStore } from '../../../store/calendarStore'
import { useAuthStore } from '../../../store/authStore'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'
import { TimeCarousel } from '../../../components/common/TimeCarousel'

export default function CalendarScreen() {
  const { selectedDate, setSelectedDate, addEvent, events } = useCalendarStore()
  const { user } = useAuthStore()
  const [modalVisible, setModalVisible] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventNote, setEventNote] = useState('')
  
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString)
  }
  
  const openModal = () => {
    setModalVisible(true)
  }
  
  const closeModal = () => {
    setModalVisible(false)
    setEventTitle('')
    setEventTime('')
    setEventNote('')
    Keyboard.dismiss()
  }
  
  const handleCreateEvent = () => {
    if (!eventTitle.trim()) {
      Alert.alert('Error', 'Please enter an event title')
      return
    }
    
    // Create new event
    addEvent({
      groupId: '1',
      title: eventTitle.trim(),
      date: selectedDate,
      time: eventTime || undefined,
      note: eventNote.trim() || undefined,
      memberIds: [user?.id || '1'],
      createdBy: user?.id || '1',
    })
    
    closeModal()
    Alert.alert('Success', 'Event created successfully!')
  }
  
  // Get today's events
  const todaysEvents = events.filter(event => event.date === selectedDate)
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: Colors.primary,
          },
        }}
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
        }}
      />
      
      <View style={styles.eventsSection}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>
            {selectedDate === new Date().toISOString().split('T')[0] ? "Today's Events" : "Events"}
          </Text>
          <Pressable style={styles.addButton} onPress={openModal}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
        
        <ScrollView 
          style={styles.eventsScrollView}
          contentContainerStyle={styles.eventsContent}
          showsVerticalScrollIndicator={false}
        >
          {todaysEvents.length > 0 ? (
            todaysEvents.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                {event.time && <Text style={styles.eventTime}>{event.time}</Text>}
                {event.note && <Text style={styles.eventNote}>{event.note}</Text>}
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No events for this day</Text>
          )}
        </ScrollView>
      </View>
      
      {/* Event Creation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Event</Text>
              <Pressable onPress={closeModal} style={styles.closeButtonContainer}>
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>
            
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.dateLabel}>
                Date: {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              
              <Input
                placeholder="Event title *"
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              
              <TimeCarousel
                value={eventTime}
                onChange={setEventTime}
              />
              
              <Input
                placeholder="Note (optional)"
                value={eventNote}
                onChangeText={setEventNote}
                multiline
              />
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={closeModal}
                  flex
                />
                <Button
                  title="Create Event"
                  onPress={handleCreateEvent}
                  flex
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Layout.padding.lg,
    paddingVertical: Layout.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.title,
    fontWeight: '600',
  },
  eventsSection: {
    flex: 1,
    paddingHorizontal: Layout.padding.lg,
    paddingTop: Layout.padding.lg,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.padding.md,
  },
  eventsTitle: {
    ...Typography.heading,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
  eventItem: {
    backgroundColor: Colors.surface,
    padding: Layout.padding.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.padding.sm,
  },
  eventTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTime: {
    ...Typography.caption,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  eventNote: {
    ...Typography.caption,
    color: Colors.text.secondary,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Layout.padding.xl,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 600,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  modalTitle: {
    ...Typography.heading,
    fontWeight: '600',
  },
  closeButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    ...Typography.heading,
    color: Colors.text.secondary,
  },
  modalBody: {
    flex: 1,
    padding: Layout.padding.lg,
  },
  dateLabel: {
    ...Typography.body,
    fontWeight: '500',
    marginBottom: Layout.padding.lg,
    color: Colors.text.secondary,
  },
  modalFooter: {
    padding: Layout.padding.lg,
    paddingTop: Layout.padding.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Layout.padding.md,
  },
  eventsScrollView: {
    flex: 1,
  },
  eventsContent: {
    paddingBottom: Layout.padding.xl,
  },
}) 