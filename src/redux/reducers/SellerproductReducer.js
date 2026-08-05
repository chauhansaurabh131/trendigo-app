import {
  GET_SELLER_PRODUCTS_REQUEST,
  GET_SELLER_PRODUCTS_FAILURE,
  GET_SELLER_PRODUCTS_SUCCESS,
} from '../actions/sellerProductActions';

const initialState = {
  sellerLoading: false,
  sellerProducts: [],
  error: null,
};

export default function sellerProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SELLER_PRODUCTS_REQUEST:
      return {
        ...state,
        sellerLoading: true,
      };

    case GET_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        sellerLoading: false,
        sellerProducts: action.payload,
      };

    case GET_SELLER_PRODUCTS_FAILURE:
      return {
        ...state,
        sellerLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
