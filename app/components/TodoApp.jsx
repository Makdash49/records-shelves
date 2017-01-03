import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList'
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends React.Component {
  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }
  render() {
    return (
      <div>
        <p className="about-description">This is a cool app that will do some neat things.</p>
      </div>
    )
  }
};

export default Redux.connect()(TodoApp);
