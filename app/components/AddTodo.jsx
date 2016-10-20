var React = require('react');

var AddTodo = React.createClass({
  onFormSubmit: function (e) {
    e.preventDefault();

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    };

  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="todoText" placeholder="Enter a todo"/>
          <button className="button expanded">Enter</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;
