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
    var notesRef = firebaseRef.child(`users/${user.uid}/todos`)

    notesRef.on('child_added', (snapshot) =>{
      console.log('child_added', snapshot.key, snapshot.val());
      var todo = snapshot.val();
      var id = snapshot.key;
      store.dispatch(actions.addTodo({...todo, id}));
    });

    notesRef.on('child_changed', (snapshot) =>{
      console.log('child_changed', snapshot.key, snapshot.val());
      // store.dispatch(actions.startAddTodos());

    });

    notesRef.on('child_removed', (snapshot) =>{
      console.log('child_removed', snapshot.key, snapshot.val());
      // store.dispatch(actions.startAddTodos());

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
