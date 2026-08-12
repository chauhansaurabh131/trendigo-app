// redux/reducers/rootReducer.js
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import updateuserReducer from './updateUserReducer';
import addressReducer from './addressReducer';
import userAccountReducer from './userAccountReducer';
import profileImageReducer from './profileImageReducer';
import bannerReducer from './bannerReducer';
import productReducer from './productReducer';
import wishlistReducer from './wishlistReducer';
import productCategoryReucer from './productCategoryReducer';
import reviewReducer from './reviewReducer';
import productByReviewReducer from './productByReviewReducer';
import reviewByUserIdReducer from './reviewByUserIdReducer';
import storeReducer from './storeReducer';
import storeProductReducer from './storeProductReducer';
import {productDetailsReducer} from './productDetailsReducer';
import recentlyViewedReducer from './recentlyViewedReducer';
import cartReducer from './cartReducer';
import productVariantReducer from './productVariantReducer';
import searchReducer from './searchReducer';
import emailAndMobile from './emailAndMobileReducer';
import otpReducer from './otpReducer';
import sellerAuthReducer from './sellerAuthReducer';
import sellerProductReducer from './SellerproductReducer';
import SellerChatReducer from './sellerChatReducer';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  updateUser: updateuserReducer,
  addresses: addressReducer,
  userAccount: userAccountReducer,
  profileImage: profileImageReducer,
  banner: bannerReducer,
  product: productReducer,
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
  sellerAuth: sellerAuthReducer,
  sellerProduct: sellerProductReducer,
  sellerChat: SellerChatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
