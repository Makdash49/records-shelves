import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actions from 'actions';

export class Page extends React.Component {

  componentWillMount() {
    console.log('THIS.PROPS', this.props);
  }

  handleClick (e) {
    e.preventDefault();
    var {dispatch, id} = this.props;
    dispatch(actions.startDeleteTodo(id));
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch, id} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddEdit(id, todoText));
    } else {
      this.refs.todoText.focus();
    }
  }

  handleEdit (e) {
    e.preventDefault();
    var {dispatch, id, edit} = this.props;
    edit = !edit
    dispatch(actions.startToggleEdit(id, edit));
  }


  render() {
    var {number} = this.props;
    // var {id, text, completed, createdAt, completedAt, edit, dispatch} = this.props;
    // var todoClassName = completed ? 'todo todo-completed' : 'todo';
    // var renderDate = () => {
    //   var message = 'Created ';
    //   var timestamp = createdAt;
    //
    //   if (completed) {
    //     message = 'Completed ';
    //     timestamp = completedAt;
    //   }
    //
    //   return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    // };
    //
    //
    // var myComponent = () => {
    //   if (edit) {
    //     return (
    //       <div>
    //         <div className={todoClassName}>
    //           <div>
    //             <input type="checkbox" checked={completed}/>
    //           </div>
    //           <div>
    //
    //             <form onSubmit={this.handleSubmit.bind(this)}>
    //               <input type="text" ref="todoText" defaultValue={text}/>
    //             </form>
    //
    //             <p className="todo__subtext">{renderDate()}</p>
    //           </div>
    //         </div>
    //         <div className="deleteBox">
    //           <button className="my-red-button float-right" onClick={this.handleClick.bind(this)}>D</button>
    //           <button className="my-green-button float-right" onClick={this.handleEdit.bind(this)}>E</button>
    //         </div>
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div>
    //         <div className={todoClassName} onClick={() =>{
    //             dispatch(actions.startToggleTodo(id, !completed));
    //           }}>
    //           <div>
    //             <input type="checkbox" checked={completed}/>
    //           </div>
    //           <div>
    //             <p>{text}</p>
    //             <p className="todo__subtext">{renderDate()}</p>
    //           </div>
    //         </div>
    //         <div className="deleteBox">
    //           <button className="my-red-button float-right" onClick={this.handleClick.bind(this)}>D</button>
    //           <button className="my-green-button float-right" onClick={this.handleEdit.bind(this)}>E</button>
    //         </div>
    //       </div>
    //     );
    //   };
    // };


    return (
      <div>
        Shelf {number}
      </div>
    )
  }
};

export default connect()(Page)
