import {
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_FAILURE,
  VERIFY_CHANGE_EMAIL_OTP_REQUEST,
  VERIFY_CHANGE_EMAIL_OTP_FAILURE,
  VERIFY_CHANGE_EMAIL_OTP_SUCCESS,
  GET_ME_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  RESET_EMAIL_VERIFY_STATUS,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  VERIFY_CHANGE_MOBILE_OTP_SUCCESS,
  VERIFY_CHANGE_MOBILE_OTP_FAILURE,
  SEND_MOBILE_OTP_FAILURE,
  RESET_ACCOUNT_ERROR,
} from '../actions/userAccountActions';
import {LOGOUT} from '../actions/authActions';
const initialState = {
  loading: false,
  otpSent: false,
  emailVerified: false,
  error: null,
  message: null,

  user: null, // 🔥 ADD
  email: null, // 🔥 ADD
  isDeleted: false, // 🔥 ADD THIS
};

export default function userAccountReducer(state = initialState, action) {
  switch (action.type) {
    // ========================
    // SEND OTP
    // ========================
    case SEND_EMAIL_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        otpSent: false,
        error: null,
      };

    case SEND_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true,
        message: action.payload?.message || 'OTP sent successfully',
      };

    case SEND_EMAIL_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        otpSent: false,
        error: action.error?.response?.data?.message || 'Failed to send OTP',
      };

    // ========================
    // VERIFY OTP
    // ========================
    case VERIFY_CHANGE_EMAIL_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        emailVerified: false,
        error: null,
      };

    case VERIFY_CHANGE_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        emailVerified: true,
        message: action.payload?.message || 'Email updated successfully',
      };

    case VERIFY_CHANGE_EMAIL_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        emailVerified: false,
        // error: action.error?.response?.data?.message || 'Email already taken',
        error:
          action.error?.response?.data?.message ||
          action.error?.message ||
          'Something went wrong',
      };

    // case GET_ME_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     user: action.payload.user, // backend returns {user:{}}
    //   };

    case GET_ME_SUCCESS:
      return {
        ...state,
        user: action.payload.data, // user object
        email: action.payload.data.email, // <-- ADD THIS
      };
    case DELETE_ACCOUNT_REQUEST:
      return {...state, loading: true, isDeleted: false, error: null};

    // case DELETE_ACCOUNT_SUCCESS:
    //   return {...state, loading: false, isDeleted: true};
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...initialState,
        isDeleted: true,
      };

    case DELETE_ACCOUNT_FAILURE:
      return {...state, loading: false, error: action.payload};

    // case VERIFY_CHANGE_EMAIL_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     emailVerified: true,
    //   };

    case RESET_EMAIL_VERIFY_STATUS:
      return {
        ...state,
        emailVerified: false, // 🔥 reset
      };
    case LOGOUT:
      return initialState; // 🔥 FULL RESET
    // case SEND_MOBILE_OTP_REQUEST:
    //   return {...state, loading: true, otpSent: false};

    // case SEND_MOBILE_OTP_SUCCESS:
    //   return {...state, loading: false, otpSent: true};
    case SEND_MOBILE_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        otpSent: false,
        error: null,
      };

    case SEND_MOBILE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true,
      };

    case SEND_MOBILE_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        otpSent: false,
        error: action.payload,
      };
    case VERIFY_CHANGE_MOBILE_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // 🔥 error store
      };
    case VERIFY_CHANGE_MOBILE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'Mobile number updated successfully',
      };

    case 'RESET_MOBILE_MESSAGE':
      return {
        ...state,
        message: null,
      };
    case RESET_ACCOUNT_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
