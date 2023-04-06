import React from "react";
import styled from "styled-components/native";
import Container from "app/components/Container";
import { Header } from "app/components/Header";
import { ScrollView } from "react-native";
import { DEVICE_DIMENSIONS } from "styles/typography";

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
  <ScrollView contentContainerStyle={{ height: DEVICE_DIMENSIONS.HEIGHT }}>
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
        <Container>{children}</Container>
      </PaddedView>
    </MainViewWrapper>
  </ScrollView>
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
