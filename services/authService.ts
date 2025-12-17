import { STORAGE_KEYS } from "@/libs/config";
import { LoginRequest, RegisterRequest, User } from "@/types";
import * as SecureStore from "expo-secure-store";
import { apiClient } from "./api";

export class AuthService {
    async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
        console.log("[AUTH], login request", credentials);
        const response = await apiClient.post<{ user: User; token: string }>(
            "/auth/login",
            credentials
        )

        if (response && response.token && response.user) {
            await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, response.token)
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.user))

            return response
        }

        throw new Error("Login Failed")
    }

    async register(userData: RegisterRequest): Promise<{ user: User; message: string }> {
        console.log("[AUTH] Register request", userData)
        const response = await apiClient.post<{ user: User; message: string }>(
            "/auth/register",
            userData
        )

        if (response && response.user && response.message) {
            return response
        }
        throw new Error("Registration failed")
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const userString = await SecureStore.getItemAsync(STORAGE_KEYS.USER)
            if (userString) {
                console.log("[AUTH] Current user loaded:", JSON.parse(userString))
                return JSON.parse(userString)
            }
            return null
        } catch (error) {
            console.log("Error getting current user:", error)
            return null
        }
    }

    async getStoredToken(): Promise<string | null> {
        try {
            const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN)
            if (token) {
                console.log("[AUTH] Token loaded:", token)
            } else {
                console.log("[AUTH] No token found in storage")
            }
            return token
        } catch (error) {
            console.log("Error getting stored token:", error)
            return null
        }
    }

    async clearAuthData(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN)
            await SecureStore.deleteItemAsync(STORAGE_KEYS.USER)
        } catch (error) {
            console.log("Error clearing auth data:", error)
        }
    }

    async refreshUserData(): Promise<User> {
        const response = await apiClient.get<{ success: boolean; message: string; data: User }>("/user")

        if (response && response.success && response.data) {
            // Update stored user data
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(response.data))
            return response.data
        }

        throw new Error("Failed to refresh user data")
    }

    async logout(): Promise<void> {
        try {
            await apiClient.post("/auth/logout")
        } catch (error) {
            // Continue with local logout even if API call fails
            console.log("Logout API call failed:", error)
        } finally {
            await this.clearAuthData()
        }
    }
}

export const authService = new AuthService()