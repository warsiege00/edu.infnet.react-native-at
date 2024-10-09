import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import useUser from '../hooks/useUser'; 
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { userData, updateUserPhotoURL, loading, error } = useUser();
  const [uploading, setUploading] = useState(false);
  const { logout } = useAuth();

  // Solicitar permissões para acessar a câmera e galeria
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
        Alert.alert('Permissões necessárias', 'Precisamos da permissão para acessar a câmera e galeria.');
      }
    };

    requestPermissions();
  }, []);

  const handleImagePick = async () => {
    Alert.alert(
      'Selecionar imagem',
      'Escolha uma opção',
      [
        { text: 'Câmera', onPress: handleCameraPick },
        { text: 'Galeria', onPress: handleGalleryPick },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleGalleryPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await handleUpload(uri);
    }
  };

  const handleCameraPick = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await handleUpload(uri);
    }
  };

  const handleUpload = async (uri) => {
    try {
      setUploading(true);
      await updateUserPhotoURL(uri);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Avatar.Image
            size={100}
            source={{ uri: userData?.photoURL || 'https://via.placeholder.com/100' }}
          />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>{userData?.displayName || 'Nome não disponível'}</Text>
            <Text style={styles.infoText}>{userData?.email || 'E-mail não disponível'}</Text>

            <Button mode="contained" onPress={handleImagePick} disabled={uploading}>
              {uploading ? 'Enviando imagem...' : 'Alterar Foto'}
            </Button>
            
          </View>
          <View style={styles.container}>
            <Button mode="outlined" onPress={logout}>
              Sair
            </Button>
          </View>
        </>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  infoTextContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});

export default ProfileScreen;