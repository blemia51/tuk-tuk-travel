import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import { routerMiddleware } from 'react-router-redux'
import allReducers from './reducers';
import rootSaga from './sagas/root';
//import { helloSaga } from './sagas/sagas'
import travelsSaga from './sagas/travelsSaga'

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  allReducers,
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

sagaMiddleware.run(rootSaga);


// export default function configureStore(initialState = {}, history) {
//   // Create the store with two middlewares
//   // 1. sagaMiddleware: Makes redux-sagas work
//   // 2. routerMiddleware: Syncs the location/URL path to the state
//   const middlewares = [
//     sagaMiddleware,
//     routerMiddleware(history),
//   ]

//   const enhancers = [
//     applyMiddleware(...middlewares),
//   ]

//   // If Redux DevTools Extension is installed use it, otherwise use Redux compose
//   /* eslint-disable no-underscore-dangle */
//   const composeEnhancers =
//     process.env.NODE_ENV !== 'production' &&
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//       : compose
//   /* eslint-enable */

//   const store = createStore(
//     allReducers,
//     initialState,
//     composeEnhancers(...enhancers)
//   )
//   console.log('le store', store)

//   sagaMiddleware.run(rootSaga);

//   return store;
// }
