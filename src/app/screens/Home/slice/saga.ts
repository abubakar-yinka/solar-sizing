import { takeLatest, call, delay, all } from "redux-saga/effects";
import Toast from "react-native-toast-message";
import { appActions } from ".";
import { apiCall } from "utils/axios";

function* fetchAccountInfo() {
  yield delay(500);
  try {
    yield call(apiCall, "GET", `/user/me`);
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "An error occurred, Please try again",
    });
  }
}

export default function* accountSaga() {
  yield all([takeLatest(appActions.setUserDetails.type, fetchAccountInfo)]);
}
