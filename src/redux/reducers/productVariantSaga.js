import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCT_VARIANT_REQUEST,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_FAILURE,
} from '../actions/productVariantActions';

function fetchVariantApi(productId) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/productVarientByProductId/by-productid-user/${productId}`,
  );
}

function* getProductVariantSaga(action) {
  try {
    const response = yield call(fetchVariantApi, action.productId);

    yield put({
      type: GET_PRODUCT_VARIANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_VARIANT_FAILURE,
      payload: error.message,
    });
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_PRODUCT_VARIANT_REQUEST, getProductVariantSaga);
}
