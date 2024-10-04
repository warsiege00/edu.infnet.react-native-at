import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';




const HomeScreen = () => {
  const navigation = useNavigation();
  const {user, logout} = useAuth();

  return (
    <View>
      <Text>Bem-vindo ao Dashboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});


export default HomeScreen;
