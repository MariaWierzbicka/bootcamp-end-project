import axios from 'axios';
import { API_URL } from '../config';

export const getRequests = ({ orders }) => orders.request;

const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const SEND_ORDER = createActionName('SEND_ORDER');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const sendOrder = payload => ({ payload, type:  SEND_ORDER });

export const sendOrderRequest = (order) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'SEND_ORDER' }));
    try {
      let res = await axios.post(`${API_URL}/orders`, order);
      await new Promise((resolve) => setTimeout(resolve));
      dispatch(sendOrder(res));
      dispatch(endRequest({ name: 'SEND_ORDER' }));
    } catch(e) {
      dispatch(errorRequest({ name: 'SEND_ORDER', error: e.message }));
    }
  };
};

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
    case SEND_ORDER: 
      return { ...statePart, data: [...statePart.data, action.payload] };
    case START_REQUEST:
      return { ...statePart, request: {...statePart.request, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, request: { ...statePart.request, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, request: { ...statePart.request, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  }
};