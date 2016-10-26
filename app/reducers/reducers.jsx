var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};


export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];
    case 'TOGGLE_TODO':
      var updatedTodos = state.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = !todo.completed;
          todo.completedAt = todo.completed ? moment().unix() : undefined;
        };
        return todo
      });
      return updatedTodos
  default:
    return state;
  }
};

// add case for TOGGLE_TODO match item of action id
// look through array.  Find the one on the state variable.
// Set equal to opposite value.
// Also updated completedAt.  Set it to a timestamp.
// Otherwise clear it.


// handleToggle: function (id) {
//   var updatedTodos = this.state.todos.map((todo) => {
//     if (todo.id === id) {
//       todo.completed = !todo.completed;
//       todo.completedAt = todo.completed ? moment().unix() : undefined;
//     }
//     return todo;
//   });
//   this.setState({todos: updatedTodos});
// },
