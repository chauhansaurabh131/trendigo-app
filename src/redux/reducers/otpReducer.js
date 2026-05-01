import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../actions/otpActions';

const initialState = {
  loading: false,
  otpSent: false,
  otpVerified: false,
  error: null,
};

export default function otpReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_OTP_REQUEST:
    case VERIFY_OTP_REQUEST:
      return {...state, loading: true, error: null};

    case SEND_OTP_SUCCESS:
      return {...state, loading: false, otpSent: true};

    case VERIFY_OTP_SUCCESS:
      return {...state, loading: false, otpVerified: true, error: null};

    case SEND_OTP_FAILURE:
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        // error: action.payload
        error: action.payload?.message || action.payload,
      };

    case 'RESET_OTP_STATE': // ✅ ADD THIS
      return {
        ...state,
        otpSent: false,
        otpVerified: false,
        error: null,
      };
    default:
      return state;
  }
}
