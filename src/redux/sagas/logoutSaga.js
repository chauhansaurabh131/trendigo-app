import {takeLatest, call, put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT} from '../actions/authActions';

function* logoutSaga() {
  yield call(AsyncStorage.removeItem, 'authToken');
  console.log('Logout success');
}

export default function* watchLogout() {
  console.log('watchLogout saga initialized');
  yield takeLatest(LOGOUT, logoutSaga);
}
