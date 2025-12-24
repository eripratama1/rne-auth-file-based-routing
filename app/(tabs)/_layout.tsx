import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets()
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        tabBarActiveTintColor: '#25D366', // WhatsApp green
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle:{
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#0B141A' : '#FFFFFF',
          height: 60 + insets.bottom,
          paddingBottom: 3 + insets.bottom,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name='house.fill' color={color} />
        }}
      />

      <Tabs.Screen
        name='profile2'
        options={{
          title: "Profile2",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name='house.fill' color={color} />
        }}
      />

      <Tabs.Screen
        name='profile3'
        options={{
          title: "Profile3",
          tabBarIcon: ({ color }) => <IconSymbol size={26} name='house.fill' color={color} />
        }}
      />
    </Tabs>
  );
}



