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

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  updateUser: updateuserReducer,
  addresses: addressReducer,
  userAccount: userAccountReducer,
  profileImage: profileImageReducer,
  authMobile: authMobileReducer,

  banner: bannerReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
