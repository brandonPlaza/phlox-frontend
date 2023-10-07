import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CurrentLocationScreen from './src/screens/CurrentLocationScreen/CurrentLocationScreen';
import DestinationLocationScreen from './src/screens/DestinationLocationScreen/DestinationLocationScreen';
import RoutingScreen from './src/screens/RoutingScreen/RoutingScreen';

// Stack object to manage the navigation stack
const Stack = createNativeStackNavigator();

// App component designed to solely manage stack navigation with the screens located in src/screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='CurrentLocation'
          component={CurrentLocationScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='DestinationLocation'
          component={DestinationLocationScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Routing'
          component={RoutingScreen}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
