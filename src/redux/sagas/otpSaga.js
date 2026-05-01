import {call, put, takeLatest} from 'redux-saga/effects';
import api from '../../api/apiClient';
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../actions/otpActions';

// 🔹 SEND OTP
function* sendOtpSaga(action) {
  try {
    const {data} = action.payload;

    console.log('🟡 SEND OTP SAGA:', data);

    const response = yield call(
      () => api.put('/user/auth/update-user', data), // ⚠️ backend પ્રમાણે change કરજો
    );

    console.log('✅ OTP SENT:', response.data);

    yield put({
      type: SEND_OTP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('❌ OTP ERROR:', error?.response?.data || error.message);

    yield put({
      type: SEND_OTP_FAILURE,
      payload: error?.response?.data || error.message,
    });
  }
}

// 🔹 VERIFY OTP
function* verifyOtpSaga(action) {
  try {
    const {data} = action.payload;

    console.log('🔵 VERIFY OTP SAGA:', data);

    const response = yield call(() =>
      api.post('/user/auth/verify-update-otp', data),
    );

    console.log('✅ OTP VERIFIED:', response.data);

    yield put({
      type: VERIFY_OTP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(
      '❌ VERIFY ERROR1233455:',
      error?.response?.data || error.message || 'Something went wrong',
    );

    yield put({
      type: VERIFY_OTP_FAILURE,
      payload: error?.response?.data || error.message || 'Something went wrong',
    });
  }
}

// 🔥 watcher
export default function* otpSaga() {
  console.log('Send Otp Saga new');
  yield takeLatest(SEND_OTP_REQUEST, sendOtpSaga);
  console.log('verify Otp Saga');
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
}
