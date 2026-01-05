// import {
//   GET_ME_REQUEST,
//   GET_ME_SUCCESS,
//   GET_ME_FAILURE,
//   DELETE_ACCOUNT_REQUEST,
//   DELETE_ACCOUNT_SUCCESS,
//   DELETE_ACCOUNT_FAILURE,
//   SEND_EMAIL_OTP_REQUEST,
//   SEND_EMAIL_OTP_SUCCESS,
//   SEND_EMAIL_OTP_FAILURE,
//   VERIFY_EMAIL_OTP_REQUEST,
//   VERIFY_EMAIL_OTP_SUCCESS,
//   VERIFY_EMAIL_OTP_FAILURE,
//   RESET_EMAIL_UPDATE_FLAG,
// } from '../actions/userAccountActions';

// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
// };

// export default function userAccountReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_ME_REQUEST:
//       return {...state, loading: true, error: null};

//     case GET_ME_SUCCESS:
//       return {loading: false, data: action.payload.data.user, error: null};

//     case GET_ME_FAILURE:
//       return {loading: false, data: null, error: action.error};

//     case DELETE_ACCOUNT_REQUEST:
//       return {...state, loading: true, error: null};

//     case DELETE_ACCOUNT_SUCCESS:
//       return {loading: false, data: null, error: null}; // account deleted
//     case DELETE_ACCOUNT_FAILURE:
//       return {loading: false, data: null, error: action.error};

//     case SEND_EMAIL_OTP_REQUEST:
//       return {...state, loading: true, error: null};

//     case SEND_EMAIL_OTP_SUCCESS:
//       return {...state, loading: false, otpSent: true};

//     case SEND_EMAIL_OTP_FAILURE:
//       return {...state, loading: false, otpSent: false, error: action.error};

//     case VERIFY_EMAIL_OTP_REQUEST:
//       return {...state, loading: true, error: null};

//     case VERIFY_EMAIL_OTP_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         emailUpdated: true,
//         //  data: action.payload,
//       };

//     case VERIFY_EMAIL_OTP_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         emailUpdated: false,
//         error: action.error,
//       };

//     case RESET_EMAIL_UPDATE_FLAG:
//       return {
//         ...state,
//         emailUpdated: false,
//       };

//     default:
//       return state;
//   }
// }

import {
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_FAILURE,
  // VERIFY_EMAIL_OTP_REQUEST,
  // VERIFY_EMAIL_OTP_SUCCESS,
  // VERIFY_EMAIL_OTP_FAILURE,
  VERIFY_CHANGE_EMAIL_OTP_REQUEST,
  VERIFY_CHANGE_EMAIL_OTP_FAILURE,
  VERIFY_CHANGE_EMAIL_OTP_SUCCESS,
  GET_ME_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  RESET_EMAIL_VERIFY_STATUS,
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
        error: action.error?.response?.data?.message || 'Email already taken',
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

    default:
      return state;
  }
}
