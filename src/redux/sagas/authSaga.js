import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../navigations/NavigationService';

import {
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
  VERIFY_EMAIL_OTP_REQUEST,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  RESEND_OTP_REQUEST,
  resendOtpSuccess,
  resendOtpFailure,
} from '../actions/authActions';

// BASE URL
const BASE_URL = 'https://mntrendigo.mntech.website/api/v1/user/auth';

// -----------------------------------------------------
// ✅ REGISTER USER
// -----------------------------------------------------
// function* registerSaga(action) {
//   try {
//     const response = yield call(() =>
//       axios.post(
//         `${BASE_URL}/register`,
//         {email: action.payload.email},
//         {headers: {'Content-Type': 'application/json'}},
//       ),
//     );

//     console.log('REGISTER SUCCESS:', response.data);

//     yield put(registerSuccess(response.data.message));
//   } catch (error) {
//     console.log('REGISTER ERROR123:', error?.response?.data || error.message);

//     const message =
//       error?.response?.data?.message || error?.message || 'Register failed';

//     yield put(registerFailure(message));
//   }
// }

function* registerSaga(action) {
  try {
    const body = action.payload;

    const response = yield call(() =>
      axios.post(`${BASE_URL}/register`, body, {
        headers: {'Content-Type': 'application/json'},
      }),
    );

    yield put(registerSuccess(response.data.message));
  } catch (error) {
    const message = error?.response?.data?.message || 'Register failed';
    yield put(registerFailure(message));
  }
}

// -----------------------------------------------------
// ✅ VERIFY OTP + SAVE TOKEN INSIDE ASYNC STORAGE
// -----------------------------------------------------
// -----------------------------------------------------
// ✅ VERIFY OTP + SAVE TOKEN INSIDE ASYNC STORAGE
// -----------------------------------------------------
// function* verifyEmailOtpSaga(action) {
//   try {
//     const response = yield call(() =>
//       axios.post(
//         `${BASE_URL}/verify-otp-email`,
//         {
//           email: action.payload.email,
//           otp: action.payload.otp,
//         },
//         {headers: {'Content-Type': 'application/json'}},
//       ),
//     );
//     console.log(action.payload);
//     console.log('OTP VERIFY SUCCESS:', response.data);

//     const fullData = response.data?.data; // { user, tokens }
//     // console.log(fullData, 'fullData');
//     const token = fullData?.tokens?.access?.token;

//     console.log('LOGIN TOKEN:', token);

//     if (token) {
//       yield AsyncStorage.setItem('authToken', token);
//     }

//     // 🔥 FIX: send full data to reducer
//     yield put(verifyEmailOtpSuccess(fullData));

//     Alert.alert('Success', 'Login Successfully!', [
//       {
//         text: 'OK',
//         onPress: () => navigate('MainTabs'),
//       },
//     ]);
//   } catch (error) {
//     console.log('OTP VERIFY ERROR123:', error);

//     const message =
//       error?.response?.data?.message ||
//       error.message ||
//       'OTP verification failed';

//     yield put(verifyEmailOtpFailure(message));

//     Alert.alert('Invalid OTP', message);
//   }
// }
function* verifyEmailOtpSaga(action) {
  try {
    const response = yield call(() =>
      axios.post(
        `${BASE_URL}/verify-otp-email`,
        action.payload, // 🔥 email OR mobile
        {headers: {'Content-Type': 'application/json'}},
      ),
    );

    const fullData = response.data?.data;
    const token = fullData?.tokens?.access?.token;

    if (token) {
      yield AsyncStorage.setItem('authToken', token);
    }

    yield put(verifyEmailOtpSuccess(fullData));

    Alert.alert('Success', 'Login Successfully!', [
      {text: 'OK', onPress: () => navigate('MainTabs')},
    ]);
  } catch (error) {
    const message = error?.response?.data?.message || 'OTP verification failed';

    yield put(verifyEmailOtpFailure(message));
    Alert.alert('Invalid OTP', message);
  }
}

// -----------------------------------------------------
// ✅ RESEND OTP (NO TOKEN HERE!)
// -----------------------------------------------------
// function* resendOtpSaga(action) {
//   try {
//     const response = yield call(() =>
//       axios.post(
//         `${BASE_URL}/register`,
//         {email: action.payload.email},
//         {headers: {'Content-Type': 'application/json'}},
//       ),
//     );

//     console.log('RESEND OTP SUCCESS:', response.data);

//     yield put(resendOtpSuccess(response.data.message));
//   } catch (error) {
//     console.log('RESEND OTP ERROR:', error);

//     const message =
//       error?.response?.data?.message || error.message || 'Failed to resend OTP';

//     yield put(resendOtpFailure(message));
//   }
// }
function* resendOtpSaga(action) {
  try {
    const payload = action.payload;

    const isEmail = !!payload.email;

    const url = isEmail
      ? `${BASE_URL}/register` // email resend
      : `${BASE_URL}/send-verify-otp`; // 🔥 mobile resend

    const response = yield call(() =>
      axios.post(url, payload, {
        headers: {'Content-Type': 'application/json'},
      }),
    );

    yield put(resendOtpSuccess(response.data.message));
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || 'Failed to resend OTP';

    yield put(resendOtpFailure(message));
  }
}

// -----------------------------------------------------
// ✅ ROOT SAGA
// -----------------------------------------------------
export default function* authRootSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(VERIFY_EMAIL_OTP_REQUEST, verifyEmailOtpSaga);
  yield takeLatest(RESEND_OTP_REQUEST, resendOtpSaga);
}
