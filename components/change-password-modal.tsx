import { UpdatePasswordRequest } from "@/types"
import { ChangePasswordFormData, changePasswordSchema } from "@/utils/validation-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { stylesChangePassword } from "./styles/change-password-modal"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

interface ChangePasswordModalProps {
    visible: boolean
    onClose: () => void
    onSave: (data: UpdatePasswordRequest) => Promise<void>
}

export default function ChangePasswordModal({ visible, onClose, onSave }: ChangePasswordModalProps) {

    const colorScheme = useColorScheme()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            await onSave({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            })
            handleClose()
        } catch (error) {
            // Error handling is done in parent component
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            onClose()
            reset({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal
                    visible={visible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    backdropColor={colorScheme === "dark" ? "#0c0a0a" : "#ffffff"}
                >
                    <KeyboardAvoidingView style={stylesChangePassword.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ThemedView style={stylesChangePassword.header}>
                            <TouchableOpacity onPress={handleClose} disabled={isSubmitting}>
                                <ThemedText style={stylesChangePassword.cancelButton}>Cancel</ThemedText>
                            </TouchableOpacity>
                            <ThemedText style={stylesChangePassword.title}>Change Password</ThemedText>
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                                <Text style={[stylesChangePassword.saveButton, isSubmitting && stylesChangePassword.buttonDisabled]}>Save</Text>
                            </TouchableOpacity>
                        </ThemedView>

                        <ThemedView style={stylesChangePassword.form}>
                            <ThemedView style={stylesChangePassword.inputContainer}>
                                <ThemedText style={stylesChangePassword.label}>Current Password</ThemedText>
                                <Controller
                                    control={control}
                                    name="oldPassword"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[stylesChangePassword.input, errors.oldPassword && stylesChangePassword.inputError]}
                                            placeholder="Enter your current password"
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
                                {errors.oldPassword && <Text style={stylesChangePassword.errorText}>{errors.oldPassword.message}</Text>}
                            </ThemedView>

                            <ThemedView style={stylesChangePassword.inputContainer}>
                                <ThemedText style={stylesChangePassword.label}>New Password</ThemedText>
                                <Controller
                                    control={control}
                                    name="newPassword"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[stylesChangePassword.input, errors.newPassword && stylesChangePassword.inputError]}
                                            placeholder="Enter your new password"
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
                                {errors.newPassword && <Text style={stylesChangePassword.errorText}>{errors.newPassword.message}</Text>}
                            </ThemedView>

                            <ThemedView style={stylesChangePassword.inputContainer}>
                                <ThemedText style={stylesChangePassword.label}>Confirm New Password</ThemedText>
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[stylesChangePassword.input, errors.confirmPassword && stylesChangePassword.inputError]}
                                            placeholder="Confirm your new password"
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
                                {errors.confirmPassword && <Text style={stylesChangePassword.errorText}>{errors.confirmPassword.message}</Text>}
                            </ThemedView>
                        </ThemedView>

                        {isSubmitting && (
                            <ThemedView style={stylesChangePassword.loadingOverlay}>
                                <ActivityIndicator size="large" color="#2563eb" />
                                <ThemedText style={stylesChangePassword.loadingText}>Updating password...</ThemedText>
                            </ThemedView>
                        )}
                    </KeyboardAvoidingView>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}