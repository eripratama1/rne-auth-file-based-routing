import * as ImagePicker from "expo-image-picker"

export interface ImagePickerResult {
    uri: string
    type: string
    name: string
}

export class ImageUtils {
    static async requestPermission(): Promise<boolean> {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        return status === "granted"
    }

    static async pickImage(): Promise<ImagePickerResult | null> {
        try {
            const hasPermission = await this.requestPermission()
            if (!hasPermission) {
                throw new Error("Permission to access media library is required");
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: false,
            })

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0]
                return {
                    uri: asset.uri,
                    type: asset.type || "image/jpeg",
                    name: asset.fileName || "profile.jpg",
                }
            }

            return null
        } catch (error) {
            console.error("Error picking image:", error)
            throw error
        }
    }

    static async takePhoto(): Promise<ImagePickerResult | null> {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== "granted") {
                throw new Error("Permission to access camera is required")
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: false,
            })

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0]
                return {
                    uri: asset.uri,
                    type: asset.type || "image/jpeg",
                    name: asset.fileName || "profile.jpg",
                }
            }

            return null
        } catch (error) {
            console.error("Error taking photo:", error)
            throw error
        }
    }

}