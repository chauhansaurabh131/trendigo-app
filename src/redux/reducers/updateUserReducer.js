import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  RESET_UPDATE_USER,
} from '../actions/updateUserActions';

const initialState = {
  loading: false,
  userData: null,
  error: null,
};

export default function updateuserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {...state, loading: true, error: null};
    case UPDATE_USER_SUCCESS:
      return {...state, loading: false, userData: action.payload, error: null};
    case UPDATE_USER_FAILURE:
      return {...state, loading: false, error: action.payload};

    case RESET_UPDATE_USER:
      return initialState;

    default:
      return state;
  }
}
