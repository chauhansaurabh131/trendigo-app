import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_FAILURE,
  VERIFY_CHANGE_EMAIL_OTP_REQUEST,
  VERIFY_CHANGE_EMAIL_OTP_SUCCESS,
  VERIFY_CHANGE_EMAIL_OTP_FAILURE,
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  deleteAccountSuccess,
  deleteAccountFailure,
  SEND_MOBILE_OTP_FAILURE,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  VERIFY_CHANGE_MOBILE_OTP_REQUEST,
  VERIFY_CHANGE_MOBILE_OTP_SUCCESS,
  VERIFY_CHANGE_MOBILE_OTP_FAILURE,
} from '../actions/userAccountActions';
import api from '../../api/apiClient';

function getMeApi() {
  return api.get('/user/auth/me');
}

function* getMeSaga(action) {
  try {
    console.log(' GET_ME_SAGA CALLED');
    console.log(' ACTION:', action);

    console.log(' CALLING API...');

    const response = yield call(getMeApi);

    console.log(' API RESPONSE:', response.data);

    yield put({
      type: GET_ME_SUCCESS,
      payload: response.data,
    });

    console.log('DISPATCHED GET_ME_SUCCESS');
  } catch (error) {
    console.log(' GET ME ERROR:', error);
    console.log(' ERROR RESPONSE:', error.response?.data);

    yield put({
      type: GET_ME_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

//send email otp Saga

function sendOtpApi(currentEmail, newEmail) {
  return api.post('/user/auth/send-otp-change-email', {
    email: {currentEmail, newEmail},
  });
}
// SEND OTP Saga
function* sendOtpSaga(action) {
  try {
    console.log(' SEND OTP SAGA CALLED');
    console.log(' FULL ACTION:', action);

    // const {token, currentEmail, newEmail} = action.payload;
    const {currentEmail, newEmail} = action.payload;
    // console.log('TOKEN:', token);
    console.log('CURRENT EMAIL:', currentEmail);
    console.log('NEW EMAIL:', newEmail);

    console.log(' CALLING SEND OTP API...');

    // const response = yield call(sendOtpApi, token, currentEmail, newEmail);

    const response = yield call(sendOtpApi, currentEmail, newEmail);
    console.log('SEND OTP API RESPONSE:', response);
    console.log('API RESPONSE:', response.data);

    yield put({
      type: SEND_EMAIL_OTP_SUCCESS,
      payload: response.data,
    });

    console.log(' DISPATCHED SEND_EMAIL_OTP_SUCCESS');
  } catch (error) {
    console.log(' SEND OTP ERROR:', error);
    console.log(' ERROR RESPONSE:', error.response?.data);

    yield put({
      type: SEND_EMAIL_OTP_FAILURE,
      error: error.response?.data || error.message,
    });
  }
}
// VERIFY OTP Saga

function verifyOtpApi(currentEmail, newEmail, otp) {
  return api.post('/user/auth/verify-otp-change-email', {
    email: {currentEmail, newEmail, otp},
  });
}
function* verifyOtpSaga(action) {
  try {
    console.log(' VERIFY OTP ACTION PAYLOAD:', action.payload);

    const {
      // token,
      currentEmail,
      newEmail,
      otp,
    } = action.payload;

    // Log before API call
    console.log(' Calling verifyOtpApi with:', {
      // token,
      currentEmail,
      newEmail,
      otp,
    });

    // API CALL
    const response = yield call(
      verifyOtpApi,
      // token,
      currentEmail,
      newEmail,
      otp,
    );

    //  Log API response
    console.log('VERIFY OTP RESPONSE:', response.data);

    // If backend gives updated email or message
    const successPayload = {
      message: response.data?.message,
      updatedEmail: response.data?.data?.email,
      user: response.data?.data?.user,
      token: response.data?.data?.token,
    };

    console.log(' VERIFY OTP SUCCESS PAYLOAD:', successPayload);

    // SUCCESS DISPATCH
    yield put({
      type: VERIFY_CHANGE_EMAIL_OTP_SUCCESS,
      payload: successPayload,
    });
    yield put({
      type: GET_ME_REQUEST,
    });
  } catch (error) {
    console.error(' VERIFY OTP ERROR:', error.response?.data || error.message);

    yield put({
      type: VERIFY_CHANGE_EMAIL_OTP_FAILURE,
      // payload: errorMessage,
      error: error,
    });
  }
}

// SEND MOBILE OTP SAGA

function sendMobileOtpApi(currentMobileNumber, newMobileNumber) {
  return api.post('/user/auth/send-otp-change-email', {
    mobileNumber: {
      currentMobileNumber,
      newMobileNumber,
    },
  });
}

function* sendMobileOtpSaga(action) {
  try {
    console.log(' SEND MOBILE OTP SAGA CALLED');

    console.log(' ACTION:', action);

    // const {token, currentMobileNumber, newMobileNumber} = action.payload;
    const {currentMobileNumber, newMobileNumber} = action.payload;

    console.log(' CURRENT MOBILE:', currentMobileNumber);
    console.log(' NEW MOBILE:', newMobileNumber);

    console.log('CALLING SEND MOBILE OTP API...');

    const response = yield call(
      sendMobileOtpApi,
      // token,
      currentMobileNumber,
      newMobileNumber,
    );

    console.log(' API RESPONSE:', response.data);

    yield put({
      type: SEND_MOBILE_OTP_SUCCESS,
      payload: response.data,
    });

    console.log(' DISPATCHED SEND_MOBILE_OTP_SUCCESS');
  } catch (error) {
    console.log(' SEND MOBILE OTP ERROR:', error);

    console.log('ERROR RESPONSE:', error.response?.data);

    yield put({
      type: SEND_MOBILE_OTP_FAILURE,
      payload: error.response?.data?.message || 'Failed to send OTP',
    });
  }
}

function verifyMobileOtpApi(currentMobileNumber, newMobileNumber, otp) {
  return api.post('/user/auth/verify-otp-change-email', {
    mobileNumber: {
      currentMobileNumber,
      newMobileNumber,
      otp,
    },
  });
}

function* verifyMobileOtpSaga(action) {
  try {
    console.log(' VERIFY MOBILE OTP SAGA CALLED');

    console.log(' ACTION:', action);

    const {currentMobileNumber, newMobileNumber, otp} = action.payload;

    console.log(' CURRENT MOBILE:', currentMobileNumber);
    console.log('NEW MOBILE:', newMobileNumber);
    console.log('OTP:', otp);

    console.log('CALLING VERIFY MOBILE OTP API...');

    const response = yield call(
      verifyMobileOtpApi,
      currentMobileNumber,
      newMobileNumber,
      otp,
    );

    console.log('VERIFY MOBILE OTP RESPONSE:', response.data);

    yield put({
      type: VERIFY_CHANGE_MOBILE_OTP_SUCCESS,
      payload: response.data,
    });

    console.log(' DISPATCHED VERIFY_CHANGE_MOBILE_OTP_SUCCESS');

    console.log(' CALLING GET_ME AFTER SUCCESS');

    yield put({type: GET_ME_REQUEST});
  } catch (error) {
    console.log('VERIFY MOBILE OTP ERROR:', error);

    console.log(' ERROR RESPONSE:', error.response?.data);

    yield put({
      type: VERIFY_CHANGE_MOBILE_OTP_FAILURE,
      payload: error.response?.data?.message || 'Invalid OTP',
    });

    console.log(' DISPATCHED VERIFY_CHANGE_MOBILE_OTP_FAILURE');
  }
}

// DELETE ACCOUNT SAGA
function deleteAccountApi() {
  console.log('DELETE API FUNCTION CALLED');

  console.log('DELETE API FUNCTION CALLED');

  return api.delete('/user/user/');
}

function* deleteAccountSaga(action) {
  console.log(' [DELETE ACCOUNT] Saga Started');

  try {
    console.log(' CALLING DELETE ACCOUNT API...');

    const res = yield call(deleteAccountApi);
    // Reset Redux states
    yield put({type: 'RESET_WISHLIST'});
    yield put({type: 'RESET_CART'});
    // yield put({type: 'RESET_RECENT_SEARCH'});
    // yield put({type: 'RESET_RECENTLY_VIEWED'});
    // yield put({type: 'LOGOUT'}); // if you have this in authReducer

    console.log(' DELETE API SUCCESS RESPONSE:', res);
    console.log('RESPONSE DATA:', res.data);

    // dispatch success
    yield put(deleteAccountSuccess());
    console.log(' DISPATCHED deleteAccountSuccess');
  } catch (error) {
    console.log(' DELETE ACCOUNT ERROR OCCURRED');

    console.log(' FULL ERROR:', error);

    console.log(' ERROR RESPONSE:', error.response);

    console.log(' ERROR DATA:', error.response?.data);

    console.log(' ERROR MESSAGE:', error.message);

    yield put(
      deleteAccountFailure(
        error.response?.data?.message || 'Delete account failed',
      ),
    );
    console.log(' DISPATCHED deleteAccountFailure');
  }

  console.log(' [DELETE ACCOUNT] Saga Finished');
}
export default function* userAccountSaga() {
  yield takeLatest(SEND_EMAIL_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_CHANGE_EMAIL_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(GET_ME_REQUEST, getMeSaga);
  yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountSaga);
  yield takeLatest(SEND_MOBILE_OTP_REQUEST, sendMobileOtpSaga);
  yield takeLatest(VERIFY_CHANGE_MOBILE_OTP_REQUEST, verifyMobileOtpSaga);
}
