import React, { useState, useRef } from "react";
import { TouchableWithoutFeedback, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import H2 from "../Typography/H2";
import { FONTS } from "styles/typography";
import Theme from "styles/theme";

interface AccordionListItemProps {
  title: string;
  children: React.ReactNode;
  marginBottom?: string;
  bgColor?: string;
  isNested?: boolean;
}

const AccordionListItem: React.FC<AccordionListItemProps> = ({
  title,
  children,
  marginBottom,
  bgColor,
  isNested,
}) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI * 0.5}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
    setOpen(!open);
  };

  return (
    <AccordionContainer
      marginBottom={marginBottom}
      bgColor={bgColor}
      isNested={isNested}
    >
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <TitleContainer>
          <Title
            fontFamily={FONTS.Urbanist_600SemiBold}
            textColor={Theme.colors.constants.textGrey}
          >
            {title}
          </Title>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color="black"
            />
          </Animated.View>
        </TitleContainer>
      </TouchableWithoutFeedback>
      <BodyBackground style={{ height: bodyHeight }}>
        <BodyContainer
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </BodyContainer>
      </BodyBackground>
    </AccordionContainer>
  );
};

export default AccordionListItem;

const AccordionContainer = styled.View<{
  marginBottom?: string;
  bgColor?: string;
  isNested?: boolean;
}>`
  border-width: 1px;
  border-radius: 16px;
  border-color: ${props =>
    !props.isNested ? props.bgColor ?? "#ededed" : "#000"};
  background-color: ${props =>
    !props.isNested ? props.bgColor ?? "#ededed" : "#ededed"};
  margin-bottom: ${props => props.marginBottom || "0px"};
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
`;

const Title = styled(H2)``;

const BodyBackground = styled(Animated.View)`
  overflow: hidden;
`;

const BodyContainer = styled.View`
  padding: 0 12px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
