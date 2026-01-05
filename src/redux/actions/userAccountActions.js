// export const GET_ME_REQUEST = 'GET_ME_REQUEST';
// export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
// export const GET_ME_FAILURE = 'GET_ME_FAILURE';

// export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
// export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
// export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';

// export const SEND_EMAIL_OTP_REQUEST = 'SEND_EMAIL_OTP_REQUEST';
// export const SEND_EMAIL_OTP_SUCCESS = 'SEND_EMAIL_OTP_SUCCESS';
// export const SEND_EMAIL_OTP_FAILURE = 'SEND_EMAIL_OTP_FAILURE';

// export const VERIFY_EMAIL_OTP_REQUEST = 'VERIFY_EMAIL_OTP_REQUEST';
// export const VERIFY_EMAIL_OTP_SUCCESS = 'VERIFY_EMAIL_OTP_SUCCESS';
// export const VERIFY_EMAIL_OTP_FAILURE = 'VERIFY_EMAIL_OTP_FAILURE';
// export const RESET_EMAIL_UPDATE_FLAG = ' RESET_EMAIL_UPDATE_FLAG';
// // Action creators
// export const deleteAccountRequest = token => ({
//   type: DELETE_ACCOUNT_REQUEST,
//   token,
// });

// export const deleteAccountSuccess = data => ({
//   type: DELETE_ACCOUNT_SUCCESS,
//   payload: data,
// });

// export const deleteAccountFailure = error => ({
//   type: DELETE_ACCOUNT_FAILURE,
//   error,
// });
// export const getMeRequest = token => ({
//   type: GET_ME_REQUEST,
//   token, // pass token
// });

// export const getMeSuccess = payload => ({
//   type: GET_ME_SUCCESS,
//   payload,
// });

// export const getMeFailure = error => ({
//   type: GET_ME_FAILURE,
//   error,
// });

// // export const sendEmailOtpRequest = (token, currentEmail, newEmail) => ({
// //   type: SEND_EMAIL_OTP_REQUEST,
// //   token,
// //   currentEmail,
// //   newEmail,
// // });

// export const sendEmailOtpRequest = (currentEmail, newEmail) => ({
//   type: SEND_EMAIL_OTP_REQUEST,
//   payload: {currentEmail, newEmail},
// });

// export const sendEmailOtpSuccess = data => ({
//   type: SEND_EMAIL_OTP_SUCCESS,
//   payload: data,
// });

// export const sendEmailOtpFailure = error => ({
//   type: SEND_EMAIL_OTP_FAILURE,
//   error,
// });

// // export const verifyEmailOtpRequest = payload => ({
// //   type: VERIFY_EMAIL_OTP_REQUEST,
// //   payload, // payload में token, currentEmail, newEmail, otp होना चाहिए
// // });

// export const verifyEmailOtpRequest = (currentEmail, newEmail, otp) => ({
//   type: VERIFY_EMAIL_OTP_REQUEST,
//   payload: {currentEmail, newEmail, otp},
// });

// export const verifyEmailOtpSuccess = payload => ({
//   type: VERIFY_EMAIL_OTP_SUCCESS,
//   payload, // ✔ Only return what backend gives
// });

// export const verifyEmailOtpFailure = error => ({
//   type: VERIFY_EMAIL_OTP_FAILURE,
//   error,
// });

// export const resetEmailUpdateFlag = () => ({
//   type: 'RESET_EMAIL_UPDATE_FLAG',
// });

// SEND OTP
export const SEND_EMAIL_OTP_REQUEST = 'SEND_EMAIL_OTP_REQUEST';
export const SEND_EMAIL_OTP_SUCCESS = 'SEND_EMAIL_OTP_SUCCESS';
export const SEND_EMAIL_OTP_FAILURE = 'SEND_EMAIL_OTP_FAILURE';

// VERIFY OTP
// export const VERIFY_EMAIL_OTP_REQUEST = 'VERIFY_EMAIL_OTP_REQUEST';
// export const VERIFY_EMAIL_OTP_SUCCESS = 'VERIFY_EMAIL_OTP_SUCCESS';
// export const VERIFY_EMAIL_OTP_FAILURE = 'VERIFY_EMAIL_OTP_FAILURE';

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
// userAccountActions.js
export const RESET_EMAIL_VERIFY_STATUS = 'RESET_EMAIL_VERIFY_STATUS';

export const resetEmailVerifyStatus = () => ({
  type: RESET_EMAIL_VERIFY_STATUS,
});

export const getMeRequest = token => ({
  type: GET_ME_REQUEST,
  payload: {token},
});

export const sendEmailOtpRequest = (token, currentEmail, newEmail) => ({
  type: SEND_EMAIL_OTP_REQUEST,
  payload: {token, currentEmail, newEmail},
});

export const verifyEmailOtpRequest = (token, currentEmail, newEmail, otp) => ({
  type: VERIFY_EMAIL_OTP_REQUEST,
  payload: {token, currentEmail, newEmail, otp},
});

export const deleteAccountRequest = token => ({
  type: DELETE_ACCOUNT_REQUEST,
  payload: token,
});

export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});

export const deleteAccountFailure = error => ({
  type: DELETE_ACCOUNT_FAILURE,
  payload: error,
});
