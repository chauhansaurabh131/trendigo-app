export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const getProductRequest = () => ({
  type: GET_PRODUCT_REQUEST,
});

export const getProductSuccess = data => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductFailure = error => ({
  type: GET_PRODUCT_FAILURE,
  payload: error,
});
