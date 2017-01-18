import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';

// var Main = require('Main');


export default (
  <Router history={hashHistory}>
    <Route path="/" component={Login}>
    </Route>
  </Router>
);
