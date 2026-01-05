const initialState = {
  loading: false,
  user: null,
  error: null,
  otpVerified: false,
};

export const authMobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOBILE_REGISTER_REQUEST':
    case 'MOBILE_VERIFY_OTP_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'MOBILE_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case 'MOBILE_VERIFY_OTP_SUCCESS':
      return {
        ...state,
        loading: false,
        otpVerified: true,
      };

    case 'MOBILE_REGISTER_FAILURE':
    case 'MOBILE_VERIFY_OTP_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
