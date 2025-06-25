import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Typography } from '../../constants/Typography'
import { Layout } from '../../constants/Layout'

interface TimeCarouselProps {
  value: string // Format: "14:30" or ""
  onChange: (time: string) => void
  placeholder?: string
}

export function TimeCarousel({ value, onChange, placeholder = "Select time" }: TimeCarouselProps) {
  const [selectedHour, setSelectedHour] = useState(12)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('PM')
  
  const hourScrollRef = useRef<ScrollView>(null)
  const minuteScrollRef = useRef<ScrollView>(null)
  const periodScrollRef = useRef<ScrollView>(null)
  
  const { width } = Dimensions.get('window')
  const itemWidth = 60
  const itemHeight = 40
  
  // Generate arrays for scrolling
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const periods = ['AM', 'PM']
  
  // Parse initial value
  useEffect(() => {
    if (value) {
      // Handle format like "2:30 PM" or "14:30"
      if (value.includes('AM') || value.includes('PM')) {
        // Format: "2:30 PM"
        const [timeStr, period] = value.split(' ')
        const [hourStr, minuteStr] = timeStr.split(':')
        const hour = parseInt(hourStr)
        const minute = parseInt(minuteStr)
        
        setSelectedHour(hour)
        setSelectedMinute(minute)
        setSelectedPeriod(period as 'AM' | 'PM')
      } else {
        // Format: "14:30" (24-hour)
        const [hourStr, minuteStr] = value.split(':')
        const hour24 = parseInt(hourStr)
        const minute = parseInt(minuteStr)
        
        if (hour24 === 0) {
          setSelectedHour(12)
          setSelectedPeriod('AM')
        } else if (hour24 <= 12) {
          setSelectedHour(hour24)
          setSelectedPeriod(hour24 === 12 ? 'PM' : 'AM')
        } else {
          setSelectedHour(hour24 - 12)
          setSelectedPeriod('PM')
        }
        
        setSelectedMinute(minute)
      }
    }
  }, [value])
  
  // Update parent when values change
  useEffect(() => {
    let hour24 = selectedHour
    if (selectedPeriod === 'AM' && selectedHour === 12) {
      hour24 = 0
    } else if (selectedPeriod === 'PM' && selectedHour !== 12) {
      hour24 = selectedHour + 12
    }
    
    // Format time as "2:30 PM" instead of "14:30"
    const displayHour = selectedHour
    const displayMinute = selectedMinute.toString().padStart(2, '0')
    const timeString = `${displayHour}:${displayMinute} ${selectedPeriod}`
    onChange(timeString)
  }, [selectedHour, selectedMinute, selectedPeriod, onChange])
  
  const scrollToInitialPosition = () => {
    // Scroll to initial positions with proper spacing
    setTimeout(() => {
      hourScrollRef.current?.scrollTo({ 
        y: (selectedHour - 1) * 40, 
        animated: false 
      })
      minuteScrollRef.current?.scrollTo({ 
        y: selectedMinute * 40, 
        animated: false 
      })
      periodScrollRef.current?.scrollTo({ 
        y: (selectedPeriod === 'AM' ? 0 : 1) * 40, 
        animated: false 
      })
    }, 150)
  }
  
  const handleHourScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / 40)
    const hour = hours[index] || 12
    setSelectedHour(hour)
  }
  
  const handleMinuteScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / 40)
    const minute = minutes[index] || 0
    setSelectedMinute(minute)
  }
  
  const handlePeriodScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / 40)
    const period = periods[index] || 'PM'
    setSelectedPeriod(period as 'AM' | 'PM')
  }
  
  useEffect(() => {
    scrollToInitialPosition()
  }, [selectedHour, selectedMinute, selectedPeriod])
  
  const renderPickerItem = (item: number | string, isSelected: boolean) => (
    <View key={item} style={styles.pickerItem}>
      <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
        <Text style={[styles.pickerText, isSelected && styles.selectedText]}>
          {typeof item === 'number' && item < 10 ? `0${item}` : item}
        </Text>
      </View>
    </View>
  )
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Time (optional)</Text>
      
      <View style={styles.carouselContainer}>
        <View style={styles.timeCarousel}>
          {/* Hour Picker */}
          <View style={styles.pickerColumn}>
            <ScrollView
              ref={hourScrollRef}
              style={styles.picker}
              contentContainerStyle={styles.pickerContent}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={handleHourScroll}
            >
              <View style={styles.spacer} />
              {hours.map(hour => renderPickerItem(hour, hour === selectedHour))}
              <View style={styles.spacer} />
            </ScrollView>
          </View>
          
          <Text style={styles.separator}>:</Text>
          
          {/* Minute Picker */}
          <View style={styles.pickerColumn}>
            <ScrollView
              ref={minuteScrollRef}
              style={styles.picker}
              contentContainerStyle={styles.pickerContent}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={handleMinuteScroll}
            >
              <View style={styles.spacer} />
              {minutes.map(minute => renderPickerItem(minute, minute === selectedMinute))}
              <View style={styles.spacer} />
            </ScrollView>
          </View>
          
          {/* Period Picker */}
          <View style={styles.pickerColumn}>
            <ScrollView
              ref={periodScrollRef}
              style={styles.picker}
              contentContainerStyle={styles.pickerContent}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onMomentumScrollEnd={handlePeriodScroll}
            >
              <View style={styles.spacer} />
              {periods.map(period => renderPickerItem(period, period === selectedPeriod))}
              <View style={styles.spacer} />
            </ScrollView>
          </View>
        </View>
        
        <View style={styles.selectionIndicator} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.padding.md,
  },
  label: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Layout.padding.sm,
  },
  carouselContainer: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    paddingVertical: Layout.padding.md,
    position: 'relative',
    height: 140,
    marginHorizontal: Layout.padding.sm,
  },
  timeCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    paddingHorizontal: Layout.padding.md,
  },
  pickerColumn: {
    width: 70,
    height: 140,
    alignItems: 'center',
  },
  picker: {
    height: 140,
    width: 70,
  },
  pickerContent: {
    alignItems: 'center',
  },
  spacer: {
    height: 40,
  },
  pickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: Layout.borderRadius.md,
  },
  selectedItem: {
    backgroundColor: Colors.primary,
  },
  pickerText: {
    ...Typography.body,
    color: Colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.text.inverse,
    fontWeight: '600',
    fontSize: 16,
  },
  separator: {
    ...Typography.body,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginHorizontal: Layout.padding.md,
    width: 20,
    textAlign: 'center',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 50,
    left: '15%',
    right: '15%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    pointerEvents: 'none',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
}) 