export const API_BASE_URL = __DEV__
    ? "https://rest-api-auth-hono-drizzle.vercel.app/api/v1" // Ganti dengan IP address Anda
    : "https://rest-api-auth-hono-drizzle.vercel.app/api/v1"

export const STORAGE_KEYS = {
    TOKEN: "auth_token",
    USER: "user_data",
} as const