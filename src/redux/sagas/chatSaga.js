import {call, put, takeLatest} from 'redux-saga/effects';

import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAILURE,
  GET_MESSAGES_REQUEST,
  UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
} from '../actions/chatAction';
import api from '../../api/apiClient';

function getChatListApi() {
  // console.log(' Calling Chat List API...');
  return api.get('/user/chat/conversations');
}

function* getChatListSaga(action) {
  try {
    // console.log(' GET_CHAT_LIST_REQUEST Received');
    // console.log(' Action =>', action);

    const response = yield call(getChatListApi);

    // console.log('GET CONVERSATIONS SELLER LIST API Response =>', response);
    console.log('GET  CONVERSATIONS SELLER LIST API Data =>', response?.data);
    console.log('GET  CONVERSATIONS SELLER LIST=>', response?.data?.data);

    yield put({
      type: GET_CHAT_LIST_SUCCESS,
      payload: response.data.data,
    });

    // console.log('GET_CHAT_LIST_SUCCESS Dispatched');
  } catch (error) {
    console.log('GET CONVERSATIONS SELLER LIST =>', error);
    console.log('GET CONVERSATIONS SELLER LIST =>', error?.response?.data);

    yield put({
      type: GET_CHAT_LIST_FAILURE,
      payload: error?.message,
    });

    console.log('GET CONVERSATIONS SELLER LIST FAILURE Dispatched');
  }
}

function* getMessagesSaga(action) {
  // console.log('GET_MESSAGES_REQUEST Received');

  console.log(
    ' GET SELLER  CONVERSATIONS  MESSAGES SELLER ID =>',
    action.payload,
  );
  try {
    const response = yield call(
      api.get,
      `/user/chat/messages/${action.payload}?page=1&limit=10`,
    );

    yield put({
      type: 'GET_MESSAGES_SUCCESS',
      payload: response.data.data.results,
    });
    console.log(
      'GET SELLER  CONVERSATIONS  MESSAGES =>',
      response.data.data.results,
    );

    console.log(
      'GET SELLER  CONVERSATIONS  MESSAGES FULL RESPONSE =>',
      response.data,
    );
  } catch (error) {
    console.log('GET SELLER  CONVERSATIONS  MESSAGES FAILURE Error =>', error);
    yield put({
      type: 'GET_MESSAGES_FAILURE',
      payload: error,
    });
  }
}

function* uploadCustomerChatImageSaga(action) {
  try {
    const response = yield call(api.post, `user/chat/upload-url`, {
      fileName: action.payload.fileName,
      fileType: action.payload.fileType,
    });

    console.log('UPLOAD _CUSTOMER URL RESPONSE =>', response.data);

    yield put({
      type: 'UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.log(
      'UPLOAD _CUSTOMER URL ERROR =>',
      error?.response?.data || error,
    );

    yield put({
      type: 'UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE',
      payload: error?.response?.data || error.message,
    });
  }
}

function* uploadCustomerImageToS3Saga(action) {
  try {
    console.log('UPLOAD CUSTOMER TO S3 PAYLOAD =>', action.payload);

    const {uploadUrl, imageUri, fileType, fileUrl} = action.payload;

    // Local image read
    const imageResponse = yield call(fetch, imageUri);

    const blob = yield call([imageResponse, imageResponse.blob]);

    // Upload to S3
    yield call(fetch, uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': fileType,
      },
      body: blob,
    });

    console.log('CUSTOMER S3 UPLOAD SUCCESS');

    yield put({
      type: 'UPLOAD_CUSTOMER_IMAGE_TO_S3_SUCCESS',
      payload: fileUrl,
    });
  } catch (error) {
    console.log('S3 CUSTOMER UPLOAD ERROR =>', error);

    yield put({
      type: 'UPLOAD_CUSTOMER_IMAGE_TO_S3_FAILURE',
      payload: error.message,
    });
  }
}
export default function* chatSaga() {
  yield takeLatest(GET_CHAT_LIST_REQUEST, getChatListSaga);
  yield takeLatest(GET_MESSAGES_REQUEST, getMessagesSaga);
  yield takeLatest(
    UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
    uploadCustomerChatImageSaga,
  );
  yield takeLatest(
    'UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST',
    uploadCustomerImageToS3Saga,
  );
}
