import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import MainView from "app/layout/MainView";
import AccordionListItem from "app/components/Accordion";
import PoweRecommendationCard from "app/components/PowerRecommendationCard";
import P1 from "app/components/Typography/P1";
import { FONTS } from "styles/typography";
import Theme from "styles/theme";
import { useSelector } from "react-redux";
import {
  recommendationsSelector,
  totalPowerConsumptionSelector,
} from "./slice/selector";
import BatteryImage from "app/assets/battery.png";

const Recommendations = () => {
  const totalPowerConsumption = useSelector(totalPowerConsumptionSelector);
  const recommendations = useSelector(recommendationsSelector);

  const recommendationNotFound = Number(totalPowerConsumption) > 12000;

  return (
    <MainView
      headerShown={true}
      title={`Recommendations`}
      backIconPresent={true}
      isLight={false}
    >
      <RecommendationScreenContainer>
        <PoweRecommendationCard
          cardTitle="Total Watt per hour (Wh)"
          totalWattValue={totalPowerConsumption}
          marginBottom="20px"
        />
        <RecommendationContentView style={{ marginBottom: 20 }}>
          <P1
            fontFamily={FONTS.Urbanist_500Medium}
            textColor={Theme.colors.constants.recommendationText}
          >
            {recommendationNotFound
              ? "No battery found for this power. Try different settings"
              : `Based on this result, you need a standard ${
                  recommendations[0].name
                }wh which represent a solar panel array of ${
                  Math.ceil(recommendations[0].panel / 100) * 100
                }watt (exactly ${
                  recommendations[0].panel
                }watt) based on your average sun hours per day.
            `}
          </P1>
          {!recommendationNotFound && (
            <>
              <RecommendationContentItemView>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  Amp Hour per day with 12v
                </P1>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  {isNaN(Number(totalPowerConsumption))
                    ? "0"
                    : Math.round(Number(totalPowerConsumption) / 12)}
                </P1>
              </RecommendationContentItemView>
              <RecommendationContentItemView>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  Amp Hour per day with 24v
                </P1>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  {isNaN(Number(totalPowerConsumption))
                    ? "0"
                    : Math.round(Number(totalPowerConsumption) / 24)}
                </P1>
              </RecommendationContentItemView>
              <RecommendationContentItemView>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  Amp Hour per day with 48v
                </P1>
                <P1
                  fontFamily={FONTS.Urbanist_600SemiBold}
                  textColor={Theme.colors.constants.recommendationText}
                >
                  {isNaN(Number(totalPowerConsumption))
                    ? "0"
                    : Math.round(Number(totalPowerConsumption) / 45)}
                </P1>
              </RecommendationContentItemView>
            </>
          )}
        </RecommendationContentView>
        {!recommendationNotFound && (
          <>
            {recommendations.length > 1 ? (
              recommendations.map((recommendation, index) => {
                const panelWt = Math.ceil(recommendation.panel / 100) * 100;
                const mppt12 = Math.ceil(panelWt / 12);
                const mppt24 = Math.ceil(panelWt / 24);
                const mppt48 = Math.ceil(panelWt / 48);
                return (
                  <AccordionListItem
                    title={`Option ${index + 1}`}
                    marginBottom="16px"
                    key={index}
                  >
                    <AccordionListItem
                      title={"Battery"}
                      marginBottom="16px"
                      isNested
                    >
                      <View key={index} style={{ marginBottom: 8 }}>
                        <P1 fontFamily={FONTS.Urbanist_700Bold}>
                          You can build {recommendation.name} with:
                        </P1>
                        {recommendation.models.map((b, idx) => (
                          <View key={idx}>
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginVertical: 8,
                                width: "100%",
                              }}
                            >
                              <ImageContainer>
                                <StyledBatteryImage source={BatteryImage} />
                              </ImageContainer>
                            </View>
                            <P1
                              textColor={"#4D4D4D"}
                              fontFamily={FONTS.Urbanist_500Medium}
                            >
                              {b.count}x batter{b.count > 1 ? "ies" : "y"}{" "}
                              {b.volt}V {b.amp}Amps
                            </P1>
                          </View>
                        ))}
                      </View>
                    </AccordionListItem>
                    <AccordionListItem
                      title={"Solar panel array"}
                      marginBottom="16px"
                      isNested
                    >
                      <View key={index} style={{ marginBottom: 8 }}>
                        <P1 fontFamily={FONTS.Urbanist_700Bold}>
                          {`With ${
                            recommendation.name
                          }wh you will need at least a solar panel array of ${
                            Math.ceil(recommendation.panel / 100) * 100
                          }watt.`}
                        </P1>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 8,
                            width: "100%",
                          }}
                        >
                          <ImageContainer>
                            <StyledBatteryImage source={BatteryImage} />
                          </ImageContainer>
                        </View>
                      </View>
                    </AccordionListItem>
                    <AccordionListItem
                      title={"Solar charge controller"}
                      marginBottom="16px"
                      isNested
                    >
                      <View key={index} style={{ marginBottom: 8 }}>
                        <P1
                          fontFamily={FONTS.Urbanist_700Bold}
                          style={{ marginBottom: 4 }}
                        >
                          {`To match a solar panel array of ${panelWt}watt`}
                        </P1>
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 12V, you will need an MPPT which can support{" "}
                          {mppt12}
                          amp
                        </P1>
                        {mppt12 > 50 ? (
                          <P1
                            textColor={"#4D4D4D"}
                            fontFamily={FONTS.Urbanist_500Medium}
                          >
                            This is a high value and we advice to step up your
                            voltage.
                          </P1>
                        ) : (
                          <Text></Text>
                        )}
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 24V, you will need an MPPT which can support{" "}
                          {mppt24}
                          amp
                        </P1>
                        {mppt24 > 50 ? (
                          <P1
                            textColor={"#4D4D4D"}
                            fontFamily={FONTS.Urbanist_500Medium}
                          >
                            This is a high value and we advice to step up your
                            voltage.
                          </P1>
                        ) : (
                          <Text></Text>
                        )}
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 48V, you will need an MPPT which can support{" "}
                          {mppt48}
                          amp
                        </P1>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginVertical: 8,
                          width: "100%",
                        }}
                      >
                        <ImageContainer>
                          <StyledBatteryImage source={BatteryImage} />
                        </ImageContainer>
                      </View>
                    </AccordionListItem>
                  </AccordionListItem>
                );
              })
            ) : (
              <>
                <AccordionListItem title={"Battery"} marginBottom="16px">
                  {recommendations.map((battery, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                      <P1 fontFamily={FONTS.Urbanist_700Bold}>
                        You can build {battery.name} with:
                      </P1>
                      {battery.models.map((b, idx) => (
                        <View key={idx}>
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              marginVertical: 8,
                              width: "100%",
                            }}
                          >
                            <ImageContainer>
                              <StyledBatteryImage source={BatteryImage} />
                            </ImageContainer>
                          </View>
                          <P1
                            textColor={"#4D4D4D"}
                            fontFamily={FONTS.Urbanist_500Medium}
                          >
                            {b.count}x batter{b.count > 1 ? "ies" : "y"}{" "}
                            {b.volt}V {b.amp}Amps
                          </P1>
                        </View>
                      ))}
                    </View>
                  ))}
                </AccordionListItem>
                <AccordionListItem
                  title={"Solar panel array"}
                  marginBottom="16px"
                >
                  {recommendations.map((solarPanelArr, index) => (
                    <View key={index} style={{ marginBottom: 8 }}>
                      <P1 fontFamily={FONTS.Urbanist_700Bold}>
                        {`With ${
                          solarPanelArr.name
                        }wh you will need at least a solar panel array of ${
                          Math.ceil(solarPanelArr.panel / 100) * 100
                        }watt.`}
                      </P1>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          marginVertical: 8,
                          width: "100%",
                        }}
                      >
                        <ImageContainer>
                          <StyledBatteryImage source={BatteryImage} />
                        </ImageContainer>
                      </View>
                    </View>
                  ))}
                </AccordionListItem>
                <AccordionListItem
                  title={"Solar charge controller"}
                  marginBottom="16px"
                >
                  {recommendations.map((solarController, index) => {
                    const panelWt =
                      Math.ceil(solarController.panel / 100) * 100;
                    const mppt12 = Math.ceil(panelWt / 12);
                    const mppt24 = Math.ceil(panelWt / 24);
                    const mppt48 = Math.ceil(panelWt / 48);

                    return (
                      <View key={index} style={{ marginBottom: 8 }}>
                        <P1
                          fontFamily={FONTS.Urbanist_700Bold}
                          style={{ marginBottom: 4 }}
                        >
                          {`To match a solar panel array of ${panelWt}watt`}
                        </P1>
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 12V, you will need an MPPT which can support{" "}
                          {mppt12}
                          amp
                        </P1>
                        {mppt12 > 50 ? (
                          <P1
                            textColor={"#4D4D4D"}
                            fontFamily={FONTS.Urbanist_500Medium}
                          >
                            This is a high value and we advice to step up your
                            voltage.
                          </P1>
                        ) : (
                          <Text></Text>
                        )}
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 24V, you will need an MPPT which can support{" "}
                          {mppt24}
                          amp
                        </P1>
                        {mppt24 > 50 ? (
                          <P1
                            textColor={"#4D4D4D"}
                            fontFamily={FONTS.Urbanist_500Medium}
                          >
                            This is a high value and we advice to step up your
                            voltage.
                          </P1>
                        ) : (
                          <Text></Text>
                        )}
                        <P1
                          textColor={"#4D4D4D"}
                          fontFamily={FONTS.Urbanist_500Medium}
                        >
                          - With 48V, you will need an MPPT which can support{" "}
                          {mppt48}
                          amp
                        </P1>
                      </View>
                    );
                  })}
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: 8,
                      width: "100%",
                    }}
                  >
                    <ImageContainer>
                      <StyledBatteryImage source={BatteryImage} />
                    </ImageContainer>
                  </View>
                </AccordionListItem>
              </>
            )}
          </>
        )}
      </RecommendationScreenContainer>
    </MainView>
  );
};

export default Recommendations;

const RecommendationScreenContainer = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const RecommendationContentView = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px;
  border-radius: 16px;
  background-color: #e9eaf5;
`;
const RecommendationContentItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

const ImageContainer = styled.View`
  border: 1px solid #bcbcbc;
  border-radius: 16px;
  width: 100%;
  height: 160px;
  justify-content: center;
  align-items: center;
`;

const StyledBatteryImage = styled.Image`
  width: 200px;
  height: 100%;
`;
