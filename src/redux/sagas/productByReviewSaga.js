import axios from 'axios';
import {
  GET_PRODUCT_BY_REVIEW_REQUEST,
  getProductByReviewSuccess,
  getProductByReviewFailure,
} from '../actions/productByReviewActions';
import {call, put, takeLatest} from 'redux-saga/effects';
const API_BASE = 'https://mntrendigo.mntech.website/api/v1/user';

function* getProductByReviewSaga() {
  try {
    console.log(' getProductByReviewSaga CALLED');

    const response = yield call(
      axios.get,
      `${API_BASE}/product/listProductByReview`,
    );

    console.log(' API RESPONSE..............:', response.data);

    // payload send to reducer
    yield put(getProductByReviewSuccess(response.data.results || []));

    console.log(' SUCCESS ACTION DISPATCHED');
  } catch (error) {
    console.log('API ERROR:', error);

    yield put(
      getProductByReviewFailure(error.response?.data?.message || error.message),
    );
  }
}

export default function* productByReviewRootSaga() {
  // console.log(' productByReviewRootSaga WATCHING...');
  yield takeLatest(GET_PRODUCT_BY_REVIEW_REQUEST, getProductByReviewSaga);
}
