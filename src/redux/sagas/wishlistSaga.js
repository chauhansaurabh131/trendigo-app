import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../../api/apiClient';
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
  getWishlistRequest,
} from '../actions/wishlistActions';

const wishlistApi = productId => {
  return api.post('/user/userWishlist/', {productId});
};

/* =========================
   WORKER SAGA
========================= */
function* wishlistWorker(action) {
  try {
    console.log('WISHLIST SAGA CALLED');
    console.log(' Product ID:', action.payload.productId);

    const response = yield call(wishlistApi, action.payload.productId);

    console.log('add Wishlist Success123:', response.data);
    console.log('Wishlist added successfully in saga', response),
      yield put(wishlistSuccess(response.data));

    // yield put({type: GET_WISHLIST_REQUEST});
    yield put(getWishlistRequest());
  } catch (error) {
    console.log(' Wishlist Error:', error?.response?.data || error.message);

    yield put(wishlistFailure(error?.response?.data || error.message));
  }
}

const getWishlistApi = () => {
  return api.get('/user/userWishlist/userWishlist');
};

function* getWishlistWorker() {
  try {
    console.log('📥 GET WISHLIST SAGA CALLED');

    // const token = yield call(AsyncStorage.getItem, 'authToken');

    // if (!token) {
    //   throw new Error('Token missing');
    // }

    const response = yield call(getWishlistApi);

    console.log('✅ Wishlist list...:', response.data.data);
    console.log('Wishlist fetched successfully in saga', response);

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
// const removeWishlistApi = (token, wishlistId) => {
//   return axios.delete(
//     `https://mntrendigo.mntech.website/api/v1/user/userWishlist/${wishlistId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// };

const removeWishlistApi = wishlistId => {
  return api.delete(`/user/userWishlist/${wishlistId}`);
};

function* removeWishlistSaga(action) {
  try {
    console.log(' REMOVE_WISHLIST_SAGA STARTED');
    if (!action.payload) {
      console.log('Wishlist ID missing, stopping saga');
      return;
    }

    console.log(' Wishlist ID ', action.payload);

    console.log(' Calling DELETE wishlist API...');
    yield call(removeWishlistApi, action.payload);

    console.log(' Wishlist removed successfully in saga');

    // success → reducer ko id bhejo
    yield put(removeWishlistSuccess(action.payload));
    console.log(' REMOVE_WISHLIST_SUCCESS dispatched', action.payload);
  } catch (error) {
    console.log('Error in removeWishlistSaga ', error);
    console.log('Error response ', error?.response);

    yield put(removeWishlistFailure(error?.response?.data || error.message));
  }
}

// function* removeWishlistSaga(action) {
//   try {
//     console.log(' REMOVE_WISHLIST_SAGA STARTED');

//     if (!action.payload) {
//       console.log('❌ Wishlist ID missing, stopping saga');
//       return;
//     }

//     console.log(' Wishlist ID ', action.payload);

//     yield call(removeWishlistApi, action.payload);
//     console.log(' Wishlist removed successfully in saga', action.payload);
//     yield put(removeWishlistSuccess(action.payload));
//     console.log(' REMOVE_WISHLIST_SUCCESS dispatched', action.payload);
//   } catch (error) {
//     console.log('Error in removeWishlistSaga ', error);
//   }
// }
/* =========================
   WATCHER SAGA
========================= */
export default function* wishlistSaga() {
  yield takeLatest(WISHLIST_REQUEST, wishlistWorker);
  yield takeLatest(GET_WISHLIST_REQUEST, getWishlistWorker);
  yield takeLatest(REMOVE_WISHLIST_REQUEST, removeWishlistSaga);
}
