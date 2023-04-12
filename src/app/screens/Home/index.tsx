import React, { useState } from "react";
import styled from "styled-components/native";
// Styles
import Theme from "styles/theme";
import { FONTS } from "styles/typography";
// Assets
import AddIcon from "app/assets/add.svg";
import RightArrow from "app/assets/right-arrow.svg";
// Layout
import MainView from "app/layout/MainView";
// Components
import P1 from "app/components/Typography/P1";
import PoweRecommendationCard from "app/components/PowerRecommendationCard";
import Avatar from "app/components/Avatar";
import H2 from "app/components/Typography/H2";
import P2 from "app/components/Typography/P2";
import { View, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "app/routes/types";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import H3 from "app/components/Typography/H3";
import BatteryAutonomyModal from "app/components/Modal/BatteryAutonomyModal";
import {
  addLeadingZero,
  getInitials,
  isEmptyString,
  removeFromLocalStorage,
} from "utils/helpers";
import { useAppSlice } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import {
  batteryAutonomyDaysSelector,
  firstNameSelector,
  lastNameSelector,
  noOfAppliancesSelector,
  recommendationsSelector,
  savedDateSelector,
  sunHoursSelector,
  totalPowerConsumptionSelector,
  totalWattHoursPerDaySelector,
} from "./slice/selector";
import AppliancesModal from "app/components/Modal/AppliancesModal";

const Home: React.FC = () => {
  const { actions } = useAppSlice();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const colorScheme = useColorScheme();
  const firstName = useSelector(firstNameSelector);
  const lastName = useSelector(lastNameSelector);
  const totalPowerConsumption = useSelector(totalPowerConsumptionSelector);
  const sunHours = useSelector(sunHoursSelector);
  const savedDate = useSelector(savedDateSelector);
  const batteryAutonomyDays = useSelector(batteryAutonomyDaysSelector);
  const noOfAppliances = useSelector(noOfAppliancesSelector);
  const totalWattHoursPerDay = useSelector(totalWattHoursPerDaySelector);
  const recommendations = useSelector(recommendationsSelector);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isBatteryAutonomyModalVisible, setBatteryAutonomyModalVisibility] =
    useState(false);
  const [isAppliancesModalVisible, setAppliancesModalVisibility] =
    useState(false);

  const toggleBatteryAutonomyModal = () => {
    setBatteryAutonomyModalVisibility(!isBatteryAutonomyModalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmSunHours = (date: Date) => {
    dispatch(actions.setSavedDate(new Date(date)));
    dispatch(
      actions.setSunHours(
        `${new Date(date).getHours()}.${addLeadingZero(
          new Date(date).getMinutes(),
        )}`,
      ),
    );
    hideDatePicker();
  };

  return (
    <MainView
      headerShown={false}
      title={`Home`}
      backIconPresent={false}
      isLight={false}
    >
      <HomeScreenContainer>
        <Avatar initials={getInitials(firstName, lastName)} />
        <CardButton
          onPress={() => {
            dispatch(actions.resetState());
            removeFromLocalStorage("@viewedOnboarding");
          }}
        >
          <CardButtonText
            fontFamily={FONTS.Urbanist_500Medium}
            textColor={Theme.colors.constants.primary}
          >
            Reset App State
          </CardButtonText>
        </CardButton>
        <PoweRecommendationCard
          cardTitle="Total Watt per hour (Wh)"
          totalWattValue={totalPowerConsumption}
          marginBottom="20px"
          btnText="See Recommendations"
          handleRecommendationsPress={() =>
            navigation.navigate("Recommendation")
          }
          hasRecommendationData={recommendations.length > 0}
        />
        <BoxSplitView marginBottom="20px">
          <Box isSpliView={true}>
            <BoxContentView isSpliView={true}>
              <P1
                fontFamily={FONTS.Urbanist_500Medium}
                textColor={Theme.colors.constants.textGrey}
              >
                Sun hours per day
              </P1>
              <H2
                fontFamily={FONTS.Urbanist_600SemiBold}
                textColor={Theme.colors.constants.textGrey}
              >
                {isEmptyString(sunHours) ? 0 : sunHours}
              </H2>
              <P2>Hours</P2>
              <CardButton onPress={showDatePicker}>
                <CardButtonText
                  fontFamily={FONTS.Urbanist_500Medium}
                  textColor={Theme.colors.constants.primary}
                >
                  Edit Hours per day
                </CardButtonText>
                <RightArrow />
              </CardButton>
            </BoxContentView>
          </Box>
          <Box isSpliView={true}>
            <BoxContentView isSpliView={true}>
              <P1
                fontFamily={FONTS.Urbanist_500Medium}
                textColor={Theme.colors.constants.textGrey}
              >
                Battery Autonomy
              </P1>
              <H2
                fontFamily={FONTS.Urbanist_600SemiBold}
                textColor={Theme.colors.constants.textGrey}
              >
                {isEmptyString(batteryAutonomyDays) ? 0 : batteryAutonomyDays}
              </H2>
              <P2>Days</P2>
              <CardButton onPress={toggleBatteryAutonomyModal}>
                <CardButtonText
                  fontFamily={FONTS.Urbanist_500Medium}
                  textColor={Theme.colors.constants.primary}
                >
                  Edit Autonomy
                </CardButtonText>
                <RightArrow />
              </CardButton>
            </BoxContentView>
          </Box>
        </BoxSplitView>
        <Box marginBottom="20px">
          <BoxContentView>
            <P1
              fontFamily={FONTS.Urbanist_500Medium}
              textColor={Theme.colors.constants.textGrey}
            >
              Appliances
            </P1>
            <H2
              fontFamily={FONTS.Urbanist_600SemiBold}
              textColor={Theme.colors.constants.textGrey}
            >
              {noOfAppliances}
            </H2>
            <P2>No of Appliances</P2>
            <CardButton onPress={() => setAppliancesModalVisibility(true)}>
              <CardButtonText
                fontFamily={FONTS.Urbanist_500Medium}
                textColor={Theme.colors.constants.primary}
              >
                Add Appliances
              </CardButtonText>
              <AddIcon />
            </CardButton>
          </BoxContentView>
          <BoxContentView>
            <View />
            <H2
              fontFamily={FONTS.Urbanist_600SemiBold}
              textColor={Theme.colors.constants.textGrey}
            >
              {totalWattHoursPerDay}
            </H2>
            <P2>Total Watt Hours per Day</P2>
            <View />
          </BoxContentView>
        </Box>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          date={new Date(savedDate)}
          onConfirm={handleConfirmSunHours}
          onCancel={hideDatePicker}
          confirmTextIOS="Save"
          locale="en_GB"
          timePickerModeAndroid="clock"
          isDarkModeEnabled={colorScheme === "dark"}
          customHeaderIOS={() => (
            <>
              <H3
                fontFamily={FONTS.Urbanist_600SemiBold}
                style={{ padding: 22 }}
                textColor={
                  colorScheme === "dark"
                    ? "#fff"
                    : Theme.colors.constants.textGrey
                }
              >
                Sun hours per day
              </H3>
              <P1
                fontFamily={FONTS.Urbanist_600SemiBold}
                textColor={
                  colorScheme === "dark"
                    ? "#fff"
                    : Theme.colors.constants.textLightGrey
                }
                style={{ paddingLeft: 22 }}
              >
                Select the duration of sun hours per day
              </P1>
            </>
          )}
        />
        <BatteryAutonomyModal
          visible={isBatteryAutonomyModalVisible}
          onClose={() => setBatteryAutonomyModalVisibility(false)}
          handleSave={(days: string) => {
            dispatch(actions.setBatteryAutonomyDays(days));
            setBatteryAutonomyModalVisibility(false);
          }}
        />
        <AppliancesModal
          visible={isAppliancesModalVisible}
          onClose={() => setAppliancesModalVisibility(false)}
        />
      </HomeScreenContainer>
    </MainView>
  );
};

export default Home;

const HomeScreenContainer = styled.View`
  flex: 1;
  justify-content: space-evenly;
`;

const Box = styled.View<{ isSpliView?: boolean; marginBottom?: string }>`
  height: 152px;
  background-color: #ededed;
  border-radius: 10px;
  justify-content: flex-start;
  padding: 16px 12px 17px;
  flex-direction: row;
  ${({ isSpliView }) => isSpliView && `flex: 0.48;`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

const BoxContentView = styled.View<{ isSpliView?: boolean }>`
  ${({ isSpliView }) => !isSpliView && `flex: 0.5;`}
  flex-direction: column;
  justify-content: space-between;
`;

const CardButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CardButtonText = styled(P1)`
  margin-right: 13px;
`;

const BoxSplitView = styled.View<{ marginBottom?: string }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;
