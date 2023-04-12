import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Recommendation: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type RecommendationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Recommendation"
>;
