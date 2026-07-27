import axios from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  PRODUCT_CATEGORY_REQUEST,
  productCategorySuccess,
  productCategoryFailure,
} from '../actions/productCategoryActions';
import api from '../../api/apiClient';

const getProductByCategoryApi = (category, page) => {
  return api.get(`user/product/by-product-category/${category}?page=${page}`);
};
function* productCategorySaga(action) {
  try {
    const {category, page} = action.payload;

    console.log('CATEGORY====>:', category);
    console.log('PAGE=====>:', page);

    // API call
    const response = yield call(getProductByCategoryApi, category, page);
    // console.log(' FULL RESPONSE:', response);
    console.log(' STATUS:', response.status);

    // console.log('PRODUCT CATEGORY RESPONSE', response);
    console.log('PRODUCT CATEGORY RES...', response.data);
    console.log(' PRODUCT CATEGORY  API DATA:', response.data.data);

    // Success
    yield put(productCategorySuccess(response.data));
  } catch (error) {
    console.log('PRODUCT CATEGORY ERROR..', error);
    // Failure
    yield put(productCategoryFailure(error.message));
  }
}

export function* watchProductCategory() {
  yield takeLatest(PRODUCT_CATEGORY_REQUEST, productCategorySaga);
}
