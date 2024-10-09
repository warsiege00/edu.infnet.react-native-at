import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../lib/firebase';

export const useSettings = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMonthlyIncome = async () => {
    setLoading(true);
    const user = auth.currentUser;

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

  const saveIncome = async (income) => {
    setLoading(true);
    setError('');

    const user = auth.currentUser;
    if (!user) {
      setError('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(firestore, 'settings', user.uid);
      await setDoc(docRef, { monthlyIncome: parseFloat(income) }, { merge: true });
    } catch (err) {
      setError('Erro ao salvar renda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    monthlyIncome,
    setMonthlyIncome,
    loading,
    error,
    saveIncome,
    fetchMonthlyIncome,
  };
};