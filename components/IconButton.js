import React from 'react';
import { IconButton } from 'react-native-paper';

const CustomIconButton = ({ icon = "camera", size = 24, onPress }) => {
  return (
    <IconButton
      icon={icon}
      size={size}
      onPress={onPress}
      style={{ margin: 8 }}
    />
  );
};

export default CustomIconButton;
