import { AppState } from "app/screens/Home/slice/types";
import { ThemeState } from "styles/theme/slice/types";

export interface RootState {
  theme?: ThemeState;
  app: AppState;
}
