import {call, put, takeLatest} from 'redux-saga/effects';
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
} from '../actions/authActions';

function* registerSaga(action) {
  try {
    const body = action.payload;
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

      // type of login
      yield call(
        [AsyncStorage, 'setItem'],
        'userSession',
        JSON.stringify({
          type: 'customer',
          token,
        }),
      );

      console.log('LOGIN TYPE SAVED => customer');
    }

    if (refreshToken) {
      // yield AsyncStorage.setItem('refreshToken', refreshToken);
      yield call([AsyncStorage, 'setItem'], 'refreshToken', refreshToken);
    }
    console.log('ACCESS TOKEN:', token);
    console.log('REFRESH TOKEN:', refreshToken);

    yield put(verifyEmailOtpSuccess(fullData));
    console.log('OTP VERIFY SUCCESS:', response.data);
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
    console.log('RESEND OTP SAGA START');
    console.log('PAYLOAD:', action.payload);
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

export default function* authRootSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(VERIFY_EMAIL_OTP_REQUEST, verifyEmailOtpSaga);
  yield takeLatest(RESEND_OTP_REQUEST, resendOtpSaga);
}
