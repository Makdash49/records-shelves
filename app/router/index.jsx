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
    replace('/amazon');
  }
  next()
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Login}>
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
