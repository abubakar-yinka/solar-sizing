import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types/index";
import { initialState } from ".";
import themes from "../";
import { isSystemDark } from "../utils";

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => {
    if (theme.selected === "system") {
      return isSystemDark ? themes.colors.dark : themes.colors.light;
    }
    return themes.colors[theme.selected];
  },
);

export const selectThemeKey = createSelector(
  [(state: RootState) => state.theme || initialState],
  theme => theme.selected,
);
