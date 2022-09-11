import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {reducer as productsReducer} from './productsRedux';
// import {reducer as ordersReducer} from './ordersRedux';

const reducer = combineReducers({
  products: productsReducer,
  // orders,
});

const store = createStore(
  reducer,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
