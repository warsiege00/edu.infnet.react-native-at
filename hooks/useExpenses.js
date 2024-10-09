import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();

 
  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError('Usuário não autenticado');
      return;
    }

    const q = query(collection(firestore, 'expenses'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
    if (!user) {
      setError('Usuário não autenticado');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(firestore, 'expenses'), {
        description,
        amount: parseFloat(amount),
        category,
        date,
        userId: user.uid,
      });
    } catch (err) {
      setError('Erro ao adicionar despesa');
      console.error('Erro ao adicionar despesa:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!user) {
      setError('Usuário não autenticado');
      return;
    }

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
    deleteExpense,
  };
};