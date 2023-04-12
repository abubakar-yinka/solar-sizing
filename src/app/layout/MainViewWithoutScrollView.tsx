import React from "react";
import styled from "styled-components/native";
import { Header } from "app/components/Header";

interface MainViewProps {
  backIconPresent: boolean;
  title?: string;
  rightIconComponent?: React.ReactNode;
  rightIconOnPress?: () => void;
  isLight: boolean;
  backgroundColor?: string;
  headerShown: boolean;
  children: React.ReactNode;
}

const MainView: React.FC<MainViewProps> = ({
  backIconPresent,
  title,
  rightIconComponent,
  rightIconOnPress = () => {},
  isLight,
  backgroundColor,
  headerShown,
  children,
}) => (
  <MainViewWrapper backgroundColor={backgroundColor}>
    <PaddedView>
      {headerShown && (
        <Header
          title={title}
          backIconPresent={backIconPresent}
          isLight={isLight}
          rightIconComponent={rightIconComponent}
          rightIconOnPress={rightIconOnPress}
        />
      )}
      {children}
    </PaddedView>
  </MainViewWrapper>
);
export default MainView;

const MainViewWrapper = styled.SafeAreaView<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${props => props.backgroundColor ?? "#fff"};
`;

const PaddedView = styled.View`
  flex: 1;
  padding: 0 16px;
`;
