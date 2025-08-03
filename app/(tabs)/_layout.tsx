import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/tabBar/HapticTab';
import { Colors, DEFAULT_THEME } from '@/constants/style/Colors';
import { Tab } from '@/enums';
import { useColorScheme } from '@/theme/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? DEFAULT_THEME].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name={Tab.Home}
        options={{
          title: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name={Tab.Account}
        options={{
          title: t('tabs.account'),
        }}
      />
      <Tabs.Screen
        name={Tab.Settings}
        options={{
          title: t('tabs.settings'),
        }}
      />
    </Tabs>
  );
}
