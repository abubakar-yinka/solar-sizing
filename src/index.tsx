import React from "react";
import { StatusBar } from "react-native";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "./styles/theme/index";
// Navigation
import Navigation from "./app/routes";

interface Props {}

const App: React.FC<Props> = () => (
  <ThemeProvider theme={theme}>
    <StatusBar
      backgroundColor={theme.colors.constants.background}
      barStyle="light-content"
    />
    <Navigation />
  </ThemeProvider>
);

export default App;
