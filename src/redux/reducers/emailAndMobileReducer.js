import {
  UPDATE_USER_OTP_REQUEST,
  UPDATE_USER_OTP_SUCCESS,
  UPDATE_USER_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../actions/emailAndMobileActions';

const initialState = {
  loading: false,
  otpSent: false,
  verified: false,
  error: null,
};

export default function emailAndMobile(state = initialState, action) {
  switch (action.type) {
    // 🔹 SEND OTP
    case UPDATE_USER_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_USER_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true, // ✅ OTP sent
      };

    case UPDATE_USER_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // 🔹 VERIFY OTP
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        verified: true, // ✅ verified
      };

    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
