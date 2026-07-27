import {VERIFY_EMAIL_OTP_FAILURE} from './authActions';
export const RESET_ACCOUNT_ERROR = 'RESET_ACCOUNT_ERROR';
// SEND OTP
export const SEND_EMAIL_OTP_REQUEST = 'SEND_EMAIL_OTP_REQUEST';
export const SEND_EMAIL_OTP_SUCCESS = 'SEND_EMAIL_OTP_SUCCESS';
export const SEND_EMAIL_OTP_FAILURE = 'SEND_EMAIL_OTP_FAILURE';

export const VERIFY_CHANGE_EMAIL_OTP_REQUEST =
  'VERIFY_CHANGE_EMAIL_OTP_REQUEST';
export const VERIFY_CHANGE_EMAIL_OTP_SUCCESS =
  'VERIFY_CHANGE_EMAIL_OTP_SUCCESS';
export const VERIFY_CHANGE_EMAIL_OTP_FAILURE =
  'VERIFY_CHANGE_EMAIL_OTP_FAILURE';
// DELETE ACCOUNT
export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';

export const GET_ME_REQUEST = 'GET_ME_REQUEST';
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const GET_ME_FAILURE = 'GET_ME_FAILURE';
// SEND OTP - MOBILE
export const SEND_MOBILE_OTP_REQUEST = 'SEND_MOBILE_OTP_REQUEST';
export const SEND_MOBILE_OTP_SUCCESS = 'SEND_MOBILE_OTP_SUCCESS';
export const SEND_MOBILE_OTP_FAILURE = 'SEND_MOBILE_OTP_FAILURE';
export const RESET_MOBILE_MESSAGE = 'RESET_MOBILE_MESSAGE';

export const resetMobileMessage = () => ({
  type: RESET_MOBILE_MESSAGE,
});

// VERIFY OTP - MOBILE
export const VERIFY_CHANGE_MOBILE_OTP_REQUEST =
  'VERIFY_CHANGE_MOBILE_OTP_REQUEST';
export const VERIFY_CHANGE_MOBILE_OTP_SUCCESS =
  'VERIFY_CHANGE_MOBILE_OTP_SUCCESS';
export const VERIFY_CHANGE_MOBILE_OTP_FAILURE =
  'VERIFY_CHANGE_MOBILE_OTP_FAILURE';

export const sendMobileOtpRequest = payload => ({
  type: SEND_MOBILE_OTP_REQUEST,
  payload,
});
export const verifyMobileOtpRequest = (
  // token,
  currentMobileNumber,
  newMobileNumber,
  otp,
) => ({
  type: VERIFY_CHANGE_MOBILE_OTP_REQUEST,
  payload: {currentMobileNumber, newMobileNumber, otp},
});

// userAccountActions.js
export const RESET_EMAIL_VERIFY_STATUS = 'RESET_EMAIL_VERIFY_STATUS';

export const resetEmailVerifyStatus = () => ({
  type: RESET_EMAIL_VERIFY_STATUS,
});

export const getMeRequest = () => ({
  type: GET_ME_REQUEST,
  // payload: {token},
});

export const sendEmailOtpRequest = (currentEmail, newEmail) => ({
  type: SEND_EMAIL_OTP_REQUEST,
  payload: {currentEmail, newEmail},
});

export const verifyEmailOtpRequest = (currentEmail, newEmail, otp) => ({
  type: VERIFY_EMAIL_OTP_FAILURE,
  payload: {currentEmail, newEmail, otp},
});

export const deleteAccountRequest = token => ({
  type: DELETE_ACCOUNT_REQUEST,
  // payload: token,
});

export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountFailure = error => ({
  type: DELETE_ACCOUNT_FAILURE,
  payload: error,
});
export const resetAccountError = () => ({
  type: RESET_ACCOUNT_ERROR,
});
