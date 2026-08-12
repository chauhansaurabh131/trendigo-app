import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  GET_SELLER_CONVERSATIONS_REQUEST,
  getSellerConversationsSuccess,
  getSellerConversationsFailure,
  GET_CHAT_MESSAGES_REQUEST,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAILURE,
  getSellerConversationsRequest,
} from '../actions/sellerChatActions';

function* getSellerConversationsSaga() {
  try {
    const token = yield call([AsyncStorage, 'getItem'], 'sellerAccessToken');

    console.log('SELLER TOKEN =>', token);

    const response = yield call(
      axios.get,
      'https://mntrendigo.mntech.website/api/v1/user/chat/seller-conversations',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // console.log(
    //   'SELLER CONVERSATIONS =>',
    //   JSON.stringify(response.data, null, 2),
    // );

    yield put(getSellerConversationsSuccess(response.data));
  } catch (error) {
    console.log(
      'SELLER CONVERSATIONS ERROR =>',
      error?.response?.data || error.message,
    );

    yield put(
      getSellerConversationsFailure(error?.response?.data || error.message),
    );
  }
}

function* getChatMessagesSaga(action) {
  try {
    const token = yield call([AsyncStorage, 'getItem'], 'sellerAccessToken');

    console.log('SELLER TOKEN =>', token);
    const {receiverId, page = 1, limit = 10} = action.payload;

    const response = yield call(
      axios.get,
      `https://mntrendigo.mntech.website/api/v1/user/chat/messages/${receiverId}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('CHAT MESSAGES RESPONSE =>', response.data);

    // yield put({
    //   type: GET_CHAT_MESSAGES_SUCCESS,
    //   payload: response.data,
    // });
    yield put({
      type: GET_CHAT_MESSAGES_SUCCESS,
      payload: response.data,
    });

    // Refresh conversation list after messages are loaded/read
    yield put(getSellerConversationsRequest());
  } catch (error) {
    console.log('CHAT MESSAGE ERROR =>', error.response?.data || error.message);

    yield put({
      type: GET_CHAT_MESSAGES_FAILURE,
      payload: error.message,
    });
  }
}

export default function* sellerChatSaga() {
  yield takeLatest(GET_CHAT_MESSAGES_REQUEST, getChatMessagesSaga);
  yield takeLatest(
    GET_SELLER_CONVERSATIONS_REQUEST,
    getSellerConversationsSaga,
  );
}
