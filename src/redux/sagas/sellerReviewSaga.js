import axios from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_CUSTOMER_REVIEWS_REQUEST,
  getCustomerReviewsFailure,
  getCustomerReviewsSuccess,
} from '../actions/sellerReviewAction';

function getSellerReviewsApi(productId) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/review/by-product/${productId}`,
  );
}

function* getSellerReviewsSaga(action) {
  try {
    console.log(' GET SELLER REVIEWS SAGA CALLED');
    console.log(' PRODUCTID===>:', action.payload);

    const response = yield call(getSellerReviewsApi, action.payload);

    console.log('FULL RESPONSE =>', JSON.stringify(response.data, null, 2));
    console.log('REVIEWS ARRAY =>', response.data?.reviews);
    yield put(getCustomerReviewsSuccess(response.data));
  } catch (error) {
    console.log('  GET SELLER  REVIEWS ERROR:', error.response?.data);
    yield put(
      getCustomerReviewsFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* sellerReviewSaga() {
  yield takeLatest(GET_CUSTOMER_REVIEWS_REQUEST, getSellerReviewsSaga);
}
