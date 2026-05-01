// redux/store.js
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import updateuserReducer from './reducers/updateUserReducer';
import rootSaga from './sagas/rootSaga';
import addressReducer from './reducers/addressReducer';
import userAccountReducer from './reducers/userAccountReducer';
import profileImageReducer from './reducers/profileImageReducer';
import bannerReducer from './reducers/bannerReducer';
import {authMobileReducer} from './reducers/authMobileReducer';
import productReducer from './reducers/productReducer';
import wishlistReducer from './reducers/wishlistReducer';
import productCategoryReucer from './reducers/productCategoryReducer';
import reviewReducer from './reducers/reviewReducer';
import productByReviewReducer from './reducers/productByReviewReducer';
import reviewByUserIdReducer from './reducers/reviewByUserIdReducer';
import storeReducer from './reducers/storeReducer';
import storeProductReducer from './reducers/storeProductReducer';
import {productDetailsReducer} from './reducers/productDetailsReducer';
import recentlyViewedReducer from './reducers/recentlyViewedReducer';
import cartReducer from './reducers/cartReducer';
import productVariantReducer from './reducers/productVariantReducer';
import searchReducer from './reducers/searchReducer';
import emailAndMobile from './reducers/emailAndMobileReducer';
import otpReducer from './reducers/otpReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  updateUser: updateuserReducer,
  addresses: addressReducer,
  userAccount: userAccountReducer,
  profileImage: profileImageReducer,
  authMobile: authMobileReducer,
  product: productReducer,
  banner: bannerReducer,
  productD: productDetailsReducer,
  wishlist: wishlistReducer,
  productCategroy: productCategoryReucer,
  review: reviewReducer,
  productByReview: productByReviewReducer,
  reviewByUserId: reviewByUserIdReducer,
  sellerStore: storeReducer,
  storeProduct: storeProductReducer,
  recentlyView: recentlyViewedReducer,
  addToCard: cartReducer,
  productVariant: productVariantReducer,
  search: searchReducer,
  emailAndMobile: emailAndMobile,
  optVerify: otpReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
