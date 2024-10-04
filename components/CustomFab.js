import { FAB } from 'react-native-paper';


const CustomFab = ({ icon = "plus", label, onPress, fabStyle, color, small = false }) => {
  return (
    <FAB
      style={[styles.fab, fabStyle]}
      small={small}
      icon={icon}
      label={label}
      color={color}
      onPress={onPress}
    />
  );
};

export default CustomFab;