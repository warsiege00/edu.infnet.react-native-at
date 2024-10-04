import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Button, Divider, Provider } from 'react-native-paper';

const CustomMenu = ({ options = [], onSelect }) => {
  const [visible, setVisible] = useState(false);

  const handleMenuItemPress = (value) => {
    setVisible(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <Provider>
      <View style={{ padding: 16 }}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Button onPress={() => setVisible(true)}>Mostrar Menu</Button>}
        >
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              title={option.label}
              onPress={() => handleMenuItemPress(option.value)}
            />
          ))}
          <Divider />
          <Menu.Item title="Cancelar" onPress={() => setVisible(false)} />
        </Menu>
      </View>
    </Provider>
  );
};

export default CustomMenu;
