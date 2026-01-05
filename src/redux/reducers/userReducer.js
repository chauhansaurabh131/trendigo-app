import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER_DATA,
} from '../actions/userActions';
import {LOGOUT} from '../actions/authActions';
const initialState = {
  loading: false,
  user: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {...state, loading: true, error: null};

    case FETCH_USER_SUCCESS:
      return {...state, loading: false, user: action.payload};

    case FETCH_USER_FAILURE:
      return {...state, loading: false, error: action.payload};

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return initialState; // 🔥 THIS IS REQUIRED
    default:
      return state;
  }
}
