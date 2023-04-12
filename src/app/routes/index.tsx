import React, { useEffect, useState } from "react";
// Utils
import { SafeAreaProvider } from "react-native-safe-area-context";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "../screens/Home";
import RecommendationScreen from "../screens/Home/Recommendations";
// Types
import { RootStackParamList } from "./types";
import AuthScreen from "app/screens/auth";
import { useAppSlice } from "app/screens/Home/slice";
import { loadAppState } from "utils/storage";
import { useDispatch } from "react-redux";
import { ActivityIndicator, AppState } from "react-native";
import Theme from "styles/theme";
import Container from "app/components/Container";

interface Props {
  viewedOnboarding: boolean;
}

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC<Props> = ({ viewedOnboarding }) => {
  const { actions } = useAppSlice();
  const dispatch = useDispatch();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const handleAppLoad = async () => {
      const appState = await loadAppState();
      setAppLoading(false);
      dispatch(actions.load(appState));
    };

    handleAppLoad();
  }, []);

  return (
    <SafeAreaProvider>
      {appLoading ? (
        <Container>
          <ActivityIndicator
            size={"small"}
            color={Theme.colors.constants.primary}
          />
        </Container>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={viewedOnboarding ? "Home" : "Login"}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Recommendation"
              component={RecommendationScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
};

export default Navigation;
