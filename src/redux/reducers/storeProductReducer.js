import {
  GET_STORE_PRODUCTS_REQUEST,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_FAILURE,
} from '../actions/storeProductActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const storeProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STORE_PRODUCTS_REQUEST:
      return {...state, loading: true};

    case GET_STORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case GET_STORE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default storeProductReducer;
