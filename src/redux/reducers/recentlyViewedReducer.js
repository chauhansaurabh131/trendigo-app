// redux/reducers/recentlyViewedReducer.js

import {
  ADD_RECENTLY_VIEWED_REQUEST,
  ADD_RECENTLY_VIEWED_SUCCESS,
  ADD_RECENTLY_VIEWED_FAILURE,
  GET_RECENTLY_VIEWED_REQUEST,
  GET_RECENTLY_VIEWED_SUCCESS,
  GET_RECENTLY_VIEWED_FAILURE,
} from '../actions/recentlyViewedActions';

const initialState = {
  loading: false,
  data: [], // store recently viewed products
  error: null,
};

export default function recentlyViewedReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECENTLY_VIEWED_REQUEST:
    case GET_RECENTLY_VIEWED_REQUEST:
      return {...state, loading: true};

    case ADD_RECENTLY_VIEWED_SUCCESS:
      return {...state, loading: false};

    case ADD_RECENTLY_VIEWED_FAILURE:
      return {...state, loading: false, error: action.payload};

    case GET_RECENTLY_VIEWED_SUCCESS:
      return {...state, loading: false, data: action.payload};

    case GET_RECENTLY_VIEWED_FAILURE:
      return {...state, loading: false, error: action.payload, data: []};

    default:
      return state;
  }
}
