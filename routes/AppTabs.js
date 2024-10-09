import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = (() => {
          switch (route.name) {
            case 'Home':
              return focused ? 'home' : 'home-outline';
            case 'Perfil':
              return focused ? 'person' : 'person-outline';
            case 'Configurações': 
              return focused ? 'settings' : 'settings-outline';
            default:
              return 'help-outline';
          }
        })();

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'purple',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: [{ display: 'flex' }],
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Configurações" component={SettingsScreen} />
  </Tab.Navigator>
);