// import {call, put, takeLatest} from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   GET_PRODUCT_BY_REVIEW_REQUEST,
//   getProductByReviewSuccess,
//   getProductByReviewFailure,
// } from '../actions/productByReviewActions';

// const API_BASE = 'https://mntrendigo.mntech.website/api/v1/user';

// function* getProductByReviewSaga() {
//   console.log('🚀 getProductByReviewSaga CALLED');

//   try {
//     console.log('🌐 API URL 👉', `${API_BASE}/product/listProductByReview`);

//     const response = yield call(
//       axios.get,
//       `${API_BASE}/product/listProductByReview`,
//     );

//     console.log('✅ API RESPONSE STATUS 👉', response.status);
//     console.log(
//       '📦 API RESPONSE DATA 👉',
//       JSON.stringify(response.data, null, 2),
//     );

//     const products = response.data?.data || [];

//     console.log('🧾 FINAL PRODUCTS ARRAY 👉', products);

//     yield put(getProductByReviewSuccess(products));
//     console.log('🎯 SUCCESS ACTION DISPATCHED');
//   } catch (error) {
//     console.log('❌ ERROR IN getProductByReviewSaga');

//     console.log('STATUS 👉', error.response?.status);
//     console.log('MESSAGE 👉', error.response?.data || error.message);

//     yield put(
//       getProductByReviewFailure(error.response?.data?.message || error.message),
//     );

//     console.log('🚨 FAILURE ACTION DISPATCHED');
//   }
// }

// export default function* productByReviewRootSaga() {
//   console.log('👂 productByReviewRootSaga WATCHING...');
//   yield takeLatest(GET_PRODUCT_BY_REVIEW_REQUEST, getProductByReviewSaga);
// }import { call, put, takeLatest } from 'redux-saga/effects';
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
    console.log('🚀 getProductByReviewSaga CALLED');

    // ✅ GET request without token
    const response = yield call(
      axios.get,
      `${API_BASE}/product/listProductByReview`,
    );

    console.log('📦 API RESPONSE..............:', response.data);

    // payload send to reducer
    yield put(getProductByReviewSuccess(response.data.results || []));
    console.log('🎯 SUCCESS ACTION DISPATCHED');
  } catch (error) {
    console.log('❌ API ERROR:', error);
    yield put(
      getProductByReviewFailure(error.response?.data?.message || error.message),
    );
  }
}

export default function* productByReviewRootSaga() {
  console.log('👂 productByReviewRootSaga WATCHING...');
  yield takeLatest(GET_PRODUCT_BY_REVIEW_REQUEST, getProductByReviewSaga);
}
