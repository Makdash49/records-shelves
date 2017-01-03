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
        <div className="about-description">
          <p>This is a cool app that will do some really really neat things.</p>
          <p>It allows users to vote for what they want in a way that lets them express how much they like their choices in comparison to each other.</p>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(TodoApp);
