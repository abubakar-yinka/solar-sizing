import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const addLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const isEmptyString = (str: string): boolean => str.trim().length === 0;

export function checkArrayItemsHaveEmptyName(
  array: {
    appliance: { name: string; powerRating: number };
    hoursOnPerDay: number;
    quantity: number;
    wattHoursPerDay: number;
  }[],
) {
  return array.every(item => item.appliance.name === "");
}

export function findEmptyNameIndices(
  arr: {
    appliance: { name: string; powerRating: number };
    hoursOnPerDay: number;
    quantity: number;
    wattHoursPerDay: number;
  }[],
) {
  const invalidIndices: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const { appliance, hoursOnPerDay, quantity } = arr[i];
    if (!appliance.name || quantity === 0 || hoursOnPerDay === 0) {
      invalidIndices.push(i);
    }
  }

  return invalidIndices;
}

export const getInitials = (firstName: string, lastName: string): string =>
  `${firstName.split("")[0]} ${lastName.split("")[0]}`;

export const storeInLocalStorage = async (
  key: string,
  token: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.log("Error while storing token: ", error);
  }
};

export const getFromLocalStorage = async (
  key: string,
): Promise<string | null | undefined> => {
  try {
    const jwtToken = await AsyncStorage.getItem(key);
    return jwtToken;
  } catch (error) {
    console.log("Error while getting token: ", error);
  }
};

export const removeFromLocalStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error while removing token: ", error);
  }
};

const isAvailable: Promise<boolean | void> = (async () =>
  await SecureStore.isAvailableAsync())().catch(err => {
  console.error(err);
});

// Save pocketMail and pocketCode in secure store
export async function saveInSecureStore(
  key: string,
  value: string,
): Promise<void> {
  if ((await isAvailable) === false) {
    Toast.show({
      type: "error",
      text1: "Secure store not available on this device",
    });
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log("Error while storing value from secure store: ", error);
  }
}

export async function getValueFromSecureStore(
  key: string,
): Promise<string | null | undefined> {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result && (await isAvailable)) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error while getting value from secure store: ", error);
  }
}

export async function removeValueFromSecureStore(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error while getting value from secure store: ", error);
  }
}

export function objectsEqual(obj1, obj2) {
  // Check if the objects are the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Check if the objects are null or undefined
  if (
    obj1 === null ||
    obj1 === undefined ||
    obj2 === null ||
    obj2 === undefined
  ) {
    return obj1 === obj2;
  }

  // Check if the objects are primitive types
  if (typeof obj1 !== "object" && typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  // Check if the objects have the same number of properties
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // Recursively compare the properties of the objects
  for (const prop in obj1) {
    const arePropsEqual = objectsEqual(obj1[prop], obj2[prop]);
    if (!arePropsEqual) {
      return false;
    }
  }

  return true;
}

const arraySize = [
  1200, 2400, 3600, 4800, 6000, 7200, 8400, 9600, 10800, 12000,
];

const batteriesSize = {
  1200: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 1,
    },
  ],
  2400: [
    {
      amp: 200,
      volt: 12,
      model: "12V200AH",
      count: 1,
    },
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 2,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AHPLUS",
      count: 1,
    },
    {
      amp: 100,
      volt: 24,
      model: "24V100AH",
      count: 1,
    },
  ],
  3600: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 3,
    },
  ],
  4800: [
    {
      amp: 200,
      volt: 12,
      model: "12V200AH",
      count: 2,
    },
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 4,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AHPLUS",
      count: 2,
    },
    {
      amp: 100,
      volt: 24,
      model: "24V100AH",
      count: 2,
    },
    {
      amp: 100,
      volt: 48,
      model: "48V100AH",
      count: 1,
    },
  ],
  6000: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 5,
    },
  ],
  7200: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 6,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AH",
      count: 3,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AHPLUS",
      count: 3,
    },
    {
      amp: 100,
      volt: 24,
      model: "24V100AH",
      count: 3,
    },
  ],
  8400: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 7,
    },
  ],
  9600: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 8,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AH",
      count: 4,
    },
    {
      amp: 100,
      volt: 24,
      model: "24V100AH",
      count: 4,
    },
    {
      amp: 100,
      volt: 48,
      model: "48V100AH",
      count: 2,
    },
  ],
  10800: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 9,
    },
  ],
  12000: [
    {
      amp: 100,
      volt: 12,
      model: "12V100AH",
      count: 10,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AH",
      count: 5,
    },
    {
      amp: 200,
      volt: 12,
      model: "12V200AHPLUS",
      count: 5,
    },
    {
      amp: 100,
      volt: 24,
      model: "12V200AH",
      count: 5,
    },
  ],
};

export { arraySize, batteriesSize };

export const appliances = [
  { name: "AKT 26-watt Half Spiral Energy-saving Pin Bulb", powerRating: 26 },
  { name: "Economic energy saving Bulb 50w", powerRating: 50 },
  {
    name: "AKT 30W LED FLOOD LIGHT/ SECURITY LIGHT- GLASS 30 Watts Flood Light",
    powerRating: 30,
  },
  { name: "AKT 6W POP PANEL LED LIGHT", powerRating: 6 },
  { name: "AKT 10 Watts Ultra-bright Energy Saving Bulb", powerRating: 10 },
  { name: "Dp 18W Portable Rechargeable LED Light", powerRating: 18 },
  { name: "15W Half Spiral Energy Saving Bulb - Screw", powerRating: 15 },
];
