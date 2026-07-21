import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAILURE,
} from '../actions/chatAction';

const initialState = {
  loading: false,
  chatList: [],
  error: null,
  messages: [],
  product: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chatList: action.payload,
      };

    case GET_CHAT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.payload,
        product: action.payload?.[0]?.product || null,
        loading: false,
      };
    case 'ADD_MESSAGE':
      console.log('PAYLOAD =>', action.payload);
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
        product: action.payload?.[0]?.product || null,
        loading: false,
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};
