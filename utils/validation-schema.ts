import { z } from "zod"

export const loginSchema = z.object({
    email: z.email("Format email tidak valid").nonempty("Email wajib diisi"),
    password: z.string().nonempty("Password wajib diisi").min(6, "Password minimal 6 karakter")
})

export const registerSchema = z.object({
    name: z
        .string()
        .min(4, "Nama minimal 4 karakter")
        .max(60, "Nama maksimal 60 karakter")
        .nonempty("Nama wajib diisi"),
    email: z
        .email("Format email tidak valid")
        .nonempty("Email wajib diisi"),
    password: z
        .string()
        .nonempty("Password wajib diisi")
        .min(6, "Password minimal 6 karakter")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[a-z]/, "Password harus mengandung huruf kecil")
        .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z
        .string()
        .nonempty("Konfirmasi password wajib diisi")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})

export const editProfileSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi").min(2, "Nama minimal 2 karakter").max(50, "Nama maksimal 50 karakter"),
    email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
})

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: z
        .string()
        .min(1, "Password baru wajib diisi")
        .min(6, "Password minimal 6 karakter")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[a-z]/, "Password harus mengandung huruf kecil")
        .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})


export type LoginFormValue = z.infer<typeof loginSchema>
export type RegisterFormValue = z.infer<typeof registerSchema>
export type EditProfileFormData = z.infer<typeof editProfileSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>