import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeLatest} from 'redux-saga/effects';

import {GET_SELLER_PRODUCTS_REQUEST} from '../actions/sellerProductActions';
import {
  getSellerProductsSuccess,
  getSellerProductsFailure,
} from '../actions/sellerProductActions';

function* getSellerProductsSaga(action) {
  try {
    const {sellerId, page = 1, limit = 10} = action.payload;
    console.log('SELLER ID IN SAGA =>', sellerId, page, limit);

    const token = yield call(
      [AsyncStorage, 'getItem'],
      'sellerAccessToken', // use your actual storage key
    );

    const response = yield call(
      axios.get,
      `https://mntrendigo.mntech.website/api/v1/user/product/by-seller/summary/${sellerId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('SELLER PRODUCTS RESPONSE =>', response.data);

    yield put(getSellerProductsSuccess(response.data));
  } catch (error) {
    console.log('SELLER PRODUCTS ERROR =>', error.response?.data || error);

    yield put(
      getSellerProductsFailure(error.response?.data?.message || error.message),
    );
  }
}

export default function* sellerProductSaga() {
  yield takeLatest(GET_SELLER_PRODUCTS_REQUEST, getSellerProductsSaga);
}
