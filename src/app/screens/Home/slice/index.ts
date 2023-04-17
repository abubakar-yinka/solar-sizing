import { createSlice } from "utils/@reduxjs/toolkit";
// import appSaga from "./saga";
import { useInjectReducer } from "utils/redex-injectors";
import { AppState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  calculateTotalPowerConsumption,
  getRecommendedPowerGenerators,
} from "./utils";

export const initialState: AppState = {
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

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserDetails(
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>,
    ) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setTotalPowerConsumption(state, action: PayloadAction<string>) {
      state.totalPowerConsumption = action.payload;
    },
    setSunHours(state, action: PayloadAction<string>) {
      state.sunHours = action.payload;

      const totalPowerConsumption = calculateTotalPowerConsumption(
        state.totalWattHoursPerDay,
        state.batteryAutonomyDays,
      );
      const recommendations = getRecommendedPowerGenerators(
        Number(totalPowerConsumption),
        Number(action.payload),
      );

      state.totalPowerConsumption = totalPowerConsumption;
      state.recommendations = recommendations;
    },
    setSavedDate(state, action: PayloadAction<Date>) {
      state.savedDate = action.payload;
    },
    setBatteryAutonomyDays(state, action: PayloadAction<string>) {
      state.batteryAutonomyDays = action.payload;

      const totalPowerConsumption = calculateTotalPowerConsumption(
        state.totalWattHoursPerDay,
        state.batteryAutonomyDays,
      );
      const recommendations = getRecommendedPowerGenerators(
        Number(totalPowerConsumption),
        Number(state.sunHours),
      );

      state.totalPowerConsumption = totalPowerConsumption;
      state.recommendations = recommendations;
    },
    setAppliances(
      state,
      action: PayloadAction<{
        appliances: AppState["appliances"];
        totalWattHoursPerDay: number;
      }>,
    ) {
      state.appliances = action.payload.appliances;
      state.noOfAppliances = action.payload.appliances.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );
      state.totalWattHoursPerDay = action.payload.totalWattHoursPerDay;

      const totalPowerConsumption = calculateTotalPowerConsumption(
        state.totalWattHoursPerDay,
        state.batteryAutonomyDays,
      );
      const recommendations = getRecommendedPowerGenerators(
        Number(totalPowerConsumption),
        Number(state.sunHours),
      );

      state.totalPowerConsumption = totalPowerConsumption;
      state.recommendations = recommendations;
    },
    setRecommendations(
      state,
      action: PayloadAction<AppState["recommendations"]>,
    ) {
      state.recommendations = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetState(state) {
      state.firstName = "D";
      state.lastName = "K";
      state.totalPowerConsumption = "0.00";
      state.sunHours = "0";
      state.savedDate = new Date();
      state.batteryAutonomyDays = "0";
      state.appliances = [];
      state.noOfAppliances = 0;
      state.totalWattHoursPerDay = 0;
      state.recommendations = [];
      state.loading = false;
      state.error = "";
    },
    load(state, action: PayloadAction<AppState>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.totalPowerConsumption = action.payload.totalPowerConsumption;
      state.sunHours = action.payload.sunHours;
      state.savedDate = action.payload.savedDate;
      state.batteryAutonomyDays = action.payload.batteryAutonomyDays;
      state.appliances = action.payload.appliances;
      state.noOfAppliances = action.payload.noOfAppliances;
      state.totalWattHoursPerDay = action.payload.totalWattHoursPerDay;
      state.recommendations = action.payload.recommendations;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
  },
});

export const { actions: appActions } = slice;

export const useAppSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
