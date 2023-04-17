export interface AppState {
  firstName: string;
  lastName: string;
  totalPowerConsumption: string;
  sunHours: string;
  savedDate: Date;
  batteryAutonomyDays: string;
  appliances: Appliance[];
  noOfAppliances: number;
  totalWattHoursPerDay: number;
  recommendations: Recommendation[];
  loading: boolean;
  error: string;
}

export interface Appliance {
  appliance: { name: string; powerRating: number };
  hoursOnPerDay: number;
  quantity: number;
  wattHoursPerDay: number;
}

export interface Recommendation {
  name: number;
  models: {
    amp: number;
    volt: number;
    model: string;
    count: number;
  }[];
  panel: number;
}
