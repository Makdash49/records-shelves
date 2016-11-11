import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var Main = require('Main');
import Amazon from 'Amazon';



var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next()
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/todos');
  }
  next()
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <Route path="amazon" component={Amazon} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);

// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route path="/" component={Main}>
//       <Route path="countdown" component={Countdown}/>
//       <IndexRoute component={Timer}/>
//     </Route>
//   </Router>,
//   document.getElementById('app')
// );
