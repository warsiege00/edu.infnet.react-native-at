import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';

const CustomProgressBar = ({ progress = 0.5, color = Colors.blue500, label }) => {
  return (
    <View style={{ padding: 16 }}>
      {label && <Text style={{ marginBottom: 8 }}>{label}</Text>}
      <ProgressBar progress={progress} color={color} />
    </View>
  );
};

export default CustomProgressBar;
