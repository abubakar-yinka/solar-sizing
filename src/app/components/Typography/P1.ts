import styled from "styled-components/native";
import { FONTS, SIZES } from "styles/typography";

const P1 = styled.Text<{ textColor?: string; fontFamily?: string }>`
  font-size: ${SIZES.p1};
  font-family: ${props => props.fontFamily ?? FONTS.Urbanist_600SemiBold};
  color: ${props => props.textColor ?? props.theme.colors.constants.textGrey};
`;

export default P1;
