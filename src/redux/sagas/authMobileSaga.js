import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  MOBILE_REGISTER_REQUEST,
  MOBILE_REGISTER_SUCCESS,
  MOBILE_REGISTER_FAILURE,
  MOBILE_VERIFY_OTP_REQUEST,
  MOBILE_VERIFY_OTP_SUCCESS,
  MOBILE_VERIFY_OTP_FAILURE,
} from '../actions/authMobileAction';

const BASE_URL = 'https://mntrendigo.mntech.website/api';

// 🔹 Register API call
const registerApi = payload => {
  return axios.post(`${BASE_URL}/v1/user/auth/register`, payload);
};

// 🔹 Verify OTP API call
const verifyOtpApi = payload => {
  return axios.post(`${BASE_URL}/v1/user/auth/verify-otp-email`, payload);
};

// 🟢 Register Saga
function* registerSaga(action) {
  try {
    const response = yield call(registerApi, action.payload);
    yield put({
      type: MOBILE_REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('error in mobile register saga', error);
    yield put({
      type: MOBILE_REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

// 🟢 Verify OTP Saga
function* verifyOtpSaga(action) {
  try {
    const response = yield call(verifyOtpApi, action.payload);
    yield put({
      type: MOBILE_VERIFY_OTP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MOBILE_VERIFY_OTP_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

// 👂 Watcher
export default function* authMobileSaga() {
  yield takeLatest(MOBILE_REGISTER_REQUEST, registerSaga);
  yield takeLatest(MOBILE_VERIFY_OTP_REQUEST, verifyOtpSaga);
}
