import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { windowHeight } from "constants/index";
import H3 from "../Typography/H3";
import Theme from "styles/theme";

interface ButtonProps {
  buttonTitle: string;
  buttonLoading: boolean;
  btnDisabled: boolean;
  isSecondary?: boolean;
  width: string;
  height: string;
  handlePress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonTitle,
  buttonLoading,
  btnDisabled,
  isSecondary,
  width,
  height,
  handlePress,
  ...rest
}) => {
  const [pressed, setPressed] = React.useState<boolean>(false);
  return (
    <StyledTouchableOpacity
      disabled={buttonLoading || btnDisabled}
      activeOpacity={buttonLoading || btnDisabled ? 0.5 : 0.7}
      onPress={handlePress}
      buttonLoading={buttonLoading}
      btnDisabled={btnDisabled}
      isSecondary={isSecondary}
      width={width}
      height={height}
      pressed={pressed}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...rest}
    >
      <>
        {buttonLoading ? (
          <ActivityIndicator
            size="small"
            color={Theme.colors.constants.primary}
          />
        ) : (
          <ButtonText
            isSecondary={isSecondary}
            pressed={pressed}
            btnDisabled={btnDisabled}
          >
            {buttonTitle}
          </ButtonText>
        )}
      </>
    </StyledTouchableOpacity>
  );
};

export default Button;

const ButtonText = styled(H3)<{
  btnDisabled: boolean;
  isSecondary: boolean;
  pressed: boolean;
}>`
  color: ${props =>
    props.btnDisabled
      ? props.theme.colors.light.disabledBtnText
      : props.isSecondary
      ? props.pressed
        ? props.theme.colors.light.whiteText
        : props.theme.colors.light.primary
      : props.theme.colors.light.whiteText};
  text-transform: capitalize;
`;

const StyledTouchableOpacity = styled.TouchableOpacity<{
  buttonLoading: boolean;
  btnDisabled: boolean;
  pressed: boolean;
  isSecondary: boolean;
  width: string;
  height: string;
}>`
  width: ${props => props.width && props.width};
  height: ${props => (props.height ? props.height : windowHeight / 13)};
  padding: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${props =>
    props.buttonLoading || props.btnDisabled
      ? props.theme.colors.light.disabled
      : props.isSecondary
      ? props.pressed
        ? props.theme.colors.light.primary
        : "transparent"
      : props.pressed
      ? props.theme.colors.light.pressedPrimary
      : props.theme.colors.light.primary};
  border: ${props =>
    props.isSecondary
      ? `1.5px solid ${Theme.colors.constants.primary};`
      : "none"};
`;
