import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Snackbar } from 'react-native-paper';

const CustomSnackbar = ({ message = "Mensagem de exemplo", duration = 3000, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  const handleToggleSnackbar = () => {
    setVisible(!visible);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Mostrar Snackbar" onPress={handleToggleSnackbar} />
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
          if (onDismiss) onDismiss();
        }}
        duration={duration}
        action={{
          label: 'Fechar',
          onPress: () => setVisible(false),
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default CustomSnackbar;
