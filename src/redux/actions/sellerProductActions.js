export const GET_SELLER_PRODUCTS_REQUEST = 'GET_SELLER_PRODUCTS_REQUEST';

export const GET_SELLER_PRODUCTS_SUCCESS = 'GET_SELLER_PRODUCTS_SUCCESS';

export const GET_SELLER_PRODUCTS_FAILURE = 'GET_SELLER_PRODUCTS_FAILURE';
export const getSellerProductsRequest = sellerId => ({
  type: GET_SELLER_PRODUCTS_REQUEST,
  payload: sellerId,
});

export const getSellerProductsSuccess = data => ({
  type: GET_SELLER_PRODUCTS_SUCCESS,
  payload: data,
});

export const getSellerProductsFailure = error => ({
  type: GET_SELLER_PRODUCTS_FAILURE,
  payload: error,
});
