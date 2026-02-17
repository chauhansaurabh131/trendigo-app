export const GET_PRODUCT_BY_REVIEW_REQUEST = 'GET_PRODUCT_BY_REVIEW_REQUEST';
export const GET_PRODUCT_BY_REVIEW_SUCCESS = 'GET_PRODUCT_BY_REVIEW_SUCCESS';
export const GET_PRODUCT_BY_REVIEW_FAILURE = 'GET_PRODUCT_BY_REVIEW_FAILURE';

export const getProductByReviewRequest = () => ({
  type: GET_PRODUCT_BY_REVIEW_REQUEST,
});

export const getProductByReviewSuccess = data => ({
  type: GET_PRODUCT_BY_REVIEW_SUCCESS,
  payload: data,
});

export const getProductByReviewFailure = error => ({
  type: GET_PRODUCT_BY_REVIEW_FAILURE,
  payload: error,
});
