import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, firestore } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            name: user.displayName || '',
            email: user.email,
          }, { merge: true });
        }

        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser(user);

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
        }, { merge: true });
      }

      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
      });

      setUser(user);

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      Alert.alert('Sair', 'Logout realizado com sucesso!');
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, error, register, logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);