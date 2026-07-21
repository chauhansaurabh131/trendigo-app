// redux/types.js
export const SEARCH_PRODUCT_REQUEST = 'SEARCH_PRODUCT_REQUEST';
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS';
export const SEARCH_PRODUCT_FAILURE = 'SEARCH_PRODUCT_FAILURE';

export const SEARCH_SUGGESTION_REQUEST = 'SEARCH_SUGGESTION_REQUEST';

export const SEARCH_SUGGESTION_SUCCESS = 'SEARCH_SUGGESTION_SUCCESS';

export const SEARCH_SUGGESTION_FAILURE = 'SEARCH_SUGGESTION_FAILURE';

export const RECENT_SEARCH_REQUEST = 'RECENT_SEARCH_REQUEST';

export const searchProductRequest = query => ({
  type: SEARCH_PRODUCT_REQUEST,
  payload: query,
});

export const searchProductSuccess = data => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: data,
});

export const searchProductFailure = error => ({
  type: SEARCH_PRODUCT_FAILURE,
  payload: error,
});

export const searchSuggestionRequest = keyword => ({
  type: SEARCH_SUGGESTION_REQUEST,
  payload: keyword,
});

export const recentSearchRequest = () => ({
  type: RECENT_SEARCH_REQUEST,
});
