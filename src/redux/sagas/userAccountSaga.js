// // import {call, put, takeLatest} from 'redux-saga/effects';
// // import {
// //   GET_ME_REQUEST,
// //   GET_ME_SUCCESS,
// //   GET_ME_FAILURE,
// //   deleteAccountSuccess,
// //   deleteAccountFailure,
// // } from '../actions/userAccountActions';
// // import axios from 'axios';

// // function getUserApi(token) {
// //   return axios.get('https://mntrendigo.mntech.website/api/v1/user/auth/me', {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });
// // }

// // function* getUserWorker(action) {
// //   try {
// //     const response = yield call(getUserApi, action.token);
// //     console.log('API RESPONSE:', response.data);
// //     yield put({type: GET_ME_SUCCESS, payload: response.data});
// //   } catch (error) {
// //     yield put({type: GET_ME_FAILURE, error: error.message});
// //     console.log('API ERROR:', error);
// //   }
// // }

// // function deleteAccountApi(token) {
// //   return axios.delete('https://mntrendigo.mntech.website/api/v1/user/user/', {
// //     headers: {Authorization: `Bearer ${token}`},
// //   });
// // }

// // function* deleteAccountWorker(action) {
// //   try {
// //     const response = yield call(deleteAccountApi, action.token);
// //     yield put(deleteAccountSuccess(response.data));
// //     console.log('Account deleted:', response.data);
// //   } catch (error) {
// //     yield put(deleteAccountFailure(error.response?.data || error.message));
// //     console.log('Delete account error:', error);
// //   }
// // }

// // export default function* userAccountSaga() {
// //   yield takeLatest(GET_ME_REQUEST, getUserWorker);
// //   yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountWorker);
// // }

// import {call, put, takeLatest} from 'redux-saga/effects';
// import {Alert} from 'react-native';
// import {
//   GET_ME_REQUEST,
//   GET_ME_SUCCESS,
//   GET_ME_FAILURE,
//   DELETE_ACCOUNT_REQUEST,
//   deleteAccountSuccess,
//   deleteAccountFailure,
//   SEND_EMAIL_OTP_REQUEST,
//   VERIFY_EMAIL_OTP_REQUEST,
//   sendEmailOtpSuccess,
//   sendEmailOtpFailure,
//   verifyEmailOtpSuccess,
//   verifyEmailOtpFailure,
//   // verifyEmailOtpApi,
// } from '../actions/userAccountActions';
// import axios from 'axios';
// import {navigate} from '../../navigations/NavigationService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {combineReducers} from '@reduxjs/toolkit';
// // GET ME API
// function getUserApi(token) {
//   return axios.get('https://mntrendigo.mntech.website/api/v1/user/auth/me', {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// }

// function* getUserWorker(action) {
//   try {
//     const response = yield call(getUserApi, action.token);
//     console.log('API RESPONSE:', response.data);
//     yield put({type: GET_ME_SUCCESS, payload: response.data});
//   } catch (error) {
//     yield put({type: GET_ME_FAILURE, error: error.message});
//     console.log('API ERROR:', error);
//   }
// }

// // DELETE ACCOUNT API
// function deleteAccountApi(token) {
//   return axios.delete('https://mntrendigo.mntech.website/api/v1/user/user/', {
//     headers: {Authorization: `Bearer ${token}`},
//   });
// }

// function* deleteAccountWorker(action) {
//   try {
//     const response = yield call(deleteAccountApi, action.token);
//     console.log('Account deleted:', response.data);
//     yield put(deleteAccountSuccess(response.data));
//     Alert.alert(
//       'Account Deleted',
//       'Your account has been successfully deleted.',
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             // USER LOGOUT → SEND TO LOGIN
//             navigate('StartingScreen');
//           },
//         },
//       ],
//     );
//   } catch (error) {
//     console.log('Delete account error:', error);
//     yield put(deleteAccountFailure(error.response?.data || error.message));
//   }
// }

