export const getWeekDates = (date: Date): string[] => {
  const startOfWeek = new Date(date)
  const day = startOfWeek.getDay()
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is Sunday
  startOfWeek.setDate(diff)
  
  const weekDates: string[] = []
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek)
    currentDate.setDate(startOfWeek.getDate() + i)
    weekDates.push(currentDate.toISOString().split('T')[0])
  }
  
  return weekDates
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export const isToday = (dateString: string): boolean => {
  const today = new Date().toISOString().split('T')[0]
  return dateString === today
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
} 