import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as PaperInput, Button as PaperButton, ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useExpenses } from '../hooks/useExpenses';
import { DatePickerModal } from 'react-native-paper-dates';
import { convertISOToDateString } from '../util/convertISOToDateString';

const AddExpenseScreen = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(null);
  const { addExpense, loading, error } = useExpenses();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const handleAddExpense = async () => {
    if (date) {
    
      await addExpense(description, amount, category, convertISOToDateString(date));
      if (!error) {
        navigation.goBack();
      }
    } else {
      alert('Por favor, selecione uma data.'); 
    }
  };

  const handleConfirm = (params) => {
    setDate(params.date); 
    setVisible(false); 
  };

  const handleDismiss = () => setVisible(false);

  return (
    <View style={styles.container}>
      <PaperInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        style={styles.input}
      />

      <PaperInput
        label="Valor"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />

      <PaperInput
        label="Categoria"
        value={category}
        onChangeText={setCategory}
        mode="outlined"
        style={styles.input}
      />

      <PaperInput
        label="Data"
        value={date ? date.toLocaleDateString('pt-BR') : ''}
        onPress={() => setVisible(true)}
        mode="outlined"
        style={styles.input}
        editable={false}
      />

      <DatePickerModal
        locale="pt"
        mode="single"
        visible={visible}
        onDismiss={handleDismiss}
        date={date}
        onConfirm={handleConfirm}
      />

      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <PaperButton mode="contained" onPress={handleAddExpense}>
          Adicionar Despesa
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

export default AddExpenseScreen;