//PRODUCTDETAILSACTIONS
export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST';
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS';
export const PRODUCT_DETAILS_FAILURE = 'PRODUCT_DETAILS_FAILURE';

export const productDetailsRequest = productId => ({
  type: PRODUCT_DETAILS_REQUEST,
  payload: productId,
});

export const productDetailsSuccess = data => ({
  type: PRODUCT_DETAILS_SUCCESS,
  payload: data,
});

export const productDetailsFailure = error => ({
  type: PRODUCT_DETAILS_FAILURE,
  payload: error,
});
