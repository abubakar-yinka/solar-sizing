import "styled-components";
import { ThemeType } from "./index";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
