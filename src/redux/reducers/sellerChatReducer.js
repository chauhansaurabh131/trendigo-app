import {
  GET_SELLER_CONVERSATIONS_REQUEST,
  GET_SELLER_CONVERSATIONS_FAILURE,
  GET_SELLER_CONVERSATIONS_SUCCESS,
  UPDATE_CONVERSATIONS,
  GET_CHAT_MESSAGES_FAILURE,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_REQUEST,
  CLEAR_CHAT_MESSAGES,
  ADD_MESSAGE,
} from '../actions/sellerChatActions';

const initialState = {
  sellerChatLoading: false,
  conversations: [],
  error: null,
  chatMessagesLoading: false,
  chatMessages: [],
  error: null,
};
export default function sellerChatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SELLER_CONVERSATIONS_REQUEST:
      return {
        ...state,
        sellerChatLoading: true,
      };

    case GET_SELLER_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        sellerChatLoading: false,
        conversations: action.payload,
      };

    case GET_SELLER_CONVERSATIONS_FAILURE:
      return {
        ...state,
        sellerChatLoading: false,
        error: action.payload,
      };

    case UPDATE_CONVERSATIONS:
      console.log('REDUCER CALLED');
      return {
        ...state,
        conversations: {
          ...state.conversations,
          data: action.payload,
        },
      };

    case GET_CHAT_MESSAGES_REQUEST:
      return {
        ...state,
        chatMessagesLoading: true,
      };

    case GET_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        chatMessagesLoading: false,
        chatMessages: {
          ...action.payload.data,
          results:
            action.payload.data.page === 1
              ? action.payload.data.results
              : [
                  ...(state.chatMessages?.results || []),
                  ...action.payload.data.results,
                ],
        },
      };
    case GET_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        chatMessagesLoading: false,
        error: action.payload,
      };

    case 'ADD_MESSAGE':
      console.log('ADD_MESSAGE HIT');
      console.log('OLD =>', state.chatMessages);
      console.log('NEW MESSAGE =>', action.payload);
      console.log('ADD_MESSAGE REDUCER HIT');
      return {
        ...state,
        chatMessages: {
          ...state.chatMessages,
          results: [action.payload, ...(state.chatMessages?.results || [])],
        },
      };
    case 'SET_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: action.payload,
      };

    case 'APPEND_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: {
          ...action.payload,
          results: [
            ...(state.chatMessages?.results || []),
            ...(action.payload?.results || []),
          ],
        },
      };
    case CLEAR_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: {
          results: [],
          page: 1,
          hasNextPage: false,
        },
      };
    default:
      return state;
  }
}
