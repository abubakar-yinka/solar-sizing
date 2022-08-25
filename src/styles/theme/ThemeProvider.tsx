import * as React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components/native";
import theme from "./index";

const WithTheme: React.FC = ({ children }) => (
  <OriginalThemeProvider theme={theme}>
    {React.Children.only(children)}
  </OriginalThemeProvider>
);

export default WithTheme;
