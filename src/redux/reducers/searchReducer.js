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
  currentPage: 1,
  totalPages: 1,
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
      const responseData = action.payload.results;

      return {
        ...state,
        loading: false,
        currentPage: responseData.page,
        totalPages: responseData.totalPages,
        products:
          responseData.page === 1
            ? responseData.results
            : [...state.products, ...responseData.results],
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
