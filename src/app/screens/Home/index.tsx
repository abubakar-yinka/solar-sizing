import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Container from "app/components/Container";
// Locales
import i18n from "locales/index";

const Home: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text>{i18n.t("title")}</Text>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
