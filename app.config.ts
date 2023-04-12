import { ExpoConfig } from "@expo/config-types";

const config: ExpoConfig = {
  owner: "interpocket",
  name: "solar-sizing",
  slug: "solar-sizing",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  notification: {
    icon: "./assets/notification_icon.png",
    color: "#3B46F1",
    iosDisplayInForeground: true,
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#3B46F1",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/1eaa1a01-74c2-4bf5-90b9-216a870fe291",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    buildNumber: "1.0.0",
    supportsTablet: true,
    infoPlist: {
      NSFaceIDUsageDescription:
        "Solar Sizing needs to use Face ID / Touch ID to authenticate you",
      NSPhotoLibraryUsageDescription:
        "App needs access to photo lib for profile images",
      NSCameraUsageDescription:
        "To capture profile photo please grant camera access",
    },
    bundleIdentifier: "com.solar.sizing",
  },
  android: {
    versionCode: 8,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#3B46F1",
    },
    package: "com.solar.sizing",
    useNextNotificationsApi: true,
    permissions: [
      "CAMERA",
      "USE_FINGERPRINT",
      "USE_BIOMETRIC",
      "FOREGROUND_SERVICE",
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
};

export default config;
