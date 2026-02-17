import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {...state, loading: true};

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
