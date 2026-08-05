import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  sellerLoginSuccess,
  sellerLoginFailure,
  SELLER_LOGIN_REQUEST,
  SELLER_FORGOT_PASSWORD_REQUEST,
  sellerForgotPasswordSuccess,
  sellerForgotPasswordFailure,
  sellerVerifyResetOtpSuccess,
  sellerVerifyResetOtpFailure,
  SELLER_VERIFY_RESET_OTP_REQUEST,
  SELLER_RESET_PASSWORD_REQUEST,
  sellerResetPasswordSuccess,
  sellerResetPasswordFailure,
} from '../actions/sellerAuthActions';
import api from '../../api/apiClient';
import axios from 'axios';
function* sellerLoginSaga(action) {
  try {
    console.log('SELLER LOGIN REQUEST PAYLOAD =>', action.payload);

    // const response = yield call(
    //   api.post,
    //   '/user/seller-auth/login',
    //   action.payload,
    // );
    const response = yield call(
      axios.post,
      'https://mntrendigo.mntech.website/api/v1/user/seller-auth/login',
      action.payload,
    );

    console.log(
      'SELLER LOGIN RESPONSE =>',
      JSON.stringify(response.data, null, 2),
    );

    const sellerData = response.data?.data?.seller;

    const sellerAccessToken = response.data?.data?.tokens?.access?.token;

    const sellerRefreshToken = response.data?.data?.tokens?.refresh?.token;

    console.log('SELLER ACCESS TOKEN =>', sellerAccessToken);

    console.log('SELLER REFRESH TOKEN =>', sellerRefreshToken);

    console.log('SELLER INFO =>', JSON.stringify(sellerData, null, 2));

    // Save Tokens
    if (sellerAccessToken) {
      yield call(AsyncStorage.setItem, 'sellerAccessToken', sellerAccessToken);

      console.log('SELLER ACCESS TOKEN SAVED');
    }

    if (sellerRefreshToken) {
      yield call(
        AsyncStorage.setItem,
        'sellerRefreshToken',
        sellerRefreshToken,
      );

      console.log('SELLER REFRESH TOKEN SAVED');
    }

    yield put(sellerLoginSuccess(response.data));

    console.log('SELLER LOGIN SUCCESS ACTION DISPATCHED');
  } catch (error) {
    console.log(
      'SELLER LOGIN ERROR =>',
      error?.response?.data || error.message,
    );

    yield put(sellerLoginFailure(error?.response?.data || error.message));
  }
}

function* sellerForgotPasswordSaga(action) {
  try {
    console.log('FORGOT PASSWORD REQUEST =>', action.payload);

    // const response = yield call(
    //   api.post,
    //   '/user/seller-auth/forgot-password',
    //   action.payload,
    // );

    const response = yield call(
      axios.post,
      'https://mntrendigo.mntech.website/api/v1/user/seller-auth/forgot-password',
      action.payload,
    );

    console.log('FORGOT PASSWORD RESPONSE =>', response.data);

    yield put(sellerForgotPasswordSuccess(response.data));
  } catch (error) {
    console.log('FORGOT PASSWORD ERROR =>', error.response?.data);

    yield put(
      sellerForgotPasswordFailure(error.response?.data || error.message),
    );
  }
}

function* sellerVerifyResetOtpSaga(action) {
  try {
    console.log('VERIFY RESET OTP REQUEST =>', action.payload);

    const response = yield call(
      axios.post,
      'https://mntrendigo.mntech.website/api/v1/user/seller-auth/verify-reset-otp',
      action.payload,
    );

    console.log('VERIFY RESET OTP RESPONSE =>', response.data);

    yield put(sellerVerifyResetOtpSuccess(response.data));
  } catch (error) {
    console.log('VERIFY RESET OTP ERROR =>', error.response?.data);

    yield put(
      sellerVerifyResetOtpFailure(error.response?.data || error.message),
    );
  }
}

function* sellerResetPasswordSaga(action) {
  try {
    console.log('RESET PASSWORD REQUEST =>', action.payload);

    const response = yield call(
      axios.post,
      'https://mntrendigo.mntech.website/api/v1/user/seller-auth/reset-password',
      action.payload,
    );

    console.log('RESET PASSWORD RESPONSE =>', response.data);

    yield put(sellerResetPasswordSuccess(response.data));
  } catch (error) {
    console.log(
      'RESET PASSWORD ERROR =>',
      error.response?.data || error.message,
    );

    yield put(
      sellerResetPasswordFailure(error.response?.data || error.message),
    );
  }
}

export default function* sellerAuthSaga() {
  yield takeLatest(SELLER_LOGIN_REQUEST, sellerLoginSaga);
  yield takeLatest(SELLER_FORGOT_PASSWORD_REQUEST, sellerForgotPasswordSaga);
  yield takeLatest(SELLER_VERIFY_RESET_OTP_REQUEST, sellerVerifyResetOtpSaga);
  yield takeLatest(SELLER_RESET_PASSWORD_REQUEST, sellerResetPasswordSaga);
}
