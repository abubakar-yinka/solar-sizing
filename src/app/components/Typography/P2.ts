import styled from "styled-components/native";
import { FONTS, SIZES } from "styles/typography";

const P2 = styled.Text<{ textColor?: string }>`
  font-size: ${SIZES.p2};
  font-family: ${FONTS.Urbanist_600SemiBold};
  color: ${props =>
    props.textColor ?? props.theme.colors.constants.textLightGrey};
`;

export default P2;
