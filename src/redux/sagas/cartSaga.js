import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
} from '../actions/cartActions';
import api from '../../api/apiClient';

function addToCartApi(data, token) {
  console.log('Token', token);
  return api.post(
    'user/cart/',
    data,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  );
}

function* addToCartSaga(action) {
  try {
    console.log('ADD_TO_CART_REQUEST RECEIVED');
    console.log('Full Action ', action);
    const {payload, token} = action;

    const response = yield call(addToCartApi, payload, token);
    console.log('ADD TO CART RESPONSE SUCCESS ==>', response.data);

    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data,
    });
    console.log('ADD TO CART SUCCESS ACTION DISPATCHED');
    //  cart refresh
    yield put({
      type: GET_CART_REQUEST,
      token: token,
    });
    // console.log('GET CART REQUEST DISPATCHED');
  } catch (error) {
    console.log('ADD TO CART ERROR ', error);
    console.log('ADD TO CART ERROR RESPONSE ', error?.response?.data);
    yield put({
      type: ADD_TO_CART_FAILURE,
      payload: error.message,
    });
  }
}

function getCartApi(token) {
  return api.get(
    'user/cart/get-user-cart',
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  );
}

function* getCartSaga(action) {
  try {
    console.log('GET CART API CALLED');

    const response = yield call(getCartApi, action.token);

    // console.log('GET CART RESPONSE ', JSON.stringify(response.data, null, 2));

    yield put({
      type: GET_CART_SUCCESS,
      payload: response.data.data,
    });
    console.log('GET CART RESPONSE===>', response.data.data);
  } catch (error) {
    console.log('GET CART ERROR ', error);
    console.log(' GET CART ERROR:', error?.response?.data || error.message);
    yield put({
      type: GET_CART_FAILURE,
      payload: error.message,
    });
  }
}

function updateCartApi(data, token) {
  console.log('UPDATE CART API CALLED');
  console.log('Payload:', data);
  console.log('Token:', token);

  return api.put(
    `user/cart/${data.cartItemId}`,
    {
      variants: data.variants,
      quantity: data.quantity,
    },
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    // },
  );
}
function* updateCartSaga(action) {
  try {
    console.log('UPDATE_CART_REQUEST RECEIVED');

    const {payload, token} = action;

    const response = yield call(updateCartApi, payload, token);

    console.log('UPDATE CART RESPONSE:', response.data);
    console.log('UPDATE CART RESPONSE DATA:', response);

    yield put({
      type: UPDATE_CART_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: GET_CART_REQUEST,
      token: token,
    });
  } catch (error) {
    console.log('UPDATE CART ERROR:', error);
    console.log('ERROR RESPONSE:', error?.response?.data);

    yield put({
      type: UPDATE_CART_FAILURE,
      payload: error.message,
    });
  }
}

const removeCartApi = async (cartId, itemId, token) => {
  console.log(cartId, 'CARDID');
  console.log(itemId, 'PRODUCTID');
  console.log(token, 'token');
  const response = await api.delete(
    `user/cart/${cartId}/product/${itemId}`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  );

  return response.data;
};
function* removeCartSaga(action) {
  try {
    const {cartId, itemId} = action.payload;
    const token = action.token;
    console.log(action.payload, 'FULL PAYLOAD IN REMOVE SAGA');
    const response = yield call(removeCartApi, cartId, itemId, token);
    console.log(response, 'REMOVE SAGA RESPONSE');
    console.log('REMOVE CART RESPONSE:', response);
    console.log('REMOVE CART RESPONSE DATA:', response.data);
    yield put({
      type: REMOVE_CART_SUCCESS,
      // payload: {itemId},
      payload: response,
    });
    yield put({
      type: GET_CART_REQUEST,
      token: token,
    });
  } catch (error) {
    console.log(error, 'REMOVE CART Error=====>');
    yield put({
      type: REMOVE_CART_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
}

export default function* cartSaga() {
  // console.log('CART SAGA STARTED');
  yield takeLatest(ADD_TO_CART_REQUEST, addToCartSaga);
  // console.log('Get Saga  working');
  yield takeLatest(GET_CART_REQUEST, getCartSaga);
  // console.log('NOW WORKING ON UPDATE CARD SAGA');
  yield takeLatest(UPDATE_CART_REQUEST, updateCartSaga);
  // console.log('REMOVE SAGA WORKING ON');
  yield takeLatest(REMOVE_CART_REQUEST, removeCartSaga);
}
