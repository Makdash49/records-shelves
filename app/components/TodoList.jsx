var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
  render: function () {
    var {todos, showCompleted, searchText} = this.props;
    var allCompleted = true;


    var renderTodos = () => {
      console.log('TODOS!!!', todos);
      console.log('allCompleted????????', allCompleted)
      console.log('showCompleted!!!!!!!!!!!!!', showCompleted)
      if (allCompleted && !showCompleted) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      }
      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    };
    console.log('&&&&&&&&&&&&&', 'allCompleted')
    var renderMessage = () => {
      todos.forEach(function(todo){
        if (!todo.completed) {
          allCompleted = false
        };
      });
      if (allCompleted && showCompleted) {
        return (
          <p className="container__message">Nothing To Do</p>
        );
      };
    };
    return (
      <div>
        {renderMessage()}
        {renderTodos()}
      </div>
    )
  }
});

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
