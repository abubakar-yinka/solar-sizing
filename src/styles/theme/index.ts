// TODO: Put all your theme colors with images here.
const lightTheme = {
  title: "black",
  description: "gray",
  background: "white",
};

const darkTheme = {
  title: "black",
  description: "gray",
  background: "white",
};

const constantTheme = {
  background: "#FFFFFF",
  primary: "#3B46F1",
  secondary: "#EDEDED",
  textGrey: "#333333",
  textLightGrey: "#4D4D4D",
};

const Theme = {
  colors: {
    light: lightTheme,
    constants: constantTheme,
    dark: darkTheme, // If available
  },
};

export type ThemeType = typeof Theme;

export default Theme;
