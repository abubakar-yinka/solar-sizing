import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";
import BackButton from "app/assets/back-button.svg";
import BackButtonLight from "app/assets/back-button-light.svg";
import H3 from "../Typography/H3";

interface HeaderProps {
  backIconPresent: boolean;
  title?: string;
  rightIconComponent?: React.ReactNode;
  rightIconOnPress?: () => void;
  isLight: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  backIconPresent,
  title,
  rightIconComponent,
  rightIconOnPress = () => {},
  isLight,
}) => {
  const navigation = useNavigation();

  return (
    <HeaderView>
      {backIconPresent ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {isLight ? <BackButtonLight /> : <BackButton />}
        </TouchableOpacity>
      ) : (
        <PlaceholderView />
      )}
      {title && <HeaderText isLight={isLight}>{title}</HeaderText>}
      <TouchableOpacity onPress={rightIconOnPress}>
        {rightIconComponent ?? <PlaceholderView />}
      </TouchableOpacity>
    </HeaderView>
  );
};

const HeaderView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const HeaderText = styled(H3)<{ isLight: boolean }>`
  color: ${({ isLight, theme }) =>
    isLight ? theme.colors.light.whiteText : theme.colors.constants.textGrey};
`;

const PlaceholderView = styled.View`
  width: 24px;
  height: 24px;
`;
