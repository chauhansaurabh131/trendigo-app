// redux/sagas/recentlyViewedSaga.js

import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ make sure imported
import api from '../../api/apiClient';
import {
  ADD_RECENTLY_VIEWED_REQUEST,
  ADD_RECENTLY_VIEWED_SUCCESS,
  ADD_RECENTLY_VIEWED_FAILURE,
  GET_RECENTLY_VIEWED_REQUEST,
  GET_RECENTLY_VIEWED_SUCCESS,
  GET_RECENTLY_VIEWED_FAILURE,
} from '../actions/recentlyViewedActions';
console.log('RecentlyView Working on now...');

function addRecentlyViewedApi(data, token) {
  return api.post('/user/recentlyViewed/', data);
}

function* addRecentlyViewedSaga(action) {
  try {
    console.log('ADD_RECENTLY_VIEWED_REQUEST TRIGGERED');

    console.log('ADD_RECENTLY_VIEWED Action Payload:', action.payload);

    console.log('Sending Product ID:', action.payload?.productId);

    const response = yield call(addRecentlyViewedApi, {
      productId: action.payload?.productId,
    });

    console.log('ADD_RECENTLY_VIEWED FULL RESPONSE:', response);

    console.log('ADD_RECENTLY_VIEWED RESPONSE.DATA:', response?.data);

    yield put({
      type: ADD_RECENTLY_VIEWED_SUCCESS,
      payload: response?.data,
    });

    yield put({
      type: GET_RECENTLY_VIEWED_REQUEST,
    });
  } catch (error) {
    console.log(' API ERROR:', error);
    console.log(' ERROR RESPONSE:', error?.response);
    console.log(' ERROR DATA:', error?.response?.data);

    yield put({
      type: ADD_RECENTLY_VIEWED_FAILURE,
      payload: error?.response?.data || error.message,
    });
  }
}

function getRecentlyViewedApi(token) {
  return api.get('/user/recentlyViewed/by-user/');
}
function* getRecentlyViewedSaga(action) {
  try {
    console.log('GET_RECENTLY_VIEWED_SAGA started');

    const response = yield call(getRecentlyViewedApi);

    console.log('GET_RECENTLY-VIEW API Response:', response.data);

    yield put({
      type: GET_RECENTLY_VIEWED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(
      ' RECENTLY VIEWED API Error :',
      error.response?.data || error.message,
    );

    yield put({
      type: GET_RECENTLY_VIEWED_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}
export function* watchRecentlyViewed() {
  yield takeLatest(ADD_RECENTLY_VIEWED_REQUEST, addRecentlyViewedSaga);
  yield takeLatest(GET_RECENTLY_VIEWED_REQUEST, getRecentlyViewedSaga);
}
