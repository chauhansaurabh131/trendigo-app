import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_EMAIL_OTP_REQUEST,
  VERIFY_EMAIL_OTP_SUCCESS,
  VERIFY_EMAIL_OTP_FAILURE,
  RESET_AUTH_FLOW,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  LOAD_TOKEN_FROM_STORAGE,
  LOGOUT,
  // VERIFY_EMAIL_OTP_SUCCESS,
} from '../actions/authActions';

const initialState = {
  loginType: null, // 👈 ADD THIS
  loading: false,
  otpSent: false,
  token: null,
  error: null,
  user: null, // 👈 ADD user object
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
    case VERIFY_EMAIL_OTP_REQUEST:
      return {...state, loading: true, error: null};

    case REGISTER_SUCCESS:
      return {...state, loading: false, otpSent: true};

    // case VERIFY_EMAIL_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     token: action.payload,
    //     // user: action.payload.user, // 👈 save user object
    //   };
    // case VERIFY_EMAIL_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     token: action.payload.tokens.access.token,
    //     user: action.payload.user,
    //   };

    case REGISTER_FAILURE:
    case VERIFY_EMAIL_OTP_FAILURE:
      return {...state, loading: false, error: action.payload};
    case RESET_AUTH_FLOW:
      return {
        ...state,
        otpSent: false,
        token: null,
        error: null,
        user: null, // 👈 reset user as well
      };
    case RESEND_OTP_REQUEST:
      return {...state, loading: true, error: null};

    // case RESEND_OTP_SUCCESS:
    //   return {...state, loading: false, otpSent: true};

    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSent: true,
        token: action.payload.token || state.token,
        message: action.payload.message,
        // user: action.payload.user || state.user, // 👈 update user if sent
      };

    case RESEND_OTP_FAILURE:
      return {...state, loading: false, error: action.payload};

    case LOAD_TOKEN_FROM_STORAGE:
      return {
        ...state,
        token: action.payload, // 👈 restore token here
      };

    // case VERIFY_EMAIL_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     token: action.payload.tokens.access.token,
    //     user: action.payload.user,
    //   };
    case VERIFY_EMAIL_OTP_SUCCESS:
      console.log('REDUCER PAYLOAD:', action.payload);
      return {
        ...state,
        loading: false,
        token: action.payload.tokens.access.token,
        user: action.payload.user,
        error: null,
      };
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        token: action.payload,
      };

    case 'SET_LOGIN_TYPE':
      return {
        ...state,
        loginType: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState, // 🔥 everything reset
      };

    default:
      return state;
  }
}
