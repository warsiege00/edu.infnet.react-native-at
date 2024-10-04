import { Switch } from 'react-native-paper';
import { View, Text } from 'react-native';

const CustomSwitch = ({ value, onValueChange, disabled = false, color, label, labelStyle, switchStyle }) => {
  return (
    <View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        color={color}
        style={switchStyle}
      />
    </View>
  );
};

export default CustomSwitch;