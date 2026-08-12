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
