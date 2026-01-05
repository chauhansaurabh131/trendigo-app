// REGISTER
export const MOBILE_REGISTER_REQUEST = 'MOBILE_REGISTER_REQUEST';
export const MOBILE_REGISTER_SUCCESS = 'MOBILE_REGISTER_SUCCESS';
export const MOBILE_REGISTER_FAILURE = 'MOBILE_REGISTER_FAILURE';

// VERIFY OTP
export const MOBILE_VERIFY_OTP_REQUEST = 'MOBILE_VERIFY_OTP_REQUEST';
export const MOBILE_VERIFY_OTP_SUCCESS = 'MOBILE_VERIFY_OTP_SUCCESS';
export const MOBILE_VERIFY_OTP_FAILURE = 'MOBILE_VERIFY_OTP_FAILURE';

// action creators
export const mobileregisterRequest = payload => ({
  type: MOBILE_REGISTER_REQUEST,
  payload,
});

export const mobileverifyOtpRequest = payload => ({
  type: MOBILE_VERIFY_OTP_REQUEST,
  payload,
});
