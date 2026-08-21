export const GET_CUSTOMER_REVIEWS_REQUEST = 'GET_CUSTOMER_REVIEWS_REQUEST';
export const GET_CUSTOMER_REVIEWS_SUCCESS = 'GET_CUSTOMER_REVIEWS_SUCCESS';
export const GET_CUSTOMER_REVIEWS_FAILURE = 'GET_CUSTOMER_REVIEWS_FAILURE';

export const getCustomerReviewsRequest = productId => ({
  type: GET_CUSTOMER_REVIEWS_REQUEST,
  payload: productId,
});
export const getCustomerReviewsSuccess = data => ({
  type: GET_CUSTOMER_REVIEWS_SUCCESS,
  payload: data,
});

export const getCustomerReviewsFailure = error => ({
  type: GET_CUSTOMER_REVIEWS_FAILURE,
  payload: error,
});
