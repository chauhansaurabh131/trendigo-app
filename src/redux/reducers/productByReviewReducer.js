import {
  GET_PRODUCT_BY_REVIEW_REQUEST,
  GET_PRODUCT_BY_REVIEW_SUCCESS,
  GET_PRODUCT_BY_REVIEW_FAILURE,
} from '../actions/productByReviewActions';

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export default function productByReviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_REVIEW_REQUEST:
      return {...state, loading: true};

    case GET_PRODUCT_BY_REVIEW_SUCCESS:
      console.log(' Reducer received products:', action.payload);
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case GET_PRODUCT_BY_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
