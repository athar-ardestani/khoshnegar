// App.js
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigator/StackNavigator';


function App() {
  
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;