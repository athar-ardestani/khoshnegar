import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Intro from '../screen/intro';
import CodeInsert from '../screen/CodeInsert';
import Orders from '../screen/Orders';
import Basket from '../screen/Basket';
import Profile from '../screen/Profile';
import NewOrders from '../screen/NewOrders';
import Panche from '../screen/Panche';
import Notifications from '../screen/Notifications';
import Messages from '../screen/Messages';
import ListOrders from '../screen/ListOrders';



function StackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator >


      <Stack.Screen name="intro" component={Intro} options={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'red', } }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'red', } }} />
      <Stack.Screen name="CodeInsert" component={CodeInsert} options={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'red', } }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, headerStyle: { height: 0, backgroundColor: 'red', } }} />
      <Stack.Screen name="Basket" component={Basket} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
      <Stack.Screen name="NewOrders" component={NewOrders} options={{ headerShown: false }} />
      <Stack.Screen name="Panche" component={Panche} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
      <Stack.Screen name="ListOrders" component={ListOrders} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}

export default StackNavigator;