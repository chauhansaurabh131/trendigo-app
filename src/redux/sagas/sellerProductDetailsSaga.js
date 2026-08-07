import axios from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
  GET_PRODUCT_DETAILS_REQUEST,
  getProductDetailsSuccess,
  getProductDetailsFailure,
} from '../actions/sellerProductDetailsActions';

function* getProductDetailsSaga(action) {
  try {
    const productId = action.payload;

    const response = yield call(
      axios.get,
      `https://mntrendigo.mntech.website/api/v1/user/product/details/${productId}`,
    );

    console.log('PRODUCT DETAILS RESPONSE =>', response.data);

    yield put(getProductDetailsSuccess(response.data));
  } catch (error) {
    console.log(
      'PRODUCT DETAILS ERROR =>',
      error.response?.data || error.message,
    );

    yield put(
      getProductDetailsFailure(error.response?.data?.message || error.message),
    );
  }
}

export default function* sellerProductDetailsSaga() {
  yield takeLatest(GET_PRODUCT_DETAILS_REQUEST, getProductDetailsSaga);
}
