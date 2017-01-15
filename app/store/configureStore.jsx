import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer, productsReducer, userIDsReducer, pagesReducer, isLoadedReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    auth: authReducer,
    products: productsReducer,
    userIDs: userIDsReducer,
    pages: pagesReducer,
    isLoaded: isLoadedReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f => f
  ));

  return store;
};





















//
// var redux = require('redux');
// var {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');
//
// export var configure = () => {
//   var reducer = redux.combineReducers({
//     searchText: searchTextReducer,
//     showCompleted: showCompletedReducer,
//     todos: todosReducer
//   });
//
//   var store = redux.createStore(reducer, redux.compose(
//     window.devToolsExtension ? window.devToolsExtension(): f => f
//   ));
// };
