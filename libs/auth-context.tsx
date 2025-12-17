import { authService } from "@/services/authService";
import { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null
    isLoading: boolean,
    isAuthenticated: boolean
    setUser: (user: User | null) => void
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!user

    useEffect(() => {
        initializeAuth()
    }, [])

    const initializeAuth = async () => {
        try {
            setIsLoading(true)
            const storedUser = await authService.getCurrentUser()
            const storedToken = await authService.getStoredToken()

            if (storedUser && storedToken) {
                try {
                    const refreshedUser = await authService.refreshUserData()
                    setUser(refreshedUser)
                } catch (error) {
                    await authService.clearAuthData()
                    setUser(null)
                }
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error("Error initializing auth:", error)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await authService.login({
                email,
                password
            })
            setUser(result.user)
        } catch (error) {
            throw error
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const result = await authService.register({ name, email, password })
            setUser(result.user)
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
            setUser(null)
        } catch (error) {
            // Even if logout API call fails, clear local state
            console.error("Logout error:", error)
            setUser(null)
        }
    }

    const refreshUser = async () => {
        try {
            if (user) {
                const refreshedUser = await authService.refreshUserData()
                setUser(refreshedUser)
            }
        } catch (error) {
            console.error("Error refreshing user:", error)
            // If refresh fails, user might need to login again
            await logout()
            throw error
        }
    }

    const contextValue: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        login,
        register,
        logout,
        refreshUser,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}