import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { enableScreens } from "react-native-screens";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import {
  useFonts,
  Urbanist_100Thin,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
  Urbanist_100Thin_Italic,
  Urbanist_200ExtraLight_Italic,
  Urbanist_300Light_Italic,
  Urbanist_400Regular_Italic,
  Urbanist_500Medium_Italic,
  Urbanist_600SemiBold_Italic,
  Urbanist_700Bold_Italic,
  Urbanist_800ExtraBold_Italic,
  Urbanist_900Black_Italic,
} from "@expo-google-fonts/urbanist";
import AppContainer from "./src";
import { LogBox } from "react-native";
import { getFromLocalStorage } from "utils/helpers";

LogBox.ignoreLogs([
  // See: https://github.com/react-navigation/react-navigation/issues/7839
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "Require cycle:",
]);

enableScreens();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [viewedOnboarding, setViewedOnboarding] = useState<boolean>(false);

  let [fontsLoaded] = useFonts({
    Urbanist_100Thin,
    Urbanist_200ExtraLight,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
    Urbanist_100Thin_Italic,
    Urbanist_200ExtraLight_Italic,
    Urbanist_300Light_Italic,
    Urbanist_400Regular_Italic,
    Urbanist_500Medium_Italic,
    Urbanist_600SemiBold_Italic,
    Urbanist_700Bold_Italic,
    Urbanist_800ExtraBold_Italic,
    Urbanist_900Black_Italic,
  });

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setAppIsReady(false);
        SplashScreen.preventAutoHideAsync();
        const value = await getFromLocalStorage("@viewedOnboarding");
        if (value !== null) setViewedOnboarding(true);

        const images = [
          require("./assets/icon.png"),
          require("./assets/splash.png"),
        ];

        const imageAssets = cacheImages(images);

        await Promise.all([...imageAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return <AppContainer viewedOnboarding={viewedOnboarding} />;
};

export default App;
