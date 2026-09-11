import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/apiClient';
import {
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from '../actions/updateUserActions';
import {fetchUserRequest} from '../actions/userActions';

function* updateUserSaga(action) {
  try {
    console.log('updateUserSaga called');

    console.log('USER UPDATE Payload:', action.payload);

    const response = yield call(() =>
      api.put('/user/auth/update-user', action.payload),
    );

    console.log(' USER UPDATE API RESPONSE:', response.data);

    yield put(updateUserSuccess(response.data));

    yield put(fetchUserRequest());
  } catch (error) {
    console.log(
      ' USER UPDATE Saga Error:',
      error.response?.data || error.message,
    );
    yield put(
      updateUserFailure(
        'UPDATE USER ERROR',
        error.response?.data?.message || error.message,
      ),
    );
  }
}

export default function* updateUserRootSaga() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
}
