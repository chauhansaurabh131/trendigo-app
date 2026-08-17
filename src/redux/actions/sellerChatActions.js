export const GET_SELLER_CONVERSATIONS_REQUEST =
  'GET_SELLER_CONVERSATIONS_REQUEST';

export const GET_SELLER_CONVERSATIONS_SUCCESS =
  'GET_SELLER_CONVERSATIONS_SUCCESS';

export const GET_SELLER_CONVERSATIONS_FAILURE =
  'GET_SELLER_CONVERSATIONS_FAILURE';

export const UPDATE_CONVERSATIONS = 'UPDATE_CONVERSATIONS';

export const GET_CHAT_MESSAGES_REQUEST = 'GET_CHAT_MESSAGES_REQUEST';

export const GET_CHAT_MESSAGES_SUCCESS = 'GET_CHAT_MESSAGES_SUCCESS';

export const GET_CHAT_MESSAGES_FAILURE = 'GET_CHAT_MESSAGES_FAILURE';

export const CLEAR_CHAT_MESSAGES = 'CLEAR_CHAT_MESSAGES';

export const ADD_MESSAGE = 'ADD_MESSAGE';

export const UPLOAD_CHAT_IMAGE_REQUEST = 'UPLOAD_CHAT_IMAGE_REQUEST';

export const UPLOAD_CHAT_IMAGE_SUCCESS = 'UPLOAD_CHAT_IMAGE_SUCCESS';

export const UPLOAD_CHAT_IMAGE_FAILURE = 'UPLOAD_CHAT_IMAGE_FAILURE';

export const UPLOAD_IMAGE_TO_S3_REQUEST = 'UPLOAD_IMAGE_TO_S3_REQUEST';

export const UPLOAD_IMAGE_TO_S3_SUCCESS = 'UPLOAD_IMAGE_TO_S3_SUCCESS';

export const UPLOAD_IMAGE_TO_S3_FAILURE = 'UPLOAD_IMAGE_TO_S3_FAILURE';

export const getSellerConversationsRequest = () => ({
  type: GET_SELLER_CONVERSATIONS_REQUEST,
});

export const getSellerConversationsSuccess = data => ({
  type: GET_SELLER_CONVERSATIONS_SUCCESS,
  payload: data,
});

export const getSellerConversationsFailure = error => ({
  type: GET_SELLER_CONVERSATIONS_FAILURE,
  payload: error,
});
export const updateConversations = payload => ({
  type: UPDATE_CONVERSATIONS,
  payload,
});

export const getChatMessagesRequest = payload => ({
  type: GET_CHAT_MESSAGES_REQUEST,
  payload,
});

export const getChatMessagesSuccess = payload => ({
  type: GET_CHAT_MESSAGES_SUCCESS,
  payload,
});

export const getChatMessagesFailure = error => ({
  type: GET_CHAT_MESSAGES_FAILURE,
  payload: error,
});

export const uploadChatImageRequest = payload => ({
  type: UPLOAD_CHAT_IMAGE_REQUEST,
  payload,
});

export const uploadChatImageSuccess = payload => ({
  type: UPLOAD_CHAT_IMAGE_SUCCESS,
  payload,
});

export const uploadChatImageFailure = payload => ({
  type: UPLOAD_CHAT_IMAGE_FAILURE,
  payload,
});

export const uploadImageToS3Request = payload => ({
  type: UPLOAD_IMAGE_TO_S3_REQUEST,
  payload,
});
