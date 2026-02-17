// reviewByUserIdSaga.js

import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  REVIEW_BY_USER_ID_REQUEST,
  REVIEW_BY_USER_ID_SUCCESS,
  REVIEW_BY_USER_ID_FAILURE,
} from '../actions/reviewByUserIdActions';

function* reviewByUserIdSaga(action) {
  try {
    console.log(' REVIEW_BY_USER_ID_REQUEST TRIGGERED');
    console.log('Full Action:', action);

    const {userId, token} = action.payload;

    console.log('==> User ID:', userId);
    console.log('==>Token:', token);

    const response = yield call(() =>
      axios.get(
        `https://mntrendigo.mntech.website/api/v1/user/review/by-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    console.log(' API RESPONSE:', response);
    console.log('RESPONSE DATA:', response.data);

    yield put({
      type: REVIEW_BY_USER_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(' API ERROR:', error);
    console.log(' ERROR RESPONSE:', error.response);

    yield put({
      type: REVIEW_BY_USER_ID_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

export function* watchReviewByUserId() {
  yield takeLatest(REVIEW_BY_USER_ID_REQUEST, reviewByUserIdSaga);
}
