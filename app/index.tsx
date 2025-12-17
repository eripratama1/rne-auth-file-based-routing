import { useAuth } from '@/libs/auth-context'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Index() {

    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                router.replace("/(tabs)")
            } else {
                router.replace("/(auth)/login")
            }
        }
    }, [user, isLoading])

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size={"large"}
                color="#93abdfff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
})
