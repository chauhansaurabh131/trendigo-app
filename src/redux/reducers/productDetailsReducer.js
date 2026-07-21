import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from '../actions/productDetailsAction';
const initialState = {
  loading: false,
  product: null,
  error: null,
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case PRODUCT_DETAILS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        product: null,
        error: null,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        // product: action.payload.results,
        product: action.payload,
        error: null,
      };

    case PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        product: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
