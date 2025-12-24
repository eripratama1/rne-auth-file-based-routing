import { STORAGE_KEYS } from "@/libs/config";
import { UpdatePasswordRequest, UpdateProfileRequest, User } from "@/types";
import * as SecureStore from "expo-secure-store";
import { apiClient } from "./api";

export class UserService {
    async getProfile(): Promise<User> {
        const response = await apiClient.get<{ success: boolean; message: string; data: User }>(
            "/user"
        )

        if (response && response.success && response.data) {
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.data))
            return response.data
        }
        throw new Error("Failed to fetch user profile")
    }

    async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
        const response = await apiClient.put<{ success: boolean; message: string; data: User }>(
            "/user",
            profileData
        )
        if (response && response.success && response.data) {
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.data))
            return response.data
        }
        throw new Error("Failed to update user profile")
    }

    async updatePassword(passwordData: UpdatePasswordRequest): Promise<void> {
        const response = await apiClient.put<{ success: boolean; message: string }>("user/update-password", passwordData)

        if (!response || !response.success) {
            throw new Error(response?.message || "Failed to update password")
        }
    }

    async uploadProfileImage(imageUri: string): Promise<User> {
        const formData = new FormData()

        // Create file object from URI
        const filename = imageUri.split("/").pop() || "profile.jpg"
        const match = /\.(\w+)$/.exec(filename)
        const type = match ? `image/${match[1]}` : "image/jpeg"

        formData.append("profileImage", {
            uri: imageUri,
            name: filename,
            type,
        } as any)

        const response = await apiClient.postFormData<{ success: boolean; message: string; data: User }>(
            "/user/upload-avatar",
            formData,
        )

        if (response && response.success && response.data) {
            // Update stored user data
            console.log("Updating stored user data with new profile image", response.data);

            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.data))
            return response.data
        }

        throw new Error(response?.message || "Failed to upload image")
    }

    async deleteProfileImage(): Promise<User> {
        const response = await apiClient.delete<{ success: boolean; message: string; data: User }>("/auth/delete-image")
        if (response && response.success && response.data) {
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.data))
            return response.data
        }
        throw new Error(response.message || "Failed to delete image");
    }
}

export const userService = new UserService()