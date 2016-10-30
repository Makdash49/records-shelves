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
  var ref = db.ref("todos");
  ref.on("value", function(snapshot) {
    var array = Object.keys(snapshot.val());
    console.log(array);

    for (i = 0; i < array.length; i++) {


    };

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

// Get a database reference to our posts
// var db = firebase.database();
// var ref = db.ref("todos");
//
// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

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
