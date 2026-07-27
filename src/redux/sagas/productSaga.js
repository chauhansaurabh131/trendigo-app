import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCT_REQUEST,
  getProductSuccess,
  getProductFailure,
} from '../actions/productActions';
import api from '../../api/apiClient';

const getProductApi = page =>
  api.get(`/user/product/listProductByReview?page=${page}&limit=10`);

function* getProductSaga(action) {
  try {
    console.log(' PRODUCT SAGA START');

    const page = action.payload?.page || 1;

    const response = yield call(getProductApi, page);
    // console.log('FULL RESPONSE =>', response);
    console.log('PRODUCT RESPONSE DATA =>', response.data);
    // console.log('RESULTS =>', response.data.results);
    console.log('PRODUCT PAGE =>', response.data.page);
    console.log('PRODUCT TOTAL PAGES =>', response.data.totalPages);

    // yield put(getProductSuccess(response.data.results));
    yield put(
      getProductSuccess({
        products: response.data.results,
        page: response.data.page,
        totalPages: response.data.totalPages,
      }),
    );
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
