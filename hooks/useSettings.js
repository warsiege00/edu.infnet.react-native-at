import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useSettings = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchMonthlyIncome = async () => {
    setLoading(true);

    if (user) {
      try {
        const docRef = doc(firestore, 'settings', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMonthlyIncome(docSnap.data().monthlyIncome || '');
        }
      } catch (err) {
        setError('Erro ao buscar a renda: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, [user]);

  const saveIncome = async (income) => {
    setLoading(true);
    setError('');
    if (!user) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(firestore, 'settings', user.uid);
      await setDoc(docRef, { monthlyIncome: parseFloat(income) }, { merge: true });
      setMonthlyIncome(parseFloat(income));
    } catch (err) {
      setError('Erro ao salvar renda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    monthlyIncome,
    loading,
    error,
    setMonthlyIncome,
    fetchMonthlyIncome,
    saveIncome,
  };
};