import { createDrawerNavigator } from '@react-navigation/drawer';

import Intro from '../screen/intro';


function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator >


      <Drawer.Screen name="intro" component={Intro} />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator;