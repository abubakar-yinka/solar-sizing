import React, { useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components/native";
import CloseIcon from "app/assets/close.svg";
import P1 from "../Typography/P1";
import H3 from "../Typography/H3";
import { FONTS } from "styles/typography";
import Theme from "styles/theme";
import RNPickerSelect from "react-native-picker-select";
import {
  appliances as appliancesList,
  checkArrayItemsHaveEmptyName,
  findEmptyNameIndices,
} from "utils/helpers";
import { ScrollView } from "react-native";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { ErrorText } from "../FormInput";
import { useAppSlice } from "app/screens/Home/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  appliancesSelector,
  totalWattHoursPerDaySelector,
} from "app/screens/Home/slice/selector";

interface Props {
  visible: boolean;
  onClose: () => void;
}

type FormValues = {
  appliances: {
    appliance: {
      name: string;
      powerRating: number;
    };
    hoursOnPerDay: number;
    wattHoursPerDay: number;
  }[];
  totalWattHoursPerDay: number;
};

const validationSchema = Yup.object().shape({
  appliances: Yup.array().of(
    Yup.object().shape({
      appliance: Yup.object({
        name: Yup.string(),
        powerRating: Yup.number(),
      })
        .nullable()
        .required("Select an appliance"),
      hoursOnPerDay: Yup.number().required("Enter hours on per day"),
      wattHoursPerDay: Yup.number().required("Enter watt hours per day"),
    }),
  ),
  totalWattHoursPerDay: Yup.number().required("Enter total watt hours per day"),
});

