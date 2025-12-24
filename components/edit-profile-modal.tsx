import { UpdateProfileRequest, User } from '@/types'
import { EditProfileFormData, editProfileSchema } from '@/utils/validation-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, ToastAndroid, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { stylesEditModal } from './styles/edit-profile-modal'
import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

interface EditProfileModalProps {
    visible: boolean
    user: User | null
    onClose: () => void
    onSave: (data: UpdateProfileRequest) => Promise<void>
}

export default function EditProfileModal({
    visible,
    user,
    onClose,
    onSave
}: EditProfileModalProps) {

    const colorScheme = useColorScheme()
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditProfileFormData>
        ({
            resolver: zodResolver(editProfileSchema),
            defaultValues: {
                name: "",
                email: ""
            }
        })

    useEffect(() => {
        if (user && visible) {
            reset({
                name: user.name,
                email: user.email
            })
        }
    }, [user, visible, reset])

    const onSubmit = async (data: EditProfileFormData) => {
        try {
            await onSave({
                name: data.name.trim(),
                email: data.email.trim()
            })
            onClose()
        } catch (error) {
            ToastAndroid.show("Failed to update profile", ToastAndroid.LONG)
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            onClose()
            if (user) {
                reset({
                    name: user.name,
                    email: user.email
                })
            }
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Modal
                    visible={visible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    // transparent={true}
                    backdropColor={colorScheme === "dark" ? "#0c0a0a" : "#ffffff"}
                >
                    <KeyboardAvoidingView
                        style={stylesEditModal.container}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ThemedView style={stylesEditModal.header}>
                            {/* <Pressable
                                android_ripple={{ color: "#cccccc" }}
                                onPress={handleClose}
                                disabled={isSubmitting}
                            >
                                <ThemedText style={stylesEditModal.cancelButton}>Cancel</ThemedText>
                            </Pressable> */}
                            <ThemedText style={stylesEditModal.title}>
                                Edit Profile
                            </ThemedText>

                            {/* <Pressable
                                android_ripple={{ color: "#cccccc" }}
                                onPress={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                            >
                                <ThemedText
                                    style={
                                        [stylesEditModal.saveButton, isSubmitting && stylesEditModal.buttonDisabled]
                                    }>
                                    Save
                                </ThemedText>
                            </Pressable> */}
                        </ThemedView>

                        <ThemedView style={stylesEditModal.form}>
                            <ThemedView style={stylesEditModal.inputContainer}>
                                <ThemedText style={stylesEditModal.label}>Full Name</ThemedText>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[stylesEditModal.input, errors.name && stylesEditModal.inputError]}
                                            placeholder="Enter your full name"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            autoCapitalize="words"
                                            autoCorrect={false}
                                            editable={!isSubmitting}
                                        />
                                    )}
                                />
                                {errors.name && <Text style={stylesEditModal.errorText}>{errors.name.message}</Text>}
                            </ThemedView>

                            <ThemedView style={stylesEditModal.inputContainer}>
                                <ThemedText style={stylesEditModal.label}>Email</ThemedText>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[stylesEditModal.input, errors.email && stylesEditModal.inputError]}
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
                                {errors.email && <Text style={stylesEditModal.errorText}>{errors.email.message}</Text>}
                            </ThemedView>

                            <ThemedView style={stylesEditModal.footerContainer}>
                                <Pressable
                                    style={stylesEditModal.cancelBtn}
                                    onPress={handleClose}
                                    disabled={isSubmitting}
                                >
                                    <ThemedText style={stylesEditModal.cancelText}>Cancel</ThemedText>
                                </Pressable>

                                <Pressable
                                    style={[
                                        stylesEditModal.saveBtn,
                                        isSubmitting && stylesEditModal.buttonDisabled,
                                    ]}
                                    onPress={handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                >
                                    <ThemedText style={stylesEditModal.saveText}>
                                        {isSubmitting ? 'Saving...' : 'Save'}
                                    </ThemedText>
                                </Pressable>
                            </ThemedView>

                        </ThemedView>

                        {isSubmitting && (
                            <ThemedView style={stylesEditModal.loadingOverlay}>
                                <ActivityIndicator size="large" color="#2563eb" />
                                <Text style={stylesEditModal.loadingText}>Updating profile...</Text>
                            </ThemedView>
                        )}
                    </KeyboardAvoidingView>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
