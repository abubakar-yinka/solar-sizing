import React from "react";
// Utils
import { SafeAreaProvider } from "react-native-safe-area-context";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "../screens/Home";
// Types
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default Navigation;
