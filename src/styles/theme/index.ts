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
  background: "#1D1D93",
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
