import React, { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Colors } from '../../constants/Colors'
import { Typography } from '../../constants/Typography'
import { Layout } from '../../constants/Layout'
import { useAuthStore } from '../../store/authStore'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  
  const handleLogin = async () => {
    setLoading(true)
    try {
      await login(email, password)
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
          <Text style={styles.title}>Planna</Text>
          <Text style={styles.subtitle}>
            The calendar app that doesn't try to do everything.
          </Text>
        </View>
        
        <View style={styles.form}>
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
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />
          
          <Button
            title="Create Account"
            variant="text"
            onPress={() => router.push('/(auth)/register')}
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
    ...Typography.largeTitle,
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