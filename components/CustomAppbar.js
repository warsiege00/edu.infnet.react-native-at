import { Appbar } from 'react-native-paper';

const CustomAppBar = ({ title, subtitle, onBackAction, actions = [] }) => {
  return (
    <Appbar.Header style={[styles.appBar]}>
      {onBackAction && <Appbar.BackAction onPress={onBackAction} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          color={action.color}
        />
      ))}
    </Appbar.Header>
  );
};

const styles = {
  appBar: {
    
  },
};

export default CustomAppBar;