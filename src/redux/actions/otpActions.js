// 🔹 SEND OTP
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';

// 🔹 VERIFY OTP
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

// ✅ Action Creators
export const RESET_OTP_STATE = 'RESET_OTP_STATE';
export const sendOtpRequest = data => ({
  type: SEND_OTP_REQUEST,
  payload: {data},
});

export const verifyOtpRequest = data => ({
  type: VERIFY_OTP_REQUEST,
  payload: {data},
});