const AppliancesModal: React.FC<Props> = ({ visible, onClose }) => {
  const { actions } = useAppSlice();
  const dispatch = useDispatch();
  const appliances = useSelector(appliancesSelector);
  const totalWattHoursPerDay = useSelector(totalWattHoursPerDaySelector);
  const formattedSelectItems = appliancesList.map(appliance => ({
    label: appliance.name,
    value: appliance,
  }));

  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      appliances,
      totalWattHoursPerDay,
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: "appliances",
  });

  const appliancesWatch = watch("appliances");

  const onSubmit: SubmitHandler<FormValues> = data => {
    const emptyIndices = findEmptyNameIndices(data.appliances);
    remove(emptyIndices);
    dispatch(actions.setAppliances(data));
    onClose();
  };

  const computeWattHoursPerDay = (
    powerRating: number,
    hoursOnPerDay: number,
  ) => {
    return powerRating * hoursOnPerDay;
  };

  const computeTotalWattHoursPerDay = (
    appliances: {
      appliance: { name: string; powerRating: number };
      hoursOnPerDay: number;
      wattHoursPerDay: number;
    }[],
  ) => {
    return appliances.reduce((acc, curr) => {
      return acc + curr.wattHoursPerDay;
    }, 0);
  };

  const computeTotalWattHoursPerDayAfterDelete = (
    appliances: {
      appliance: { name: string; powerRating: number };
      hoursOnPerDay: number;
      wattHoursPerDay: number;
    }[],
    index: number,
  ) => {
    return appliances.reduce((acc, curr, i) => {
      if (i !== index) {
        return acc + curr.wattHoursPerDay;
      }
      return acc;
    }, 0);
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onClose}
    >
      <ModalWrapper>
        <TouchableWithoutFeedback onPress={onClose}>
          <ModalOverlay />
        </TouchableWithoutFeedback>
        {/* Get value based on field number */}
        <Container>
          <H3
            fontFamily={FONTS.Urbanist_600SemiBold}
            style={{ marginBottom: 3 }}
            textColor={Theme.colors.constants.textGrey}
          >
            List of all appliances
          </H3>
          <CloseButton onPress={onClose}>
            <CloseIcon />
          </CloseButton>
          <P1
            fontFamily={FONTS.Urbanist_600SemiBold}
            textColor={Theme.colors.constants.textLightGrey}
            style={{ marginBottom: 30 }}
          >
            Select your appliances and signify the hours on per day for each
            appliance.
          </P1>
          <P1
            fontFamily={FONTS.Urbanist_600SemiBold}
            textColor={Theme.colors.constants.textLightGrey}
          >
            Total Watt Hours Per Day: {watch("totalWattHoursPerDay")}
          </P1>
          <ScrollWrapper>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 20,
              }}
            >
              {fields.map((field, index) => (
                <ApplianceWrapper key={index}>
                  <RemoveIcon
                    onPress={() => {
                      remove(index);
                      setValue(
                        "totalWattHoursPerDay",
                        computeTotalWattHoursPerDayAfterDelete(
                          appliancesWatch,
                          index,
                        ),
                      );
                    }}
                  >
                    <CloseIcon />
                  </RemoveIcon>
                  <Controller
                    control={control}
                    defaultValue={field.appliance}
                    name={`appliances.${index}.appliance`}
                    render={({ field: { onChange, value } }) => (
                      <RNPickerSelect
                        placeholder={{
                          label: "Select an Appliance...",
                          value: null,
                        }}
                        value={value}
                        onValueChange={value => {
                          const appliance = value;
                          if (appliance) {
                            onChange(appliance);
                            setValue(
                              `appliances.${index}.wattHoursPerDay`,
                              computeWattHoursPerDay(
                                appliance.powerRating,
                                appliancesWatch[index].hoursOnPerDay,
                              ),
                            );
                          } else {
                            setValue(
                              `appliances.${index}.wattHoursPerDay`,
                              computeWattHoursPerDay(
                                0,
                                appliancesWatch[index].hoursOnPerDay,
                              ),
                            );
                            onChange({ name: "", powerRating: 0 });
                          }
                          setValue(
                            "totalWattHoursPerDay",
                            computeTotalWattHoursPerDay(appliancesWatch),
                          );
                        }}
                        items={formattedSelectItems}
                        style={pickerSelectStyles}
                      />
                    )}
                  />
                  <InputGroup>
                    <InputContainer>
                      <InputGroupLabel
                        fontFamily={FONTS.Urbanist_600SemiBold}
                        textColor={Theme.colors.constants.textGrey}
                      >
                        Watt
                      </InputGroupLabel>
                      <Input
                        keyboardType="number-pad"
                        defaultValue="0"
                        value={appliancesWatch[
                          index
                        ].appliance.powerRating.toString()}
                        editable={false}
                      />
                    </InputContainer>
                    <InputContainer>
                      <InputGroupLabel
                        fontFamily={FONTS.Urbanist_600SemiBold}
                        textColor={Theme.colors.constants.textGrey}
                      >
                        Hours On / Day
                      </InputGroupLabel>
                      <Controller
                        control={control}
                        defaultValue={0}
                        name={`appliances.${index}.hoursOnPerDay`}
                        render={({ field: { onChange, value, onBlur } }) => (
                          <Input
                            keyboardType="number-pad"
                            defaultValue={field.hoursOnPerDay.toString()}
                            value={value}
                            onChangeText={text => {
                              if (text) {
                                onChange(parseInt(text));
                                setValue(
                                  `appliances.${index}.wattHoursPerDay`,
                                  computeWattHoursPerDay(
                                    appliancesWatch[index].appliance
                                      .powerRating,
                                    parseInt(text),
                                  ),
                                );
                              } else {
                                setValue(
                                  `appliances.${index}.wattHoursPerDay`,
                                  computeWattHoursPerDay(
                                    appliancesWatch[index].appliance
                                      .powerRating,
                                    0,
                                  ),
                                );
                                onChange(0);
                              }
                              setValue(
                                "totalWattHoursPerDay",
                                computeTotalWattHoursPerDay(appliancesWatch),
                              );
                            }}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    </InputContainer>
                    <InputContainer>
                      <InputGroupLabel
                        fontFamily={FONTS.Urbanist_600SemiBold}
                        textColor={Theme.colors.constants.textGrey}
                      >
                        Watt Hours / Day
                      </InputGroupLabel>
                      <Input
                        keyboardType="number-pad"
                        defaultValue="0"
                        value={appliancesWatch[
                          index
                        ].wattHoursPerDay.toString()}
                        editable={false}
                      />
                    </InputContainer>
                  </InputGroup>
                  <ErrorText>{errors?.appliances}</ErrorText>
                </ApplianceWrapper>
              ))}
            </ScrollView>
          </ScrollWrapper>
          <ButtonGroup>
            <Button
              onPress={() =>
                append({
                  appliance: { name: "", powerRating: 0 },
                  hoursOnPerDay: 1,
                  wattHoursPerDay: 0,
                })
              }
            >
              <ButtonText>Add New</ButtonText>
            </Button>
            <Button
              disabled={
                appliancesWatch.length === 0 ||
                checkArrayItemsHaveEmptyName(appliancesWatch)
              }
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText>Save</ButtonText>
            </Button>
          </ButtonGroup>
        </Container>
      </ModalWrapper>
    </Modal>
  );
};

export default AppliancesModal;

const Container = styled.View`
  position: absolute;
  height: 400px;
  width: 90%;
  padding: 22px 24px 44px;
  background: #ffffff;
  border-radius: 20px;
  margin: auto 16px;
  flex: 1;
`;

const ApplianceWrapper = styled.View`
  background-color: #f5f5f5;
  padding: 12px 6px;
  margin-bottom: 30px;
  border-radius: 8px;
`;

const ScrollWrapper = styled.View`
  height: 210px;
`;

const RemoveIcon = styled.TouchableOpacity`
  position: absolute;
  top: -19px;
  right: 0;
  cursor: pointer;
  width: 22px;
  height: 22px;
  background-color: #f5f5f5;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-top: 10px;
  flex: 0.32;
`;

const InputGroupLabel = styled(P1)`
  margin-bottom: 5px;
  height: 40px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 0 10px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 40px;
  flex: 0.48;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? "#969696" : "#3B46F1")};
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 22px;
  right: 24px;
`;

const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 4,
    color: Theme.colors.constants.textGrey,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#cccccc",
    borderRadius: 8,
    color: Theme.colors.constants.textGrey,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
