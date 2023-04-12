import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "./styles/theme/index";
// Navigation
import Navigation from "./app/routes";
// Store
import { configureAppStore } from "store/configureStore";
import { saveAppState } from "utils/storage";
import { objectsEqual } from "utils/helpers";

interface Props {
  viewedOnboarding: boolean;
}

const store = configureAppStore();

store.subscribe(async () => {
  const state = store.getState();
  console.log("State subscribed!");

  const isStateEqual = objectsEqual(state.app, {
    firstName: "A",
    lastName: "I",
    totalPowerConsumption: "0.00",
    sunHours: "0",
    savedDate: new Date(),
    batteryAutonomyDays: "0",
    appliances: [
      {
        appliance: { name: "", powerRating: 0 },
        hoursOnPerDay: 1,
        wattHoursPerDay: 0,
      },
    ],
    totalWattHoursPerDay: 0,
    noOfAppliances: 0,
    recommendations: [],
    loading: false,
    error: "",
  });

  if (!isStateEqual) {
    console.log("State is not equal!");
    await saveAppState(state.app);
  } else {
    console.log("State is equal!");
  }
});

const App: React.FC<Props> = ({ viewedOnboarding }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.constants.background}
        barStyle="dark-content"
      />
      <Navigation viewedOnboarding={viewedOnboarding} />
    </ThemeProvider>
    <Toast />
  </Provider>
);
export default App;
