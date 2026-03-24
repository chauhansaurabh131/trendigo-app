import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCT_VARIANT_REQUEST,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_FAILURE,
} from '../actions/productVariantActions';

function fetchVariantApi(productId, token) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/productVarientByProductId/by-productid-user/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

function* getProductVariantSaga(action) {
  try {
    console.log('SAGA CALLED PRODUCT ID:', action.productId);

    const response = yield call(
      fetchVariantApi,
      action.productId,
      action.token,
    );

    console.log('VARIANT API RESPONSE:', response.data);

    yield put({
      type: GET_PRODUCT_VARIANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log('VARIANT API ERROR:', error);

    yield put({
      type: GET_PRODUCT_VARIANT_FAILURE,
      payload: error.message,
    });
  }
}

export default function* productVariantSaga() {
  yield takeLatest(GET_PRODUCT_VARIANT_REQUEST, getProductVariantSaga);
}
