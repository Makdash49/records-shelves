import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    </Route>
  </Router>
);
