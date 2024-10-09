import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useSettings } from '../hooks/useSettings';
import { useExpenses } from '../hooks/useExpenses';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExpenseGroup = ({ month, expenses }) => {
  const { monthlyIncome, fetchMonthlyIncome } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const { deleteExpense } = useExpenses();

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const balance = monthlyIncome - totalExpenses; 

  const handlePress = () => setExpanded(!expanded);

  const handleDelete = async (id) => {
    await deleteExpense(id);
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  return (
    <View style={styles.container}>
      <List.Accordion
        title={month}
        left={(props) => <List.Icon {...props} icon="chevron-down" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <Text style={styles.total}>Total de Despesas: R$ {totalExpenses.toFixed(2)}</Text>
        <Text style={styles.balance}>Balanço: R$ {balance.toFixed(2)}</Text>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.description}
              description={`R$ ${item.amount} - ${item.category}`}
              right={() => (
                <View style={styles.itemRight}>
                  <Text>{item.date}</Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
                    <List.Icon icon="trash-can" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        />
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  total: {
    fontSize: 16,
    marginVertical: 8,
  },
  balance: {
    fontSize: 16,
    color: 'green',
  },
  deleteIcon: {
    marginLeft: 8,
  },
});

export default ExpenseGroup;