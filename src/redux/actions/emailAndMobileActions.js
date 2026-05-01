// SEND OTP
export const UPDATE_USER_OTP_REQUEST = 'UPDATE_USER_OTP_REQUEST';
export const UPDATE_USER_OTP_SUCCESS = 'UPDATE_USER_OTP_SUCCESS';
export const UPDATE_USER_OTP_FAILURE = 'UPDATE_USER_OTP_FAILURE';

// VERIFY OTP
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const updateUserOtpRequest = data => ({
  type: UPDATE_USER_OTP_REQUEST,
  payload: data, // { email } or { mobile }
});

export const verifyOtpRequest = data => ({
  type: VERIFY_OTP_REQUEST,
  payload: data, // { otp, type }
});
