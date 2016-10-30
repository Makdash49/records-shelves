import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase/'

var db = firebase.database();

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }))
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var ref = db.ref("todos");
    var todosObject = {};
    var keysArray = [];
    var newObjectsArray = []

    ref.on("value", function(snapshot) {
      todosObject = snapshot.val();
      keysArray = Object.keys(snapshot.val());

      for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i];
        var oneTodo = todosObject[key];

        var updatedTodo = {
          ...oneTodo,
          id: keysArray[i]
        };
        newObjectsArray.push(updatedTodo);
      };
      console.log(newObjectsArray)
      return dispatch(addTodos(newObjectsArray));
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    };
  };


// fill this out. quirk. How data comes back from firebase.
// We get back object, with random id, text, and so on.
// Our application expects an array of objects, with ID property.
// Get Id from key to the value.
//
// Object.keys(todo) returns an array.



export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };
    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};
