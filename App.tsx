import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { ZenDots_400Regular } from "@expo-google-fonts/zen-dots";
import { enableScreens } from "react-native-screens";
import AppContainer from "./src";

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

// function cacheFonts(fonts) {
//   return fonts.map(font => Font.loadAsync(font));
// }

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    ZenDots_400Regular,
  });

  // Load any resources or data that you need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setAppIsReady(false);
        SplashScreen.preventAutoHideAsync();

        const images = [
          require("./assets/icon.png"),
          require("./assets/splash.png"),
        ];

        const imageAssets = cacheImages(images);
        // const fontAssets = cacheFonts([FontAwesome.font]);

        await Promise.all([...imageAssets /*...fontAssets*/]);
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

  return <AppContainer />;
};

export default App;
