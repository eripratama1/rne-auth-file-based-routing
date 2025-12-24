import ChangePasswordModal from '@/components/change-password-modal'
import EditProfileModal from '@/components/edit-profile-modal'
import { styles } from '@/components/styles/profile-screen-style'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useAsyncOperation } from '@/hooks/use-async-operation'
import { useAuth } from '@/libs/auth-context'
import { userService } from '@/services/userService'
import { UpdatePasswordRequest, UpdateProfileRequest } from '@/types'
import { ImageUtils } from '@/utils/image-utils'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActionSheetIOS, Alert, Platform, Pressable, RefreshControl, ScrollView, ToastAndroid, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {

    const { user, logout, refreshUser, setUser } = useAuth()
    const [refreshing, setRefreshing] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)

    const router = useRouter()
    const colorScheme = useColorScheme()

    const {
        isLoading: isLoadingProfile,
        error: profileError,
        execute: loadProfile
    } = useAsyncOperation(userService.getProfile)

    const {
        isLoading: isUploadingImage,
        execute: uploadImage
    } = useAsyncOperation(userService.uploadProfileImage)

    const {
        isLoading: isDeletingImage,
        execute: deleteImage
    } = useAsyncOperation(userService.deleteProfileImage)

    const {
        isLoading: isUpdatingProfile,
        execute: updateProfile
    } = useAsyncOperation(userService.updateProfile)

    const {
        isLoading: isUpdatingPassword,
        execute: updatePassword
    } = useAsyncOperation(userService.updatePassword)

    useEffect(() => {
        if (user) {
            loadProfile()
        }
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true)

        try {
            await refreshUser()
            await loadProfile()
        } catch (error) {
            console.error("Refresh error:", error)
        } finally {
            setRefreshing(false)
        }
    }

    const handleImageUpload = () => {
        if (Platform.OS === "ios") {
            const options = user?.profileImage
                ? ["Take Photo", "Choose from Library", "Remove Photo", "Cancel"]
                : ["Take Photo", "Choose from Library", "Cancel"]

            const cancelButtonIndex = options.length - 1
            const destructiveButtonIndex = user?.profileImage ? 2 : undefined

            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                    destructiveButtonIndex,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        handleTakePhoto()
                    } else if (buttonIndex === 1) {
                        handlePickImage()
                    } else if (buttonIndex === 2 && user?.profileImage) {
                        // handle Delete image
                    }
                },
            )
        } else {
            // Android - show custom alert
            const buttons = [
                { text: "Take Photo", onPress: handleTakePhoto },
                { text: "Choose from Library", onPress: handlePickImage },
            ]

            buttons.push({
                text: "Cancel",
                onPress: async () => { }
            })

            Alert.alert("Profile Photo", "Select an option", buttons)
        }
    }


    const handleTakePhoto = async () => {
        try {
            const result = await ImageUtils.takePhoto()
            if (result) {
                const updatedUser = await uploadImage(result.uri)
                if (updatedUser) {
                    setUser(updatedUser)
                } else {
                    Alert.alert("Failed to upload image: No user data returned")
                }

                ToastAndroid.show("Photo updated", ToastAndroid.LONG)
            }
        } catch (error) {
            ToastAndroid.show("Failed to take photo", ToastAndroid.LONG)
        }
    }

    const handlePickImage = async () => {
        try {
            const result = await ImageUtils.pickImage()
            if (result) {
                const updatedUser = await uploadImage(result.uri)
                if (updatedUser) {
                    setUser(updatedUser)
                } else {
                    Alert.alert("Failed to upload image: No user data returned")
                }

                ToastAndroid.show("Photo updated", ToastAndroid.LONG)
            }
        } catch (error) {
            ToastAndroid.show("Failed to upload image", ToastAndroid.LONG)
        }
    }

    const handleUpdateProfile = async (profileData: UpdateProfileRequest) => {
        try {
            const updatedUser = await updateProfile(profileData)

            if (updatedUser) {
                setUser(updatedUser)
                ToastAndroid.show("Profile Updated", ToastAndroid.LONG)
            } else {
                Alert.alert("Failed to update profile")
            }
        } catch (error) {
            ToastAndroid.show("Failed to update profile", ToastAndroid.LONG)
        }
    }

    const handleUpdatePassword = async (passwordData: UpdatePasswordRequest) => {
        try {
            await updatePassword(passwordData)
            ToastAndroid.show("Password change successfully", ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show("Failed to update password", ToastAndroid.LONG)
        }
    }

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                    try {
                        await logout()
                        ToastAndroid.show("Logout successfully", ToastAndroid.LONG)
                        router.replace("/(auth)/login")
                    } catch (error) {
                        ToastAndroid.show("Logout failed", ToastAndroid.LONG)
                    }
                },
            },
        ])
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff" },
            ]}
        >
            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <ThemedView style={styles.cardProfile}>
                    <ThemedView style={styles.avatarContainer}>
                        {user?.profileImage ? (
                            <Image
                                source={{ uri: user.profileImage }}
                                style={styles.avatar}
                            />
                        ) : (
                            <ThemedView
                                style={styles.avatarPlaceholder}
                            >
                                <Ionicons name='person' size={48} color={"#9ca3af"} />
                            </ThemedView>
                        )}

                        <Pressable
                            style={[styles.editAvatarButton, (isUploadingImage || isDeletingImage) && styles.buttonDisabled]}
                            onPress={handleImageUpload}
                            disabled={isUploadingImage || isDeletingImage}
                        >
                            {isUploadingImage || isDeletingImage ? (
                                <ThemedView style={styles.loadingIndicator} />
                            ) : (
                                <Ionicons name='camera' size={20} color={"#ffffff"} />
                            )}
                        </Pressable>
                    </ThemedView>

                    <ThemedText style={styles.name}>{user?.name || "User"}</ThemedText>
                    <ThemedText style={styles.email}>{user?.email || "user@example.com"}</ThemedText>

                </ThemedView>


                <ThemedView style={styles.cardSections}>
                    <ThemedText style={styles.cardSectionTitle}>Account</ThemedText>

                    <Pressable
                        style={styles.menuItem}
                        onPress={() => setShowEditProfile(true)}
                    >
                        <ThemedView style={styles.menuItemLeft}>
                            <Ionicons name="person-outline" size={24} color="#6b7280" />
                            <ThemedText style={styles.menuItemText}>Edit Profile</ThemedText>
                        </ThemedView>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </Pressable>

                    <Pressable
                        style={styles.menuItem}
                        onPress={() => setShowChangePassword(true)}
                    >
                        <ThemedView style={styles.menuItemLeft}>
                            <Ionicons name="lock-closed-outline" size={24} color="#6b7280" />
                            <ThemedText style={styles.menuItemText}>Change Password</ThemedText>
                        </ThemedView>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <ThemedView style={styles.menuItemLeft}>
                            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
                            <ThemedText style={styles.menuItemText}>Notifications</ThemedText>
                        </ThemedView>
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </Pressable>
                </ThemedView>

                <EditProfileModal
                    visible={showEditProfile}
                    user={user}
                    onClose={() => setShowEditProfile(false)}
                    onSave={handleUpdateProfile}
                />

                <ChangePasswordModal
                    visible={showChangePassword}
                    onClose={() => setShowChangePassword(false)}
                    onSave={handleUpdatePassword}
                />
            </ScrollView>
        </SafeAreaView>
    )
}