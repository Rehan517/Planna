import React, { useState } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Typography } from '../../constants/Typography'
import { Layout } from '../../constants/Layout'

interface InputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoFocus?: boolean
  multiline?: boolean
  error?: string
  maxLength?: number
}

export function Input({ placeholder, value, onChangeText, error, maxLength, multiline, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          focused && styles.focused,
          error && styles.error
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.disabled}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Layout.padding.md,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.padding.md,
    ...Typography.body,
    color: Colors.text.primary,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  focused: {
    borderColor: Colors.primary,
  },
  error: {
    borderColor: Colors.status.error,
  },
  errorText: {
    ...Typography.small,
    color: Colors.status.error,
    marginTop: 4,
    marginLeft: 4,
  },
}) 