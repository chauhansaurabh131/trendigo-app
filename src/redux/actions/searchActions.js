// redux/types.js
export const SEARCH_PRODUCT_REQUEST = 'SEARCH_PRODUCT_REQUEST';
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS';
export const SEARCH_PRODUCT_FAILURE = 'SEARCH_PRODUCT_FAILURE';
// redux/actions/productActions.js

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
