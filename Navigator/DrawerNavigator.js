import { createDrawerNavigator } from '@react-navigation/drawer';

import Intro from '../screen/intro';
import Orders from '../screen/Orders';
import Profile from '../screen/Profile';

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="intro" component={Intro} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;