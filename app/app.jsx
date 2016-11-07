var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
// import firebase from 'app/firebase/';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/'
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
    var notesRef = firebaseRef.child(`users/${user.uid}/todos`);
    var toggleRef = firebaseRef.child(`users/${user.uid}/showCompleted`);
    var searchRef = firebaseRef.child(`users/${user.uid}/searchText`);

    var todo;
    var id;

    searchRef.on('value', (snapshot) =>{
      // console.log('value', snapshot.key, snapshot.val());
      var searchText = snapshot.val();
      store.dispatch(actions.setSearchText(searchText));
    });

    toggleRef.on('value', (snapshot) =>{
      // console.log('value', snapshot.key, snapshot.val());
      var boolean = snapshot.val();
      store.dispatch(actions.setShowCompleted(boolean));
    });

    notesRef.on('child_added', (snapshot) =>{
      // console.log('child_added', snapshot.key, snapshot.val());
      todo = snapshot.val();
      id = snapshot.key;
      store.dispatch(actions.addTodo({...todo, id}));
    });

    notesRef.on('child_changed', (snapshot) =>{
      // console.log('child_changed', snapshot.key, snapshot.val());
      id = snapshot.key;
      todo = snapshot.val();
      store.dispatch(actions.updateTodo(id, todo));
    });

    notesRef.on('child_removed', (snapshot) =>{
      // console.log('child_removed', snapshot.key, snapshot.val());
      id = snapshot.key
      store.dispatch(actions.deleteTodo(id));
    });

  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});



// Load foundations
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>,
    document.getElementById('app')
);
