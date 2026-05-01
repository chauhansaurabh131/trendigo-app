import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_STORE_PRODUCTS_REQUEST,
  GET_STORE_PRODUCTS_SUCCESS,
  GET_STORE_PRODUCTS_FAILURE,
} from '../actions/storeProductActions';
import api from '../../api/apiClient';
function* getStoreProductsSaga(action) {
  console.log('Saga Triggered');
  console.log('Store ID ', action.payload);
  try {
    const response = yield call(
      api.get,
      `/user/product/by-store/${action.payload}`,
    );

    yield put({
      type: GET_STORE_PRODUCTS_SUCCESS,
      payload: response.data,
    });
    console.log('API SUCCESS STORE PRODCUT SAGA ', response);
    console.log(' API DATA  STORE PRODCUT SAGA', response.data);
  } catch (error) {
    console.log(error, 'error...........');
    yield put({
      type: GET_STORE_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchStoreProducts() {
  console.log('Store product get call....');
  yield takeLatest(GET_STORE_PRODUCTS_REQUEST, getStoreProductsSaga);
}
