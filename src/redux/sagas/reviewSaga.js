import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ADD_REVIEW_REQUEST,
  addReviewSuccess,
  addReviewFailure,
  GET_USER_REVIEWS_REQUEST,
  getUserReviewsSuccess,
  getUserReviewsFailure,
} from '../actions/reviewActions';
console.log('🟣 REVIEW SAGA FILE LOADED');

function addReviewApi(data, token) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/review/',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
function* addReviewSaga(action) {
  try {
    console.log('🟢 ADD REVIEW SAGA CALLED');
    console.log('📦 Payload:', action.payload);

    // const token = yield select(state => state.auth.token);

    // console.log('🟢 TOKEN FROM REDUX:', token);
    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log('🟢 TOKEN FROM ASYNC STORAGE IN REVIEW SAGA:', token);
    if (!token) {
      throw new Error('Token missing');
    }

    const response = yield call(addReviewApi, action.payload, token);
    console.log('✅ API RESPONSE:', response.data);

    yield put(addReviewSuccess(response.data));
  } catch (error) {
    console.log('❌ ADD REVIEW ERROR:', error);
    console.log('❌ STATUS:', error.response?.status);
    console.log('❌ BACKEND ERROR:', error.response?.data);
    yield put(addReviewFailure(error.response?.data || error.message));
  }
}

//get reviews by user id

// function getUserReviewsApi(userId, token) {
//   return axios.get(
//     `https://mntrendigo.mntech.website/api/v1/user/review/by-user/${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// }

function getUserReviewsApi(productId) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/review/by-product/${productId}`,
  );
}
function* getUserReviewsSaga(action) {
  try {
    console.log('🟢 GET USER REVIEWS SAGA CALLED');
    console.log('📦 ProductId:', action.payload);

    const response = yield call(getUserReviewsApi, action.payload);

    console.log('✅ USER REVIEWS RESPONSE:', response.data);

    yield put(getUserReviewsSuccess(response.data));
  } catch (error) {
    console.log('❌ GET USER REVIEWS ERROR:', error.response?.data);
    yield put(
      getUserReviewsFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* watchAddReview() {
  console.log('🟡 watchAddReview running');
  yield takeLatest(ADD_REVIEW_REQUEST, addReviewSaga);
  yield takeLatest(GET_USER_REVIEWS_REQUEST, getUserReviewsSaga);
}
