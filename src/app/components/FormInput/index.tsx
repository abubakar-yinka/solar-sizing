import React from "react";
import { TextInputProps as RNTextInputProps } from "react-native";
import styled from "styled-components/native";
import {
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { windowHeight } from "constants/index";
import Theme from "styles/theme";
import { FONTS } from "styles/typography";
import P1 from "../Typography/P1";
import ErrorIcon from "app/assets/error.svg";
import { View } from "react-native";
import H3 from "../Typography/H3";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  placeholderText?: string;
  defaultValue?: string;
  setFormError: Function;
  [x: string]: any;
}

const ControlledFormInput: React.FC<TextInputProps> = ({
  name,
  label,
  rules,
  defaultValue,
  placeholderText,
  ...inputProps
}) => {
  const formContext = useFormContext();
  const { formState } = formContext;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <InputWrapper>
      {label && (
        <H3
          fontFamily={FONTS.Urbanist_600SemiBold}
          textColor={Theme.colors.constants.textGrey}
        >
          {label}
        </H3>
      )}
      <InputContainer hasError={hasError}>
        <Input
          placeholder={placeholderText}
          placeholderTextColor={Theme.colors.constants.textLightGrey}
          numberOfLines={1}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          {...inputProps}
        />
      </InputContainer>
      {hasError && (
        <ErrorWrapper>
          <ErrorIcon />
          <ErrorText textColor="#F42758">
            {formState.errors[name]?.message}
          </ErrorText>
        </ErrorWrapper>
      )}
    </InputWrapper>
  );
};

const FormInput: React.FC<TextInputProps> = ({
  name,
  rules,
  label,
  defaultValue,
  setFormError,
  ...inputProps
}) => {
  const props = {
    name,
    rules,
    label,
    defaultValue,
    setFormError,
    ...inputProps,
  };

  const formContext = useFormContext();

  // Placeholder until input name is initialized
  if (!formContext || !name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    setFormError(true);
    return null;
  }

  return <ControlledFormInput {...props} />;
};

export default FormInput;

const InputWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 20px;
`;

const InputContainer = styled.View<{ hasError?: boolean }>`
  margin-top: 8px;
  width: 100%;
  height: ${windowHeight / 16}px;
  border-radius: 6px;
  border: 1px solid
    ${props => (props.hasError ? "#F42758" : Theme.colors.constants.textGrey)};
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.hasError ? "#ffc2c2" : Theme.colors.constants.background};
`;

const Input = styled.TextInput`
  padding: 10px 16px;
  font-family: ${FONTS.Urbanist_500Medium};
  flex: 1;
  font-size: 16px;
  color: ${Theme.colors.constants.textGrey};
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled(P1)`
  margin-left: 5px;
`;
const ErrorWrapper = styled.View`
  margin-top: 5px;
  flex-direction: row;
`;
