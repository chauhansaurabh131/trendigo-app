import {
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
} from '../actions/sellerProductDetailsActions';

const initialState = {
  sellerProductDetailsLoading: false,
  productDetails: null,
  error: null,
};

export default function sellerProductDetailsReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        sellerProductDetailsLoading: true,
        error: null,
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        sellerProductDetailsLoading: false,
        productDetails: action.payload,
      };

    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        sellerProductDetailsLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
