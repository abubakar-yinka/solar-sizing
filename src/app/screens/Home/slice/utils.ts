import { arraySize, batteriesSize } from "utils/helpers";
import { AppState, Recommendation } from "./types";

const initialState = {
  firstName: "",
  lastName: "",
  totalPowerConsumption: "0.00",
  sunHours: "0",
  savedDate: new Date(),
  batteryAutonomyDays: "0",
  appliances: [],
  noOfAppliances: 0,
  totalWattHoursPerDay: 0,
  recommendations: [],
  loading: false,
  error: "",
};

export const shouldCalculateTotalWattage = (state: AppState): boolean => {
  return (
    state.sunHours !== initialState.sunHours &&
    state.batteryAutonomyDays !== initialState.batteryAutonomyDays &&
    state.totalWattHoursPerDay !== initialState.totalWattHoursPerDay
  );
};

export const calculateTotalPowerConsumption = (
  totalWattHoursPerDay: number,
  batteryAutonomyDays: string,
): string => {
  const totalPowerConsumption =
    totalWattHoursPerDay * parseInt(batteryAutonomyDays);
  return totalPowerConsumption.toFixed(2);
};

export const getRecommendedPowerGenerators = (
  totalPowerConsumption: number,
  sunHours: number,
) => {
  if (!totalPowerConsumption || !sunHours) {
    return [];
  }
  const recommendations: Recommendation[] = [];

  for (let i = 0; i < arraySize.length; i++) {
    if (
      arraySize[i] >= totalPowerConsumption &&
      (arraySize[i] - totalPowerConsumption < 500 || !recommendations.length)
    ) {
      recommendations.push({
        name: arraySize[i],
        models: batteriesSize[arraySize[i]],
        panel: Math.ceil(Number(arraySize[i]) / sunHours),
      });
      // Add superior model if the difference is not to big
      if (
        (arraySize[i] === totalPowerConsumption ||
          arraySize[i] - totalPowerConsumption < 500) &&
        arraySize[i + 1]
      ) {
        recommendations.push({
          name: arraySize[i + 1],
          models: batteriesSize[arraySize[i + 1]],
          panel: Math.ceil(Number(arraySize[i + 1]) / sunHours),
        });
      }
    }
  }

  return recommendations;
};
