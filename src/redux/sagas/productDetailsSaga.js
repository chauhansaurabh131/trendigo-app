import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  productDetailsSuccess,
  productDetailsFailure,
  PRODUCT_DETAILS_REQUEST,
} from '../actions/productDetailsAction';

function productDetailsApi(productId, token) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/product/details/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
}

function* productDetailsSaga(action) {
  try {
    console.log('PRODUCT ID', action.payload);
    const token = yield AsyncStorage.getItem('authToken');

    const response = yield call(productDetailsApi, action.payload, token);

    console.log('API RESPONSE PRODUCT ID =>', response.data?.results?._id);

    yield put(productDetailsSuccess(response.data.results));
  } catch (error) {
    console.log(error);
  }
}

export function* watchProductDetails() {
  yield takeLatest(PRODUCT_DETAILS_REQUEST, productDetailsSaga);
}
