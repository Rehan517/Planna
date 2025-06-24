import React from 'react'
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Typography } from '../../constants/Typography'
import { Layout } from '../../constants/Layout'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
  loading?: boolean
  flex?: boolean
}

export function Button({ title, onPress, variant = 'primary', disabled, loading, flex }: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        flex && styles.flex,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.text.inverse : Colors.text.primary} />
      ) : (
        <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Layout.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Layout.padding.sm,
    paddingHorizontal: Layout.padding.lg,
  },
  flex: {
    flex: 1,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.text.inverse,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  textText: {
    color: Colors.text.primary,
  },
}) 