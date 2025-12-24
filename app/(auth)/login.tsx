import { styleLoginScreen } from '@/components/styles/login-screen-style'
import { useAuth } from '@/libs/auth-context'
import { authService } from '@/services/authService'
import { LoginFormValue, loginSchema } from '@/utils/validation-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {

  const colorScheme = useColorScheme()
  const router = useRouter()
  const { setUser } = useAuth()

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onLoggedIn = async (data: LoginFormValue) => {
    try {
      const result = await authService.login(data)
      setUser(result.user)
      router.replace("/modal")
    } catch (error) {
      ToastAndroid.show("Login failed", ToastAndroid.LONG)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styleLoginScreen.container,
          { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
        ]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"}
            backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
            translucent={false}
          />

          <ScrollView
            contentContainerStyle={styleLoginScreen.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styleLoginScreen.header}>
              <Text
                style={[
                  styleLoginScreen.title,
                  { color: colorScheme === "dark" ? "#cdecf0" : "#111827" },
                ]}
              >
                Login to your Account
              </Text>
              <Text style={styleLoginScreen.subtitle}>Sign in to access dashboard</Text>
            </View>

            <View style={styleLoginScreen.form}>
              <View style={styleLoginScreen.inputContainer}>
                <Text style={styleLoginScreen.label}>Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styleLoginScreen.input, errors.email && styleLoginScreen.inputError]}
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isSubmitting}
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styleLoginScreen.errorText}>{errors.email.message}</Text>
                )}
              </View>

              <View style={styleLoginScreen.inputContainer}>
                <Text style={styleLoginScreen.label}>Password</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styleLoginScreen.input, errors.password && styleLoginScreen.inputError]}
                      placeholder="Enter your password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isSubmitting}
                    />
                  )}
                />
                {errors.password && (
                  <Text style={styleLoginScreen.errorText}>{errors.password.message}</Text>
                )}
              </View>
            </View>
          </ScrollView>

          <View style={styleLoginScreen.footerContainer}>
            <TouchableOpacity
              style={[styleLoginScreen.registerButton, isSubmitting && styleLoginScreen.buttonDisabled]}
              onPress={handleSubmit(onLoggedIn)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styleLoginScreen.registerButtonText}>Login Account</Text>
              )}
            </TouchableOpacity>

            <View style={styleLoginScreen.footer}>
              <Text style={styleLoginScreen.footerText}>Not have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity disabled={isSubmitting}>
                  <Text style={styleLoginScreen.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>


        </KeyboardAvoidingView>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}