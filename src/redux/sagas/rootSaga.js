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
import productSaga from './productSaga';
import {watchProductDetails} from './productDetailsSaga';
import wishlistSaga from './wishlistSaga';
import {watchProductCategory} from './productCategorySaga';
import {watchAddReview} from './reviewSaga';
import productByReviewRootSaga from './productByReviewSaga';
import {watchReviewByUserId} from './reviewByUserIdSaga';
import {watchStoreSaga} from './storeSaga';
import {watchStoreProducts} from './storeProductSaga';

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
    productSaga(),
    watchProductDetails(),
    wishlistSaga(),
    watchProductCategory(),
    watchAddReview(),
    productByReviewRootSaga(),
    watchReviewByUserId(),
    watchStoreSaga(),
    watchStoreProducts(),
  ]);
}
