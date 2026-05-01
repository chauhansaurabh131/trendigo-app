// redux/sagas/productSaga.js
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  SEARCH_PRODUCT_REQUEST,
  searchProductSuccess,
  searchProductFailure,
} from '../actions/searchActions';
import api from '../../api/apiClient';

function* searchProductWorker(action) {
  try {
    console.log(' SEARCH API CALLED:', action.payload);

    const response = yield call(api.get, '/user/product/search', {
      params: {
        keyword: action.payload,
      },
    });

    console.log(' SEARCH SUCCESS:', response.data);

    console.log('FINAL DATA ', response.data.results.results);

    yield put(searchProductSuccess(response.data));
  } catch (error) {
    console.log(' SEARCH ERROR:', error);

    yield put(searchProductFailure(error.message));
  }
}

export function* watchSearchProduct() {
  yield takeLatest(SEARCH_PRODUCT_REQUEST, searchProductWorker);
}
