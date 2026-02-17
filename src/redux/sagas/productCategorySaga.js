import axios from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  PRODUCT_CATEGORY_REQUEST,
  productCategorySuccess,
  productCategoryFailure,
} from '../actions/productCategoryActions';

/* ===============================
   🔹 API FUNCTION (same file)
================================ */
const getProductByCategoryApi = (category, page, ProductType) => {
  return axios.get(
    // `https://mntrendigo.mntech.website/api/v1/user/product/by-product-category/${category}?page=${page}`,
    `https://mntrendigo.mntech.website/api/v1/user/product/by-product-category/Topwear?page=1`,
  );
};

/* ===============================
   🔹 SAGA FUNCTION
================================ */
function* productCategorySaga(action) {
  try {
    const {category, page, productType} = action.payload;

    console.log('CATEGORY:', category);
    console.log('PAGE:', page);
    console.log('product type', productType);

    // API call
    const response = yield call(
      getProductByCategoryApi,
      category,
      page,
      productType,
    );
    // console.log(' FULL RESPONSE:', response);
    console.log(' API DATA:', response.data.data);
    // Success
    yield put(productCategorySuccess(response.data));
  } catch (error) {
    console.log('error..', error);
    // Failure
    yield put(productCategoryFailure(error.message));
  }
}

/* ===============================
   🔹 WATCHER SAGA
================================ */
export function* watchProductCategory() {
  yield takeLatest(PRODUCT_CATEGORY_REQUEST, productCategorySaga);
}
