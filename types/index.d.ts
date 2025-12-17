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