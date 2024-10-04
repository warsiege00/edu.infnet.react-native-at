import { View } from 'react-native';
import { List } from 'react-native-paper';

const CustomList = ({ items = [] }) => {
  return (
    <View>
      <List.Section>
        <List.Subheader>Lista de Itens</List.Subheader>
        {items && items.map((item, index) => (
          <List.Item
            key={index}
            title={item.title}
            description={item.description}
            left={props => <List.Icon {...props} icon={item.icon} />}
            onPress={item.onPress}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default CustomList;