// function sendEmailOtpApi(token, currentEmail, newEmail) {
//   return axios.post(
//     'https://mntrendigo.mntech.website/api/v1/user/auth/send-otp-change-email',
//     {
//       email: {
//         currentEmail,
//         newEmail,
//       },
//     },
//     {
//       headers: {Authorization: `Bearer ${token}`},
//     },
//   );
// }
// // function* sendEmailOtpWorker(action) {
// //   try {
// //     const {currentEmail, newEmail, token} = action.payload;

// //     console.log('FINAL SAGa PARAMS:', {currentEmail, newEmail, token});

// //     const res = yield call(sendEmailOtpApi, token, currentEmail, newEmail);

// //     yield put(sendEmailOtpSuccess(res.data));
// //   } catch (e) {
// //     console.log('SEND OTP ERROR', e.response?.data);
// //   }
// // }

// function* sendEmailOtpWorker(action) {
//   try {
//     const {currentEmail, newEmail} = action.payload;

//     // ⭐ GET TOKEN FROM STORAGE
//     const token = yield AsyncStorage.getItem('authToken');

//     console.log('TOKEN FROM STORAGE:', token);

//     const res = yield call(sendEmailOtpApi, token, currentEmail, newEmail);

//     yield put(sendEmailOtpSuccess(res.data));
//   } catch (e) {
//     console.log('SEND OTP ERROR', e.response?.data);
//   }
// }

// export const verifyEmailOtpApi = (token, currentEmail, newEmail, otp) => {
//   return axios.post(
//     'https://mntrendigo.mntech.website/api/v1/user/auth/verify-otp-change-email',
//     {
//       email: {
//         // currentEmail: currentEmail,
//         // newEmail: newEmail,
//         // otp: otp,
//         currentEmail,
//         newEmail,
//         otp,
//       },
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// };

// // function* verifyEmailOtpWorker(action) {
// //   try {
// //     const {token, currentEmail, newEmail, otp} = action.payload;
// //     console.log('token1234', token);
// //     console.log('SAGA → SENDING TO API:', {token, currentEmail, newEmail, otp});

// //     const response = yield call(
// //       verifyEmailOtpApi,
// //       token,
// //       currentEmail,
// //       newEmail,
// //       otp,
// //     );

// //     yield put(verifyEmailOtpSuccess(response.data));
// //     console.log('response', response);
// //   } catch (error) {
// //     console.log('OTP VERIFY ERROR1234:', error.response?.data || error);
// //     yield put(verifyEmailOtpFailure(error.response?.data || error.message));
// //   }
// // }

// function* verifyEmailOtpWorker(action) {
//   try {
//     const {currentEmail, newEmail, otp} = action.payload;
//     // console.log(action, 'payload123');
//     console.log(newEmail, 'newEmail');
//     console.log(currentEmail, 'currentEmail'), console.log(otp, 'otp');

//     // ⭐ GET TOKEN FROM STORAGE
//     const token = yield AsyncStorage.getItem('authToken');

//     console.log('TOKEN FROM STORAGE (Verify):', token);

//     const response = yield call(
//       verifyEmailOtpApi,
//       token,
//       currentEmail,
//       newEmail,
//       otp,
//     );

//     yield put(verifyEmailOtpSuccess(response.data));
//     console.log('response', response);
//   } catch (error) {
//     console.log('OTP VERIFY ERROR1234:', error.response?.data || error);
//     yield put(verifyEmailOtpFailure(error.response?.data || error.message));
//   }
// }

// // ROOT SAGA FOR THIS MODULE
// export default function* userAccountSaga() {
//   yield takeLatest(GET_ME_REQUEST, getUserWorker);
//   yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountWorker);
//   yield takeLatest(SEND_EMAIL_OTP_REQUEST, sendEmailOtpWorker);
//   yield takeLatest(VERIFY_EMAIL_OTP_REQUEST, verifyEmailOtpWorker);
// }

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

export default function* userAccountSaga() {
  yield takeLatest(SEND_EMAIL_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_CHANGE_EMAIL_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(GET_ME_REQUEST, getMeSaga);
  yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccountSaga);
}
