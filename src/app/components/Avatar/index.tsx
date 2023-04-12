import React from "react";
import styled from "styled-components/native";

interface Props {
  initials: string;
}

const Avatar: React.FC<Props> = ({ initials = "DK" }) => {
  return (
    <AvatarContainer>
      <AvatarText>{initials}</AvatarText>
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.View`
  background-color: #e6e6e6;
  height: 48px;
  width: 48px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: 20px;
`;

const AvatarText = styled.Text`
  color: ${props => props.theme.colors.constants.textGrey};
  z-index: 1000;
`;
