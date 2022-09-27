// import axios from 'axios';
// import { API_URL } from '../config';

export const getCart = ({cart}) => cart.data;
export const getCartProductById = ( id, option, {cart}) => cart.data.find(item => item._id === id && item.optionName === option);
// export const getRequest = ({ cart }) => cart.request;

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_CART = createActionName('LOAD_CART');
const ADD_CART_PRODUCT = createActionName('ADD_CART_PRODUCT');
const UPDATE_CART_PRODUCT = createActionName('UPDATE_CART_PRODUCT');
const REMOVE_CART_PRODUCT = createActionName('REMOVE_CART_PRODUCT');


// export const startRequest = () => ({ type: START_REQUEST });
// export const endRequest = () => ({ type: END_REQUEST });
// export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadCart = payload => ({ payload, type: LOAD_CART });
export const addCartProduct = payload => ({ payload, type: ADD_CART_PRODUCT });
export const updateCartProduct = payload => ({ payload, type: UPDATE_CART_PRODUCT });
export const removeCartProduct = payload => ({ payload, type: REMOVE_CART_PRODUCT });

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  }
};

export const reducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CART: 
      return { ...statePart, data: [...action.payload] };
    case ADD_CART_PRODUCT: 
      return { ...statePart, data: [...statePart.data, action.payload] };
    case UPDATE_CART_PRODUCT: 
      return { ...statePart, data: [...statePart.data.map(product => (
        (product._id === action.payload._id && product.optionName === action.payload.optionName) ? action.payload : product))] };
    case REMOVE_CART_PRODUCT: 
      return { ...statePart, data: statePart.data.filter(product =>
         product._id !== action.payload._id || product.optionName !== action.payload.optionName) };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
  default:
      return statePart;
  }
};