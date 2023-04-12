// TODO: Put all your theme colors with images here.
const lightTheme = {
  primary: "#3B46F1", // Also Active Color
  pressedPrimary: "rgba(29, 29, 147, .8)", // Also Active Color
  disabled: "#E4E3E8",
  disabledBtnText: "#948EA5",
  searchInput: "rgba(239, 240, 246, 0.56)",
  searchPlaceholderText: "#989AAA",
  otpInput: "#F5F5F5",
  lightGreyText: "#4D4D4D", // Also Input placeholder text color
  inputBorder: "#ECEBED",
  greyText: "#555555",
  darkGreyText: "#333333",
  whiteText: "#FFFFFF",
  blackText: "#000000",
  campaignText: "#00C2AB",
  beneficiaryText: "#323232",
  inactiveTabColor: "#5C5C5C",
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
  recommendationText: "#070D5F",
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
