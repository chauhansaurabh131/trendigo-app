// redux/sagas/recentlyViewedSaga.js

import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ make sure imported

import {
  ADD_RECENTLY_VIEWED_REQUEST,
  ADD_RECENTLY_VIEWED_SUCCESS,
  ADD_RECENTLY_VIEWED_FAILURE,
  GET_RECENTLY_VIEWED_REQUEST,
  GET_RECENTLY_VIEWED_SUCCESS,
  GET_RECENTLY_VIEWED_FAILURE,
} from '../actions/recentlyViewedActions';
console.log('RecentlyView Working on now...');

const BASE_URL = 'https://mntrendigo.mntech.website/api';
function addRecentlyViewedApi(data, token) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/recentlyViewed/',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

function* addRecentlyViewedSaga(action) {
  try {
    console.log('ADD_RECENTLY_VIEWED_REQUEST TRIGGERED');
    console.log('ADD_RECENTLY_VIEWED Action Payload:', action.payload);

    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log('🔑 TOKEN:', token);

    const response = yield call(
      addRecentlyViewedApi,
      {productId: action.payload?.productId},
      token,
    );

    console.log('ADD_RECENTLY_VIEWED FULL RESPONSE:', response);
    console.log('ADD_RECENTLY_VIEWED RESPONSE.DATA:', response?.data);

    yield put({
      type: ADD_RECENTLY_VIEWED_SUCCESS,
      payload: response?.data,
    });
  } catch (error) {
    console.log('❌ API ERROR:', error);
    console.log('❌ ERROR RESPONSE:', error?.response);
    console.log('❌ ERROR DATA:', error?.response?.data);

    yield put({
      type: ADD_RECENTLY_VIEWED_FAILURE,
      payload: error?.response?.data || error.message,
    });
  }
}

function getRecentlyViewedApi(token) {
  const url = `${BASE_URL}/v1/user/recentlyViewed/by-user/`;
  console.log('Calling URL:', url);

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function* getRecentlyViewedSaga(action) {
  try {
    // const {token} = action.payload;
    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log('REcently......, TOKEN:', token);
    console.log('GET_RECENTLY_VIEWED_SAGA started');

    const response = yield call(getRecentlyViewedApi, token);

    console.log('GET_RECENTLY-VIEW API Response:', response.data);

    yield put({
      type: GET_RECENTLY_VIEWED_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);

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
