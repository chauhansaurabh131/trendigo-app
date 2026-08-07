import {
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAILURE,
  SELLER_FORGOT_PASSWORD_REQUEST,
  SELLER_FORGOT_PASSWORD_SUCCESS,
  SELLER_FORGOT_PASSWORD_FAILURE,
  SELLER_VERIFY_RESET_OTP_FAILURE,
  SELLER_VERIFY_RESET_OTP_REQUEST,
  SELLER_VERIFY_RESET_OTP_SUCCESS,
  SELLER_RESET_PASSWORD_FAILURE,
  SELLER_RESET_PASSWORD_REQUEST,
  SELLER_RESET_PASSWORD_SUCCESS,
  LOGOUT,
} from '../actions/sellerAuthActions';
const initialState = {
  loading: false,
  sellerData: null,
  error: null,
  forgotPasswordLoading: false,
  forgotPasswordData: null,
  forgotPasswordError: null,
  verifyResetOtpLoading: false,
  verifyResetOtpData: null,
  verifyResetOtpError: null,
  resetPasswordLoading: false,
  resetPasswordData: null,
  resetPasswordError: null,
};

export default function sellerAuthReducer(state = initialState, action) {
  switch (action.type) {
    case SELLER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SELLER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        sellerData: action.payload,
      };

    case SELLER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SELLER_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordError: null,
      };

    case SELLER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordData: action.payload,
      };

    case SELLER_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload,
      };
    case SELLER_VERIFY_RESET_OTP_REQUEST:
      return {
        ...state,
        verifyResetOtpLoading: true,
        verifyResetOtpError: null,
      };

    case SELLER_VERIFY_RESET_OTP_SUCCESS:
      return {
        ...state,
        verifyResetOtpLoading: false,
        verifyResetOtpData: action.payload,
      };

    case SELLER_VERIFY_RESET_OTP_FAILURE:
      return {
        ...state,
        verifyResetOtpLoading: false,
        verifyResetOtpError: action.payload,
      };
    case SELLER_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordLoading: true,
        resetPasswordError: null,
      };

    case SELLER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordData: action.payload,
      };

    case SELLER_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
