import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
