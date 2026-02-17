export const PRODUCT_CATEGORY_REQUEST = 'PRODUCT_CATEGORY_REQUEST';
export const PRODUCT_CATEGORY_SUCCESS = 'PRODUCT_CATEGORY_SUCCESS';
export const PRODUCT_CATEGORY_FAILURE = 'PRODUCT_CATEGORY_FAILURE';

export const productCategoryRequest = (category, page = 1) => ({
  type: PRODUCT_CATEGORY_REQUEST,
  payload: {category, page},
});

export const productCategorySuccess = data => ({
  type: PRODUCT_CATEGORY_SUCCESS,
  payload: data,
});

export const productCategoryFailure = error => ({
  type: PRODUCT_CATEGORY_FAILURE,
  payload: error,
});
