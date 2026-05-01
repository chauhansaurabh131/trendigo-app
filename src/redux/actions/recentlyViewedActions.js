// export const ADD_RECENTLY_VIEWED_REQUEST = 'ADD_RECENTLY_VIEWED_REQUEST';
// export const ADD_RECENTLY_VIEWED_SUCCESS = 'ADD_RECENTLY_VIEWED_SUCCESS';
// export const ADD_RECENTLY_VIEWED_FAILURE = 'ADD_RECENTLY_VIEWED_FAILURE';

// export const GET_RECENTLY_VIEWED_REQUEST = 'GET_RECENTLY_VIEWED_REQUEST';
// export const GET_RECENTLY_VIEWED_SUCCESS = 'GET_RECENTLY_VIEWED_SUCCESS';
// export const GET_RECENTLY_VIEWED_FAILURE = 'GET_RECENTLY_VIEWED_FAILURE';

// export const addRecentlyViewedRequest = productId => ({
//   type: ADD_RECENTLY_VIEWED_REQUEST,
//   payload: {productId},
// });

// export const getRecentlyViewedRequest = (userId, token) => ({
//   type: GET_RECENTLY_VIEWED_REQUEST,
//   payload: {userId, token},
// });

// redux/actions/recentlyViewedActions.js

export const ADD_RECENTLY_VIEWED_REQUEST = 'ADD_RECENTLY_VIEWED_REQUEST';
export const ADD_RECENTLY_VIEWED_SUCCESS = 'ADD_RECENTLY_VIEWED_SUCCESS';
export const ADD_RECENTLY_VIEWED_FAILURE = 'ADD_RECENTLY_VIEWED_FAILURE';

export const GET_RECENTLY_VIEWED_REQUEST = 'GET_RECENTLY_VIEWED_REQUEST';
export const GET_RECENTLY_VIEWED_SUCCESS = 'GET_RECENTLY_VIEWED_SUCCESS';
export const GET_RECENTLY_VIEWED_FAILURE = 'GET_RECENTLY_VIEWED_FAILURE';

export const addRecentlyViewedRequest = payload => ({
  type: ADD_RECENTLY_VIEWED_REQUEST,
  payload, // { productId, token }
});

export const getRecentlyViewedRequest = payload => ({
  type: GET_RECENTLY_VIEWED_REQUEST,
  payload, // { token }
});
