import {
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAILURE,
} from '../actions/storeActions';

const initialState = {
  loading: false,
  storeData: null,
  error: null,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        storeData: action.payload, // store data saved
      };

    case GET_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
