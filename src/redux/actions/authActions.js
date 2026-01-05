export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const VERIFY_EMAIL_OTP_REQUEST = 'VERIFY_EMAIL_OTP_REQUEST';
export const VERIFY_EMAIL_OTP_SUCCESS = 'VERIFY_EMAIL_OTP_SUCCESS';
export const VERIFY_EMAIL_OTP_FAILURE = 'VERIFY_EMAIL_OTP_FAILURE';

export const RESEND_OTP_REQUEST = 'RESEND_OTP_REQUEST';
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS';
export const RESEND_OTP_FAILURE = 'RESEND_OTP_FAILURE';

export const LOGOUT = 'LOGOUT';

export const logout = () => ({
  type: LOGOUT,
});

// export const resendOtpRequest = email => ({
//   type: RESEND_OTP_REQUEST,
//   payload: {email},
// });
export const resendOtpRequest = payload => ({
  type: RESEND_OTP_REQUEST,
  payload,
  // payload = { email } OR { mobileNumber, countryCodeId }
});

export const resendOtpSuccess = message => ({
  type: RESEND_OTP_SUCCESS,
  payload: message,
});

export const resendOtpFailure = error => ({
  type: RESEND_OTP_FAILURE,
  payload: error,
});
export const RESET_AUTH_FLOW = 'RESET_AUTH_FLOW';

export const resetAuthFlow = () => ({
  type: RESET_AUTH_FLOW,
});

// Register
// export const registerRequest = email => ({
//   type: REGISTER_REQUEST,
//   payload: {email},
// });
export const registerRequest = payload => ({
  type: REGISTER_REQUEST,
  payload,
  // payload = { email } OR { mobileNumber, countryCodeId }
});

export const registerSuccess = message => ({
  type: REGISTER_SUCCESS,
  payload: message,
});

export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// Verify OTP
export const verifyEmailOtpRequest = payload => ({
  type: VERIFY_EMAIL_OTP_REQUEST,
  payload,
  // payload = { email, otp } OR { mobileNumber, otp }
});

export const verifyEmailOtpSuccess = token => ({
  type: VERIFY_EMAIL_OTP_SUCCESS,
  payload: token,
});

export const verifyEmailOtpFailure = error => ({
  type: VERIFY_EMAIL_OTP_FAILURE,
  payload: error,
});
export const LOAD_TOKEN_FROM_STORAGE = 'LOAD_TOKEN_FROM_STORAGE';

export const loadTokenFromStorage = token => ({
  type: LOAD_TOKEN_FROM_STORAGE,
  payload: token,
});
