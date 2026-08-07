export const SELLER_LOGIN_REQUEST = 'SELLER_LOGIN_REQUEST';
export const SELLER_LOGIN_SUCCESS = 'SELLER_LOGIN_SUCCESS';
export const SELLER_LOGIN_FAILURE = 'SELLER_LOGIN_FAILURE';

export const SELLER_LOGIN_RESET = 'SELLER_LOGIN_RESET';

export const SELLER_FORGOT_PASSWORD_REQUEST = 'SELLER_FORGOT_PASSWORD_REQUEST';

export const SELLER_FORGOT_PASSWORD_SUCCESS = 'SELLER_FORGOT_PASSWORD_SUCCESS';

export const SELLER_FORGOT_PASSWORD_FAILURE = 'SELLER_FORGOT_PASSWORD_FAILURE';

export const SELLER_VERIFY_RESET_OTP_REQUEST =
  'SELLER_VERIFY_RESET_OTP_REQUEST';

export const SELLER_VERIFY_RESET_OTP_SUCCESS =
  'SELLER_VERIFY_RESET_OTP_SUCCESS';

export const SELLER_VERIFY_RESET_OTP_FAILURE =
  'SELLER_VERIFY_RESET_OTP_FAILURE';

export const SELLER_RESET_PASSWORD_REQUEST = 'SELLER_RESET_PASSWORD_REQUEST';

export const SELLER_RESET_PASSWORD_SUCCESS = 'SELLER_RESET_PASSWORD_SUCCESS';

export const SELLER_RESET_PASSWORD_FAILURE = 'SELLER_RESET_PASSWORD_FAILURE';

export const LOGOUT = 'LOGOUT';

export const sellerLoginRequest = payload => ({
  type: SELLER_LOGIN_REQUEST,
  payload,
});

export const sellerLoginSuccess = payload => ({
  type: SELLER_LOGIN_SUCCESS,
  payload,
});

export const sellerLoginFailure = payload => ({
  type: SELLER_LOGIN_FAILURE,
  payload,
});

export const sellerLoginReset = () => ({
  type: SELLER_LOGIN_RESET,
});

export const sellerForgotPasswordRequest = payload => ({
  type: SELLER_FORGOT_PASSWORD_REQUEST,
  payload,
});

export const sellerForgotPasswordSuccess = payload => ({
  type: SELLER_FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const sellerForgotPasswordFailure = error => ({
  type: SELLER_FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const sellerVerifyResetOtpRequest = payload => ({
  type: SELLER_VERIFY_RESET_OTP_REQUEST,
  payload,
});

export const sellerVerifyResetOtpSuccess = payload => ({
  type: SELLER_VERIFY_RESET_OTP_SUCCESS,
  payload,
});

export const sellerVerifyResetOtpFailure = error => ({
  type: SELLER_VERIFY_RESET_OTP_FAILURE,
  payload: error,
});

export const sellerResetPasswordRequest = payload => ({
  type: SELLER_RESET_PASSWORD_REQUEST,
  payload,
});

export const sellerResetPasswordSuccess = payload => ({
  type: SELLER_RESET_PASSWORD_SUCCESS,
  payload,
});

export const sellerResetPasswordFailure = payload => ({
  type: SELLER_RESET_PASSWORD_FAILURE,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
