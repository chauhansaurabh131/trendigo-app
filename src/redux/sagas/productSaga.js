import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCT_REQUEST,
  getProductSuccess,
  getProductFailure,
} from '../actions/productActions';
import api from '../../api/apiClient';

const API_BASE = 'https://mntrendigo.mntech.website/api/v1/user';

// const getProductApi = () =>
//   axios.get(`${API_BASE}/product/listProductByReview`);

const getProductApi = () => api.get('/user/product/listProductByReview');

function* getProductSaga() {
  try {
    console.log(' PRODUCT SAGA START');

    const response = yield call(getProductApi);

    console.log('PRODUCT RESPONSE ===>', response.data);

    yield put(getProductSuccess(response.data.results));
  } catch (error) {
    console.log(
      ' PRODUCT SAGA ERROR ===>',
      error.response?.data || error.message,
    );
    yield put(getProductFailure(error.message));
  }
}

export default function* productSaga() {
  console.log('PRODUCT SAGA WATCHING...');
  yield takeLatest(GET_PRODUCT_REQUEST, getProductSaga);
}
