import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../lib/firebase';


const useUser = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);


  const updateUserPhotoURL = async (photoURL) => {
    if (!user) return; 
    try {
      setLoading(true);
      setError(null);
  
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, { photoURL });
  
      setUserData((prevData) => ({
        ...prevData,
        photoURL,
      }));
  
      console.log('URL da foto atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a URL da foto:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.log('Usuário não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return {
    userData,
    loading,
    error,
    updateUserPhotoURL,
  };
};

export default useUser;