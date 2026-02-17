import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  WISHLIST_REQUEST,
  wishlistSuccess,
  wishlistFailure,
  GET_WISHLIST_REQUEST,
  getWishlistSuccess,
  getWishlistFailure,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_REQUEST,
  removeWishlistSuccess,
  removeWishlistFailure,
} from '../actions/wishlistActions';

/* =========================
   API FUNCTION (same file)
========================= */
const wishlistApi = (productId, token) => {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/userWishlist/',
    {productId},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

/* =========================
   WORKER SAGA
========================= */
function* wishlistWorker(action) {
  try {
    console.log('WISHLIST SAGA CALLED');
    console.log(' Product ID:', action.payload.productId);

    // 1️⃣ Get token
    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log('Token:', token);

    if (!token) {
      throw new Error('Token missing');
    }

    // 2️⃣ API call
    const response = yield call(wishlistApi, action.payload.productId, token);

    console.log('add Wishlist Success123:', response.data);

    // 3️⃣ Dispatch success
    yield put(wishlistSuccess(response.data));
  } catch (error) {
    console.log(' Wishlist Error:', error?.response?.data || error.message);

    // 4️⃣ Dispatch failure
    yield put(wishlistFailure(error?.response?.data || error.message));
  }
}

/* ===========================
   API FUNCTION (SAME FILE)
=========================== */
const getWishlistApi = token => {
  return axios.get(
    'https://mntrendigo.mntech.website/api/v1/user/userWishlist/userWishlist',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

/* ===========================
   WORKER SAGA
=========================== */

function* getWishlistWorker() {
  try {
    console.log('📥 GET WISHLIST SAGA CALLED');

    const token = yield call(AsyncStorage.getItem, 'authToken');

    if (!token) {
      throw new Error('Token missing');
    }

    const response = yield call(getWishlistApi, token);

    console.log('✅ Wishlist list...:', response.data.data);

    yield put({
      type: GET_WISHLIST_SUCCESS,
      payload: response.data.data, // ✅ ARRAY ONLY
    });
  } catch (error) {
    console.log(' Wishlist error:', error.message);
    yield put(getWishlistFailure(error.message));
  }
}
// 🔹 API CALL (same file)
const removeWishlistApi = (token, wishlistId) => {
  return axios.delete(
    `https://mntrendigo.mntech.website/api/v1/user/userWishlist/${wishlistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
function* removeWishlistSaga(action) {
  try {
    console.log(' REMOVE_WISHLIST_SAGA STARTED');

    console.log(' Action received ', action);
    console.log(' Wishlist ID ', action.payload);

    const token = yield AsyncStorage.getItem('authToken');
    console.log('Token from AsyncStorage ', token);

    if (!token) {
      console.log(' Token missing');
      return;
    }

    console.log('🌐 Calling DELETE wishlist API...');
    yield call(removeWishlistApi, token, action.payload);

    console.log('✅ Wishlist removed successfully in saga');

    // success → reducer ko id bhejo
    yield put(removeWishlistSuccess(action.payload));
    console.log('📤 REMOVE_WISHLIST_SUCCESS dispatched');
  } catch (error) {
    console.log('Error in removeWishlistSaga 👉', error);
    console.log('Error response 👉', error?.response);

    yield put(removeWishlistFailure(error?.response?.data || error.message));
  }
}

/* =========================
   WATCHER SAGA
========================= */
export default function* wishlistSaga() {
  yield takeLatest(WISHLIST_REQUEST, wishlistWorker);
  yield takeLatest(GET_WISHLIST_REQUEST, getWishlistWorker);
  yield takeLatest(REMOVE_WISHLIST_REQUEST, removeWishlistSaga);
}
