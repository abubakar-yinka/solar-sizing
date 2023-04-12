import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";
import { RootState } from "types/RootState";

const selector = (state: RootState) => state.app || initialState;

export const appSelector = createSelector(selector, app => app);

export const loadingSelector = createSelector(selector, app => app.loading);

export const errorSelector = createSelector(selector, app => app.error);

export const firstNameSelector = createSelector(selector, app => app.firstName);

export const lastNameSelector = createSelector(selector, app => app.lastName);

export const totalPowerConsumptionSelector = createSelector(
  selector,
  app => app.totalPowerConsumption,
);

export const sunHoursSelector = createSelector(selector, app => app.sunHours);

export const savedDateSelector = createSelector(selector, app => app.savedDate);

export const batteryAutonomyDaysSelector = createSelector(
  selector,
  app => app.batteryAutonomyDays,
);

export const appliancesSelector = createSelector(
  selector,
  app => app.appliances,
);

export const noOfAppliancesSelector = createSelector(
  selector,
  app => app.noOfAppliances,
);

export const totalWattHoursPerDaySelector = createSelector(
  selector,
  app => app.totalWattHoursPerDay,
);

export const recommendationsSelector = createSelector(
  selector,
  app => app.recommendations,
);
