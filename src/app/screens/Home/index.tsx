import { SafeAreaView } from "react-native";
import React from "react";
import Container from "app/components/Container";
// Locales
import i18n from "locales/index";
// Layout
import MainView from "app/layout/MainView";
// Components
import H1 from "app/components/Typography/H1";

const Home: React.FC = () => {
  return (
    <MainView
      headerShown={true}
      title={`Home`}
      backIconPresent={true}
      isLight={false}
    >
      <H1 textColor="#000">{i18n.t("title")}</H1>
    </MainView>
  );
};

export default Home;
