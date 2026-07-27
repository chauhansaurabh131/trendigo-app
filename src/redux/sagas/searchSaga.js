// redux/sagas/productSaga.js
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  SEARCH_PRODUCT_REQUEST,
  searchProductSuccess,
  searchProductFailure,
  SEARCH_SUGGESTION_REQUEST,
  SEARCH_SUGGESTION_SUCCESS,
  SEARCH_SUGGESTION_FAILURE,
} from '../actions/searchActions';
import api from '../../api/apiClient';

function* searchProductWorker(action) {
  try {
    console.log(' SEARCH API CALLED:', action.payload);

    console.log('SEARCH KEYWORD =>', action.payload.keyword);

    const response = yield call(api.get, '/user/product/search', {
      params: {
        keyword: action.payload.keyword,
        page: action.payload.page,
        limit: action.payload.limit,
      },
    });
    console.log(' SEARCH PRODUCT SUCCESS:', response.data);
    console.log(' CURRENT PAGE =>', response.data.results.page);
    console.log('TOTAL PAGES =>', response.data.results.totalPages);
    console.log('TOTAL RESULTS =>', response.data.results.totalResults);
    console.log('SEARCH PRODUCT SUCCESS:', response.data);

    console.log('PRODUCT FINAL DATA ', response.data.results.results);
    console.log('API RESULT COUNT =>', response.data.results.results.length);
    yield put(searchProductSuccess(response.data));
  } catch (error) {
    console.log(' SEARCH PRODUCT ERROR:', error);

    yield put(searchProductFailure(error.message));
  }
}

function* searchSuggestionSaga(action) {
  try {
    const response = yield call(
      api.get,
      `/user/product/search-suggestions?keyword=${action.payload}`,
    );

    console.log('SUGGESTION API RESPONSE =>', response.data);

    yield put({
      type: SEARCH_SUGGESTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log('SUGGESTION ERROR =>', error?.response?.data || error.message);

    yield put({
      type: SEARCH_SUGGESTION_FAILURE,
      payload: error?.response?.data || error.message,
    });
  }
}

function* getRecentSearchSaga() {
  try {
    const response = yield call(api.get, '/user/product/recent-searches');

    yield put({
      type: 'RECENT_SEARCH_SUCCESS',
      payload: response.data.results,
    });
    console.log('RECENT SEARCHES =>', response.data.results);
    console.log('RECENT SEARCHES RESPONSE =>', response.data);
  } catch (error) {
    console.log(
      'RECENT SEARCHES ERROR =>',
      error?.response?.data || error.message,
    );
    console.log(error);
  }
}

export function* watchSearchProduct() {
  yield takeLatest(SEARCH_PRODUCT_REQUEST, searchProductWorker);
  yield takeLatest(SEARCH_SUGGESTION_REQUEST, searchSuggestionSaga);
  yield takeLatest('RECENT_SEARCH_REQUEST', getRecentSearchSaga);
}
