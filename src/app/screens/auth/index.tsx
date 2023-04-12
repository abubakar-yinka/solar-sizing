import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  useForm,
  SubmitErrorHandler,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components/native";
import { FONTS } from "styles/typography";
import Theme from "styles/theme";
import { NavigationProps } from "app/routes/types";
import MainView from "app/layout/MainView";
import H3 from "app/components/Typography/H3";
import FormInput, { ErrorText } from "app/components/FormInput";
import Button from "app/components/Button";
import Toast from "react-native-toast-message";
import { useAppSlice } from "../Home/slice";
import { storeInLocalStorage } from "utils/helpers";

type FormValues = {
  firstName: string;
  lastName: string;
};

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is Required!"),
    lastName: yup.string().required("Last Name is Required!"),
  })
  .required();

const AuthScreen: React.FC = () => {
  const { actions } = useAppSlice();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const [formError, setFormError] = React.useState<Boolean>(false);

  const setViewedOnboarding = async () => {
    try {
      await storeInLocalStorage("@viewedOnboarding", JSON.stringify(true));
    } catch (err) {
      console.log("Error @setItem: ", err);
    }
  };

  React.useEffect(() => {
    setViewedOnboarding();
  }, []);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid } = formMethods.formState;

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(actions.setUserDetails(data));
    Toast.show({
      type: "success",
      text1: "Onboarding Successful",
    });
    navigation.replace("Home");
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    Toast.show({
      type: "error",
      text1: "Something went wrong",
    });
    return console.log(errors, e);
  };

  return (
    <MainView
      backgroundColor={Theme.colors.constants.background}
      headerShown={true}
      title={`Onboarding`}
      backIconPresent={false}
      isLight={false}
    >
      <StyledView>
        {formError && (
          <View>
            <ErrorText>
              There was a problem with loading the form. Please try again later.
            </ErrorText>
          </View>
        )}
        <FormProvider {...formMethods}>
          <FormInput
            name="firstName"
            placeholderText="First Name"
            label="First Name"
            setFormError={setFormError}
          />
          <FormInput
            name="lastName"
            placeholderText="Last Name"
            label="Last Name"
            setFormError={setFormError}
          />
        </FormProvider>
        <StyledBtn
          buttonTitle={"Register"}
          btnDisabled={!isValid}
          buttonLoading={false}
          isSecondary={false}
          handlePress={formMethods.handleSubmit(onSubmit, onError)}
          width="100%"
          height={`48px`}
        />
      </StyledView>
    </MainView>
  );
};

export default AuthScreen;

const StyledView = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
`;

const StyledBtn = styled(Button)`
  margin-top: 108px;
`;
