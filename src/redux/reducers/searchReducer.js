// redux/reducers/productReducer.js

import {
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_SUGGESTION_SUCCESS,
} from '../actions/searchActions';

const initialState = {
  loading: false,
  products: [],
  suggestions: [],
  recentSearches: [],
  error: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        products: [], // clear old products
      };

    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        // products: action.payload.results.results, // 🔥 correct path
        products:
          action.payload?.results?.results ||
          action.payload?.results ||
          action.payload?.data ||
          [],
      };

    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEARCH_SUGGESTION_SUCCESS:
      return {
        ...state,
        suggestions: action.payload.results || [],
      };

    case 'RECENT_SEARCH_SUCCESS':
      return {
        ...state,
        recentSearches: action.payload,
      };
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}
