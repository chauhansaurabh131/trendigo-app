import {
  GET_PRODUCT_VARIANT_REQUEST,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_FAILURE,
} from '../actions/productVariantActions';

const initialState = {
  loading: false,
  variants: [],
  error: null,
};

export default function productVariantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_VARIANT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        variants: action.payload,
      };

    case GET_PRODUCT_VARIANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
