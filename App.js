import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import HomeScreen from "./src/screens/HomeScreen";
import CurrentLocationScreen from "./src/screens/CurrentLocationScreen";
import DestinationLocationScreen from "./src/screens/DestinationLocationScreen";
import RoutingScreen from "./src/screens/RoutingScreen";
import AnalyticsPage from "./src/screens/AnalyticsPage/AnalyticsPage";
import ProfilePage from "./src/screens/ProfilePage";
import FavouritesPage from "./src/screens/FavouritesPage";
import LoginUserScreen from "./src/screens/LoginUserScreen";
import RegisterUserScreen from "./src/screens/RegisterUserScreen";
import { UserProvider } from "./src/utils/UserContext";

// Stack object to manage the navigation stack
const Stack = createNativeStackNavigator();

// App component designed to solely manage stack navigation with the screens located in src/screens
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CurrentLocation"
            component={CurrentLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DestinationLocation"
            component={DestinationLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Routing"
            component={RoutingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AnalyticsPage"
            component={AnalyticsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FavouritesPage"
            component={FavouritesPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginUserScreen"
            component={LoginUserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterUserScreen"
            component={RegisterUserScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
