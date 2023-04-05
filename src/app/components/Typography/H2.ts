import styled from "styled-components/native";
import { FONTS, SIZES } from "styles/typography";

const H2 = styled.Text<{ textColor?: string }>`
  font-size: ${SIZES.h2};
  font-family: ${FONTS.Urbanist_700Bold};
  color: ${props => props.textColor ?? "#fff"};
`;

export default H2;
