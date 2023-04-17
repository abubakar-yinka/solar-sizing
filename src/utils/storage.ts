import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "app/screens/Home/slice/types";

export const STORAGE_KEY = "solar-sizing:app";

export const loadAppState = async (): Promise<AppState> => {
  const appStateHistory = await AsyncStorage.getItem(STORAGE_KEY);
  try {
    const appState = JSON.parse(appStateHistory as string);
    console.log("App state loaded", appState);
    return appState;
  } catch (error) {
    console.log("Error occured while retriving", error);
    return {
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
          quantity: 1,
          wattHoursPerDay: 0,
        },
      ],
      totalWattHoursPerDay: 0,
      noOfAppliances: 0,
      recommendations: [],
      loading: false,
      error: "",
    };
  }
};

export const saveAppState = async (appState: AppState) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (error) {
    console.log(error);
  }
};
