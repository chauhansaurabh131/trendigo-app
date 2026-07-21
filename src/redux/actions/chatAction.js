export const GET_CHAT_LIST_REQUEST = 'GET_CHAT_LIST_REQUEST';
export const GET_CHAT_LIST_SUCCESS = 'GET_CHAT_LIST_SUCCESS';
export const GET_CHAT_LIST_FAILURE = 'GET_CHAT_LIST_FAILURE';
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const getChatListRequest = () => ({
  type: GET_CHAT_LIST_REQUEST,
});

export const getChatListSuccess = data => ({
  type: GET_CHAT_LIST_SUCCESS,
  payload: data,
});

export const getChatListFailure = error => ({
  type: GET_CHAT_LIST_FAILURE,
  payload: error,
});

export const getMessagesRequest = sellerId => ({
  type: 'GET_MESSAGES_REQUEST',
  payload: sellerId,
});
