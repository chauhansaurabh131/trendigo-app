export const GET_STORE_PRODUCTS_REQUEST = 'GET_STORE_PRODUCTS_REQUEST';
export const GET_STORE_PRODUCTS_SUCCESS = 'GET_STORE_PRODUCTS_SUCCESS';
export const GET_STORE_PRODUCTS_FAILURE = 'GET_STORE_PRODUCTS_FAILURE';

export const getStoreProductsRequest = storeId => {
  return {
    type: GET_STORE_PRODUCTS_REQUEST,
    payload: storeId,
  };
};
