import React from "react";
import styled from "styled-components/native";
// Assets
import Bolt from "app/assets/bolt.svg";
import ThinRightArrow from "app/assets/thin-right-arrow.svg";
// Components
import H1 from "app/components/Typography/H1";
import P1 from "app/components/Typography/P1";
import Theme from "styles/theme";
import { FONTS } from "styles/typography";

interface Props {
  cardTitle: string;
  totalWattValue: string;
  btnText?: string;
  handleRecommendationsPress?: () => void;
  marginBottom?: string;
  hasRecommendationData?: boolean;
}

const PoweRecommendationCard: React.FC<Props> = ({
  cardTitle = "Total Watt per hour (Wh)",
  totalWattValue = "0.00",
  btnText,
  marginBottom,
  handleRecommendationsPress = () => {},
  hasRecommendationData,
}) => {
  return (
    <Box marginBottom={marginBottom}>
      <StyledBoltIcon />
      <BoxContentView>
        <BoxContentTitle fontFamily={FONTS.Urbanist_500Medium} textColor="#fff">
          {cardTitle}
        </BoxContentTitle>
        <H1>{totalWattValue}</H1>
      </BoxContentView>
      {btnText && (
        <>
          {totalWattValue === "0.00" && !hasRecommendationData ? (
            <Placeholder />
          ) : (
            <RecommendationButton onPress={handleRecommendationsPress}>
              <RecommendationButtonText
                fontFamily={FONTS.Urbanist_500Medium}
                textColor={Theme.colors.constants.primary}
              >
                {btnText}
              </RecommendationButtonText>
              <ThinRightArrow />
            </RecommendationButton>
          )}
        </>
      )}
    </Box>
  );
};

export default PoweRecommendationCard;

const Box = styled.View<{ marginBottom?: string }>`
  background-color: ${props => props.theme.colors.constants.primary};
  box-shadow: 0px 8px 50px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  padding-top: 65px;
  padding-bottom: 20px;
  margin-bottom: ${props => props.marginBottom || "0px"};
`;

const StyledBoltIcon = styled(Bolt)`
  position: absolute;
`;

const BoxContentView = styled.View`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const BoxContentTitle = styled(P1)`
  margin-bottom: 13px;
`;

const RecommendationButton = styled.TouchableOpacity`
  width: 199px;
  border-radius: 10px;
  align-items: center;
  padding: 14px 16px;
  background-color: ${props => props.theme.colors.constants.background};
  justify-content: center;
  flex-direction: row;
`;

const RecommendationButtonText = styled(P1)`
  margin-right: 11px;
`;

const Placeholder = styled.View`
  width: 199px;
  height: 48px;
`;
