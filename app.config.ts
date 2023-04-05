import { ExpoConfig } from "@expo/config-types";

const config: ExpoConfig = {
  owner: "interpocket",
  name: "solar-sizing",
  slug: "solar-sizing",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  notification: {
    icon: "./assets/notification_icon.png",
    color: "#1D1D93",
    iosDisplayInForeground: true,
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#1D1D93",
  },
  updates: {
    fallbackToCacheTimeout: 0,
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
      backgroundColor: "#1D1D93",
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
};

export default config;
