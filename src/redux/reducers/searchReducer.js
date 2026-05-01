// redux/reducers/productReducer.js

import {
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
} from '../actions/searchActions';

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.results.results, // 🔥 correct path
      };

    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
