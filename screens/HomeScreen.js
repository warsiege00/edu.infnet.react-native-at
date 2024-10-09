import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseGroup from '../components/ExpenseGroup';

const HomeScreen = () => {
  const { expenses, loading } = useExpenses(); 
  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const [day, month, year] = expense.date.split('/'); 
    const date = new Date(year, month - 1, day);

    const monthYear = date.toLocaleString('pt-Br', { month: 'long', year: 'numeric' })

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(expense);
    return acc;
  }, {});

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Object.keys(groupedExpenses)}
        keyExtractor={(item) => item}
        renderItem={({ item: monthYear }) => (
          <ExpenseGroup month={monthYear} expenses={groupedExpenses[monthYear]} />
        )}
        refreshControl={
         () => {}
        }
      />
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddExpense')} 
      />
    </View>
  );
};

const styles = {
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
};

export default HomeScreen;