import "styled-components";
import { ThemeType } from "./index";

export type ThemeClasses = {
  color: "theme-dark" | "theme-light";
};

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
