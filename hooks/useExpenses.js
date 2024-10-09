import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection(firestore, 'expenses'), (snapshot) => {
      const expenseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expenseData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const addExpense = async (description, amount, category, date) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(firestore, 'expenses'), {
        description,
        amount: parseFloat(amount),
        category,
        date,
      });
    } catch (err) {
      setError('Erro ao adicionar despesa');
      console.error('Erro ao adicionar despesa:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(firestore, 'expenses', id));
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      setError('Erro ao excluir despesa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    addExpense,
    error,
    deleteExpense
  };
};