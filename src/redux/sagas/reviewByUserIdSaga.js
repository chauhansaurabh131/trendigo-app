// reviewByUserIdSaga.js

import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  REVIEW_BY_USER_ID_REQUEST,
  REVIEW_BY_USER_ID_SUCCESS,
  REVIEW_BY_USER_ID_FAILURE,
} from '../actions/reviewByUserIdActions';
import api from '../../api/apiClient';

function* reviewByUserIdSaga(action) {
  try {
    console.log(' REVIEW_BY_USER_ID_REQUEST TRIGGERED');
    console.log('Full Action:', action);

    const {userId, page, limit, token} = action.payload;

    console.log('==> User ID:', userId);
    console.log('==>Token:', token);
    console.log('==>Page:', page);
    console.log('==>Limit:', limit);

    const response = yield call(() =>
      api.get(`/user/review/by-user/${userId}?page=${page}&limit=${limit}`),
    );

    console.log(
      ' REVIEW RESPONSE DATA:',
      JSON.stringify(response.data, null, 2),
    );

    yield put({
      type: REVIEW_BY_USER_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(' REVIEW API ERROR:', error);
    console.log(' REVIEW ERROR RESPONSE:', error.response);

    yield put({
      type: REVIEW_BY_USER_ID_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

export function* watchReviewByUserId() {
  yield takeLatest(REVIEW_BY_USER_ID_REQUEST, reviewByUserIdSaga);
}
