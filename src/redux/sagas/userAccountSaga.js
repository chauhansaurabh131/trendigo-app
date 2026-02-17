import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_FAILURE,
  // VERIFY_EMAIL_OTP_REQUEST,
  // VERIFY_EMAIL_OTP_SUCCESS,
  // VERIFY_EMAIL_OTP_FAILURE,
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

function sendOtpApi(token, currentEmail, newEmail) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/auth/send-otp-change-email',
    {
      email: {currentEmail, newEmail},
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
}

function verifyOtpApi(token, currentEmail, newEmail, otp) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/auth/verify-otp-change-email',
    {
      email: {currentEmail, newEmail, otp},
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
}

// SEND OTP Saga
function* sendOtpSaga(action) {
  try {
    const {token, currentEmail, newEmail} = action.payload;
    console.log(action, 'action');
    const response = yield call(sendOtpApi, token, currentEmail, newEmail);
    console.log(response, 'response');
    yield put({type: SEND_EMAIL_OTP_SUCCESS, payload: response.data});
  } catch (error) {
    yield put({type: SEND_EMAIL_OTP_FAILURE, error});
  }
}

// // VERIFY OTP Saga
// function* verifyOtpSaga(action) {
//   try {
//     const {token, currentEmail, newEmail, otp} = action.payload;
//     const response = yield call(
//       verifyOtpApi,
//       token,
//       currentEmail,
//       newEmail,
//       otp,
//     );
//     console.log(response, 'response123');
//     yield put({type: VERIFY_CHANGE_EMAIL_OTP_SUCCESS, payload: response.data});
//     console.log(VERIFY_CHANGE_EMAIL_OTP_SUCCESS, 'responseData');
//   } catch (error) {
//     yield put({type: VERIFY_CHANGE_EMAIL_OTP_FAILURE, error});
//   }
// }

function* verifyOtpSaga(action) {
  try {
    const {token, currentEmail, newEmail, otp} = action.payload;

    // API CALL
    const response = yield call(
      verifyOtpApi,
      token,
      currentEmail,
      newEmail,
      otp,
    );

    console.log('VERIFY OTP RESPONSE:', response.data);

    // If backend gives updated email or message:
    const successPayload = {
      message: response.data?.message,
      updatedEmail: response.data?.data?.email,
      user: response.data?.data?.user,
      token: response.data?.data?.token,
    };

    // SUCCESS DISPATCH
    yield put({
      type: VERIFY_CHANGE_EMAIL_OTP_SUCCESS,
      payload: successPayload,
    });
  } catch (error) {
    // console.log('VERIFY OTP ERROR:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Email already taken';

    yield put({
      type: VERIFY_CHANGE_EMAIL_OTP_FAILURE,
      // error: error,
      payload: errorMessage, // 🔥 only message
    });
  }
}

function getMeApi(token) {
  return axios.get('https://mntrendigo.mntech.website/api/v1/user/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function* getMeSaga(action) {
  try {
    const {token} = action.payload;
    const response = yield call(getMeApi, token);

    yield put({
      type: GET_ME_SUCCESS,
      payload: response.data, // { user: {...} }
    });
  } catch (error) {
    console.log('GET ME ERROR', error);
    yield put({
      type: GET_ME_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

// function deleteAccountApi(token) {
//   return axios.delete('https://mntrendigo.mntech.website/api/v1/user/user/', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

function deleteAccountApi(token) {
  return axios.delete('https://mntrendigo.mntech.website/api/v1/user/user/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function* deleteAccountSaga(action) {
  try {
    const token = action.payload;
    console.log('TOKEN IN SAGA:', token);

    const res = yield call(deleteAccountApi, token);
    console.log('DELETE API RESPONSE:', res.data);

    yield put(deleteAccountSuccess());
  } catch (error) {
    console.log('DELETE API ERROR:', error.response?.data);
    yield put(deleteAccountFailure(error.response?.data || 'Error'));
  }
}
function sendMobileOtpApi(token, currentMobileNumber, newMobileNumber) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/auth/send-otp-change-email',
    {
      mobileNumber: {currentMobileNumber, newMobileNumber},
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
}

function verifyMobileOtpApi(token, currentMobileNumber, newMobileNumber, otp) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/auth/verify-otp-change-email',
    {
      mobileNumber: {currentMobileNumber, newMobileNumber, otp},
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
}
function* sendMobileOtpSaga(action) {
  try {
    const {token, currentMobileNumber, newMobileNumber} = action.payload;

    const response = yield call(
      sendMobileOtpApi,
      token,
      currentMobileNumber,
      newMobileNumber,
    );

    yield put({
      type: SEND_MOBILE_OTP_SUCCESS,
      payload: response.data,
    });
    console.log('response.data', response.data);
  } catch (error) {
    yield put({
      type: SEND_MOBILE_OTP_FAILURE,
      payload: error.response?.data?.message || 'Failed to send OTP',
    });
  }
}

function* verifyMobileOtpSaga(action) {
  try {
    const {token, currentMobileNumber, newMobileNumber, otp} = action.payload;

    const response = yield call(
      verifyMobileOtpApi,
      token,
      currentMobileNumber,
      newMobileNumber,
      otp,
    );

    yield put({
      type: VERIFY_CHANGE_MOBILE_OTP_SUCCESS,
      payload: response.data,
    });
    console.log('response.data', response.data);

    // 🔥 Refresh user data after success
    yield put({type: GET_ME_REQUEST, payload: {token}});
  } catch (error) {
    yield put({
      type: VERIFY_CHANGE_MOBILE_OTP_FAILURE,
      payload: error.response?.data?.message || 'Invalid OTP',
    });
    console.log('VERIFY MOBILE OTP ERROR:', error.response?.data);
  }
}

export default function* userAccountSaga() {
  yield takeLatest(SEND_EMAIL_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_CHANGE_EMAIL_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(GET_ME_REQUEST, getMeSaga);
  yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountSaga);
  yield takeLatest(SEND_MOBILE_OTP_REQUEST, sendMobileOtpSaga);
  console.log('SETTING UP VERIFY MOBILE OTP SAGA');
  yield takeLatest(VERIFY_CHANGE_MOBILE_OTP_REQUEST, verifyMobileOtpSaga);
}
