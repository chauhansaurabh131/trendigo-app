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
    console.log('ADD WISHLIST SAGA CALLED');
    console.log(' Product ID:', action.payload.productId);

    const response = yield call(wishlistApi, action.payload.productId);

    console.log('ADD WISHLIST RESPONSE:', response.data);
    yield put(wishlistSuccess(response.data));

    yield put(getWishlistRequest());
  } catch (error) {
    console.log(' ADD WISHLIST ERROR:', error?.response?.data || error.message);

    yield put(wishlistFailure(error?.response?.data || error.message));
  }
}

const getWishlistApi = () => {
  return api.get('/user/userWishlist/userWishlist');
};

function* getWishlistWorker() {
  try {
    console.log('GET WISHLIST SAGA CALLED');

    const response = yield call(getWishlistApi);

    console.log('GET WISHLIST.:', response.data.data);
    // console.log('Wishlist fetched successfully in saga', response);

    yield put({
      type: GET_WISHLIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(' GET WISHLIST ERROR:', error.message);

    console.log('GET WISHLIST FULL ERROR ', error);

    yield put(getWishlistFailure(error.message));

    console.log(' GET WISHLIST ERROR:', error?.response?.data || error.message);
  }
}

const removeWishlistApi = wishlistId => {
  return api.delete(`/user/userWishlist/${wishlistId}`);
};

function* removeWishlistSaga(action) {
  try {
    console.log(' REMOVE_WISHLIST_SAGA STARTED');
    if (!action.payload) {
      console.log('REMOVE_WISHLIST ID missing, stopping saga');
      return;
    }

    console.log(' REMOVE_WISHLIST  ID ', action.payload);

    yield call(removeWishlistApi, action.payload);

    console.log(' REMOVE_WISHLIST SUCCESSFULLY');

    yield put(removeWishlistSuccess(action.payload));
    console.log(' REMOVE_WISHLIST_SUCCESS dispatched', action.payload);
  } catch (error) {
    console.log('REMOVE_WISHLIST ', error);
    console.log('REMOVE_WISHLIST Error response ', error?.response);

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
