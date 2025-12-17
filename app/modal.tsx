import { Link, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, ToastAndroid } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/libs/auth-context';

export default function ModalScreen() {
  const { logout } = useAuth()
  const router = useRouter()

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
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>

      <Pressable onPress={handleLogout}>
        <ThemedText type="default">logout</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
