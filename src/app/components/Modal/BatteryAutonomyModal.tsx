import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import CloseIcon from "app/assets/close.svg";
import P1 from "../Typography/P1";
import H3 from "../Typography/H3";
import { FONTS } from "styles/typography";
import Theme from "styles/theme";
import { useSelector } from "react-redux";
import { batteryAutonomyDaysSelector } from "app/screens/Home/slice/selector";

interface Props {
  visible: boolean;
  onClose: () => void;
  handleSave: (days: string) => void;
}
const BatteryAutonomyModal: React.FC<Props> = ({
  visible,
  onClose,
  handleSave,
}) => {
  const [days, setDays] = useState("");
  const isButtonDisabled = days.trim().length === 0;
  const batteryAutonomyDays = useSelector(batteryAutonomyDaysSelector);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <ModalWrapper>
        <TouchableWithoutFeedback onPress={onClose}>
          <ModalOverlay />
        </TouchableWithoutFeedback>
        <Container>
          <H3
            fontFamily={FONTS.Urbanist_600SemiBold}
            style={{ marginBottom: 3 }}
            textColor={Theme.colors.constants.textGrey}
          >
            Battery Autonomy
          </H3>
          <CloseButton onPress={onClose}>
            <CloseIcon />
          </CloseButton>
          <P1
            fontFamily={FONTS.Urbanist_600SemiBold}
            textColor={Theme.colors.constants.textLightGrey}
            style={{ marginBottom: 30 }}
          >
            Select the number of days
          </P1>
          <Input
            keyboardType="number-pad"
            placeholder="Enter number of days"
            placeholderTextColor={Theme.colors.constants.textGrey}
            defaultValue={batteryAutonomyDays}
            value={days}
            onChangeText={setDays}
          />
          <Button disabled={isButtonDisabled} onPress={() => handleSave(days)}>
            <ButtonText>Save</ButtonText>
          </Button>
        </Container>
      </ModalWrapper>
    </Modal>
  );
};

export default BatteryAutonomyModal;

const Container = styled.View`
  position: absolute;
  height: auto;
  width: 90%;
  padding: 22px 24px 44px;
  background: #ffffff;
  border-radius: 20px;
  margin: auto 16px;
  flex: 1;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 0 10px;
  margin-bottom: 40px;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? "#969696" : "#3B46F1")};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 22px;
  right: 24px;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
