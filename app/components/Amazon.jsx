import React from 'react';
import * as Redux from 'react-redux';


import * as actions from 'actions';

export class Amazon extends React.Component {
  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddAmazon(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }



  render() {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <h1 className="page-title">Amazon!!!!</h1>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="What do you need to do?"/>
          <button className="button expanded">Add Todo</button>
        </form>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Redux.connect()(Amazon);
