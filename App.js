import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AppTabs } from './routes/AppTabs';
import { AuthStack } from './routes/AuthStack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { ThemeContext } from './contexts/ThemeContext';
import { PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import AddExpenseScreen from './screens/AddExpenseScreen';
import { pt, registerTranslation } from 'react-native-paper-dates'

registerTranslation('pt', pt)
const Stack = createStackNavigator();

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
      {
        user ?
          (<Stack.Navigator>
            <Stack.Screen 
              name="Despesas" 
              component={AppTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="AddExpense" 
              component={AddExpenseScreen} 
              options={{ title: 'Adicionar Despesa' }} 
            />
          </Stack.Navigator>) 
          : <AuthStack /> 
      }
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