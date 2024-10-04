import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const CustomRadioBtn = ({ options = [], onValueChange }) => {
  const [value, setValue] = useState(options[0]?.value || '');

  const handleValueChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {options.map((option) => (
        <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <RadioButton
            value={option.value}
            status={value === option.value ? 'checked' : 'unchecked'}
            onPress={() => handleValueChange(option.value)}
          />
          <Text>{option.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default CustomRadioBtn;
