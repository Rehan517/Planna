import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Colors } from '../../constants/Colors'
import { Typography } from '../../constants/Typography'
import { Layout } from '../../constants/Layout'
import { useAuthStore } from '../../store/authStore'

export default function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const register = useAuthStore((state) => state.register)
  
  const handleRegister = async () => {
    setLoading(true)
    try {
      await register(email, password, name)
      router.replace('/(app)/(tabs)')
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join Planna to sync calendars with your group
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
          />
          
          <Button
            title="Already have an account? Sign In"
            variant="text"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.padding.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.padding.xl * 2,
  },
  title: {
    ...Typography.title,
    marginBottom: Layout.padding.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
}) 