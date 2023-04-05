import * as React from "react";
import * as renderer from "react-test-renderer";
import WithTheme from "../../../../styles/theme/ThemeProvider";
import Container from "..";

describe("Container component UI", () => {
  test("Should render properly", () => {
    const tree = renderer
      .create(
        <WithTheme>
          <Container>Solar Sizing</Container>
        </WithTheme>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
