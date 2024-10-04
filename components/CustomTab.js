import React, { useState } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-paper';

const CustomTab = ({ routes = [], scenes = [] }) => {
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap(
    routes.reduce((acc, route, i) => {
      acc[route.key] = scenes[i];
      return acc;
    }, {})
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
};

export default CustomTab;
