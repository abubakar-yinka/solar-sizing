import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "./styles/theme/index";
// Navigation
import Navigation from "./app/routes";
// Store
import { configureAppStore } from "store/configureStore";

interface Props {}

const store = configureAppStore();

const App: React.FC<Props> = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.constants.background}
        barStyle="light-content"
      />
      <Navigation />
    </ThemeProvider>
  </Provider>
);

export default App;
