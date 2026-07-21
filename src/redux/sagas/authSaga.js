import {call, put, takeLatest} from 'redux-saga/effects';
// import axios from 'axios';
import api from '../../api/apiClient';
import {Alert, ToastAndroid} from 'react-native';
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
  // REFRESH_TOKEN_REQUEST,
} from '../actions/authActions';

// BASE URL
// const BASE_URL = 'https://mntrendigo.mntech.website/api/v1/user/auth';
// Register Saga

function* registerSaga(action) {
  try {
    const body = action.payload;

    // const response = yield call(
    //   () =>
    //     // api.post(`${BASE_URL}/register`, body, {
    //     api.post(`/user/auth/register`, body),
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //   },

    const response = yield call(api.post, '/user/auth/register', body, {
      headers: {'Content-Type': 'application/json'},
    });

    yield put(registerSuccess(response.data.message));
    console.log('REGISTER SUCCESS:', response.data);
  } catch (error) {
    const message = error?.response?.data?.message || 'Register failed';
    yield put(registerFailure(message));
  }
}

// Verifty email otp Saga
function* verifyEmailOtpSaga(action) {
  try {
    // const response = yield call(() =>
    // api.post(
    //   `${BASE_URL}/verify-otp-email`,
    //   action.payload, //  email OR mobile
    //   {headers: {'Content-Type': 'application/json'}},
    // ),

    const response = yield call(() =>
      api.post(`/user/auth/verify-otp-email`, action.payload, {
        headers: {'Content-Type': 'application/json'},
      }),
    );

    const fullData = response.data?.data;
    console.log('FULL DATA VERIFY EMAIL', fullData);
    const token = fullData?.tokens?.access?.token;
    console.log('TOKEN', token);
    const refreshToken = fullData?.tokens?.refresh?.token;
    console.log('REFRESH TOKEN', refreshToken);

    if (token) {
      // yield AsyncStorage.setItem('authToken', token);
      yield call([AsyncStorage, 'setItem'], 'authToken', token);
    }

    if (refreshToken) {
      // yield AsyncStorage.setItem('refreshToken', refreshToken);
      yield call([AsyncStorage, 'setItem'], 'refreshToken', refreshToken);
    }
    console.log('ACCESS TOKEN:', token);
    console.log('REFRESH TOKEN:', refreshToken);

    yield put(verifyEmailOtpSuccess(fullData));
    console.log('OTP VERIFY SUCCESS:', response.data);
    // Alert.alert('Success', 'Login Successfully!', [
    //   {text: 'OK', onPress: () => navigate('MainTabs')},
    // ]);

    ToastAndroid.show('Successfully logged in!', ToastAndroid.SHORT);

    // navigation
    navigate('MainTabs');
  } catch (error) {
    const message = error?.response?.data?.message || 'OTP verification failed';

    yield put(verifyEmailOtpFailure(message));
    Alert.alert('Invalid OTP', message);
  }
}
// Resend Otp saga
function* resendOtpSaga(action) {
  try {
    const payload = action.payload;
    console.log('🔥 RESEND OTP SAGA START');
    console.log('📤 PAYLOAD:', action.payload);
    const isEmail = !!payload.email;
    const url = '/user/auth/send-verify-otp';

    const response = yield call(() =>
      api.post(url, payload, {
        headers: {'Content-Type': 'application/json'},
      }),
    );

    // yield put(resendOtpSuccess(response.data.message));
    yield put(resendOtpSuccess(response.data));
    console.log('RESPONSE:', response.data);
    console.log(' RESEND_OTP_SUCCESS DISPATCHED');
    console.log('OTP RESEND SUCCESS:', response.data);
  } catch (error) {
    console.log(' RESEND OTP ERROR:', error?.response?.data);
    console.log(' FULL ERROR:', error);
    const message =
      error?.response?.data?.message || error.message || 'Failed to resend OTP';

    yield put(resendOtpFailure(message));
  }
}

// function* resendOtpSaga(action) {
//   try {
//     console.log('🔥 RESEND OTP SAGA START');
//     console.log('📤 PAYLOAD:', action.payload);

//     const response = yield call(() =>
//       api.post('/user/auth/send-verify-otp', action.payload, {
//         headers: {'Content-Type': 'application/json'},
//       }),
//     );

//     console.log('✅ RESPONSE:', response.data);
//   } catch (error) {
//     console.log('❌ ERROR:', error);
//   }
// }
//refresh token saga
// function* refreshTokenSaga(action) {
//   try {
//     const response = yield call(() =>
//       axios.post(
//         `${BASE_URL}/refresh-tokens`,
//         {refreshToken: action.payload},
//         {headers: {'Content-Type': 'application/json'}},
//       ),
//     );

//     const newAccessToken = response.data?.data?.access?.token;
//     const newRefreshToken = response.data?.data?.refresh?.token;

//     if (newAccessToken) {
//       yield AsyncStorage.setItem('authToken', newAccessToken);
//     }

//     if (newRefreshToken) {
//       yield AsyncStorage.setItem('refreshToken', newRefreshToken);
//     }

//     yield put({
//       type: 'REFRESH_TOKEN_SUCCESS',
//       payload: response.data.data,
//     });

//     console.log(' Token refreshed successfully');
//   } catch (error) {
//     console.log(' Refresh token failed');

//     yield put({
//       type: 'REFRESH_TOKEN_FAILURE',
//       payload: error.response?.status,
//     });
//   }
// }

// -----------------------------------------------------
// ROOT SAGA
// -----------------------------------------------------
export default function* authRootSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(VERIFY_EMAIL_OTP_REQUEST, verifyEmailOtpSaga);
  yield takeLatest(RESEND_OTP_REQUEST, resendOtpSaga);
  // yield takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}
