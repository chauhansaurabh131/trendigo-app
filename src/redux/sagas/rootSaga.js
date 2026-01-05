// redux/sagas/rootSaga.js
import {all} from 'redux-saga/effects';
import authRootSaga from './authSaga';
import userRootSaga from './userSaga';
import updateUserRootSaga from './updateUserSaga';
// import watchAddAddress from './addressSaga';
import addressSaga from './addressSaga';
import userAccountSaga from './userAccountSaga';
import {profileImageWatcher} from './profileImageSaga';
import {bannerSaga} from './bannerSaga';
import watchLogout from './logoutSaga';
import authMobileSaga from './authMobileSaga';

export default function* rootSaga() {
  yield all([
    authRootSaga(),
    userRootSaga(),
    updateUserRootSaga(),
    // watchAddAddress(),
    addressSaga(),
    userAccountSaga(),
    profileImageWatcher(),
    bannerSaga(),
    watchLogout(),
    authMobileSaga(),
  ]);
}
