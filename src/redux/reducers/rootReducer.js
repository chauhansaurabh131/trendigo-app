// redux/reducers/rootReducer.js
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import updateuserReducer from './updateUserReducer';
import addressReducer from './addressReducer';
import userAccountReducer from './userAccountReducer';
import profileImageReducer from './profileImageReducer';
import bannerReducer from './bannerReducer';
import {authMobileReducer} from './authMobileReducer';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  updateUser: updateuserReducer, // ✅ unique key
  addresses: addressReducer,
  userAccount: userAccountReducer, // ✅ unique key
  profileImage: profileImageReducer,
  banner: bannerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined; // 🔥 RESET EVERYTHING
  }
  return appReducer(state, action);
};
export default rootReducer;
