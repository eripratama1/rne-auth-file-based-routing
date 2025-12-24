export interface User {
    id: number
    name: string
    email: string
    profileImage?: string
    created_at: string
    updated_at: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
}

export interface AuthResponse {
    success: boolean
    message: string
    data?: {
        user: User
        token: string
    }
}

export interface UpdateProfileRequest {
    name?: string
    email?: string
}

export interface UpdatePasswordRequest {
    oldPassword: string
    newPassword: string
}