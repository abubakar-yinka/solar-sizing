import * as slice from "..";
import { ThemeState, ThemeKeyType } from "../types";
import { RootState } from "types/index";
import themes from "../../";
import { DefaultTheme } from "styled-components";
import { selectTheme, selectThemeKey } from "../selectors";

describe("theme slice", () => {
  let state: ThemeState;

  beforeEach(() => {
    state = slice.initialState;
  });

  it("should return the initial state", () => {
    expect(slice.reducer(undefined, { type: "" })).toEqual(state);
  });

  it("should change theme color", () => {
    expect(
      slice.reducer(state, slice.themeActions.changeTheme("dark")),
    ).toEqual<ThemeState>({ ...state, selected: "dark" });
  });

  describe("selectors", () => {
    it("selectTheme, selectDirection, selectShadow, and selectBorder", () => {
      let state: RootState = {};
      expect({
        color: selectTheme(state),
      }).toEqual<DefaultTheme>({
        color: themes.colors.light,
      });

      state = {
        theme: {
          selected: "system",
        },
      };

      expect({
        color: selectTheme(state),
      }).toEqual<DefaultTheme>({
        color: themes.colors.light,
      });

      state = {
        theme: {
          selected: "dark",
        },
      };
      expect({
        color: selectTheme(state),
      }).toEqual<DefaultTheme>({
        color: themes.colors.dark,
      });
    });

    it("selectThemeKey", () => {
      let state: RootState = {};
      expect(selectThemeKey(state)).toEqual<ThemeKeyType>(
        slice.initialState.selected,
      );

      state = {
        theme: {
          selected: "system",
        },
      };
      expect(selectThemeKey(state)).toEqual<ThemeKeyType>(
        state.theme!.selected,
      );
    });
  });
});
