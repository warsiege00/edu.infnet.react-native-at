import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AppTabs } from './routes/AppTabs';
import { AuthStack } from './routes/AuthStack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { ThemeContext } from './contexts/ThemeContext';
import { PaperProvider } from 'react-native-paper';


const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <ThemeProvider>
      {/* <PaperProvider theme={theme}> */}
      <PaperProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}