import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
// Languages
import English from "./lang/en";

// Set the key-value pairs for the different languages to support.
const i18n = new I18n({
  en: English,
});

// Set the locale once at the beginning of the app.
i18n.locale = Localization.locale || document.documentElement.lang || "en";

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

export default i18n;
