export const getCart = ({cart}) => cart.data;
export const getCartProductById = ( id, option, {cart}) => cart.data.find(item => item._id === id && item.optionName === option);

const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_CART = createActionName('LOAD_CART');
const ADD_CART_PRODUCT = createActionName('ADD_CART_PRODUCT');
const UPDATE_CART_PRODUCT = createActionName('UPDATE_CART_PRODUCT');
const REMOVE_CART_PRODUCT = createActionName('REMOVE_CART_PRODUCT');


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
  default:
      return statePart;
  }
};