export const GET_PRODUCT_DETAILS_REQUEST = 'GET_PRODUCT_DETAILS_REQUEST';

export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';

export const GET_PRODUCT_DETAILS_FAILURE = 'GET_PRODUCT_DETAILS_FAILURE';

export const getProductDetailsRequest = productId => ({
  type: GET_PRODUCT_DETAILS_REQUEST,
  payload: productId,
});

export const getProductDetailsSuccess = data => ({
  type: GET_PRODUCT_DETAILS_SUCCESS,
  payload: data,
});

export const getProductDetailsFailure = error => ({
  type: GET_PRODUCT_DETAILS_FAILURE,
  payload: error,
});
