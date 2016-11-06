import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

export class Todo extends React.Component {

  handleClick (e) {
    e.preventDefault();
    var {dispatch, id} = this.props;
    dispatch(actions.startDeleteTodo(id));
  }


  render() {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    };

    return (
      <div>
        <div className={todoClassName} onClick={() =>{
            dispatch(actions.startToggleTodo(id, !completed));
          }}>
          <div>
            <input type="checkbox" checked={completed}/>
          </div>
          <div>
            <p>{text}</p>
            <p className="todo__subtext">{renderDate()}</p>
          </div>
        </div>
        <div className="deleteBox">
          <button className="button float-right" onClick={this.handleClick.bind(this)}>Delete</button>
        </div>
      </div>
    )
  }
};

export default connect()(Todo)
