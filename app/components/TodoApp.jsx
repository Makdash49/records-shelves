var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      todos: [
        {
          id: 1,
          text: 'Walk the dog'
        }, {
          id: 2,
          text: 'Clean the yard'
        }, {
          id: 3,
          text: 'Take a shower'
        }, {
          id: 4,
          text: 'Go to DBC'
        }, {
          id: 5,
          text: 'Pay insurance'
        }
      ]
    };
  },
  handleAddTodo: function (text) {
    alert('new todo: ' + text);
  },
  render: function () {
    var {todos} = this.state;
    return (
      <div>
        <TodoList todos={todos}/>
        <AddTodo onAddTodo={this.handleAddTodo} />
      </div>
    )
  }
});

module.exports = TodoApp;


// What am I doing?  Creating an AddTodo component which is a form with a button.
// On submit, it should call the handleAddTodo function which will pop a modal onto
// the screen with the text of the new todo.  Also, write tests. You could create a
// phone test and put it in the DOM and then run a test on it like last time.
// The add todo component goes in the TodoApp underneath the TodoList. It is not
// nested in TodoList.
