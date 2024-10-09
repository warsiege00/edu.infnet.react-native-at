import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput as PaperInput, Button as PaperButton, ActivityIndicator, Text } from 'react-native-paper';
import { useSettings } from '../hooks/useSettings';

const SettingsScreen = () => {
  const { 
    monthlyIncome, 
    setMonthlyIncome, 
    loading, 
    error, 
    saveIncome, 
    fetchMonthlyIncome 
  } = useSettings();

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  const handleSaveIncome = async () => {
    await saveIncome(monthlyIncome);
    if (!error) {
      Alert.alert('Sucesso', 'Renda mensal salva com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <PaperInput
        label="Renda Mensal Atual"
        value={monthlyIncome.toString()}
        onChangeText={setMonthlyIncome}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <PaperButton mode="contained" onPress={handleSaveIncome}>
          Salvar Nova Renda Mensal
        </PaperButton>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SettingsScreen;