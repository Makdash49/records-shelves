import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCQ8TrtZN1cNKyu12JSkLG59dWRMmoReek",
  authDomain: "mcquillen-react-project.firebaseapp.com",
  databaseURL: "https://mcquillen-react-project.firebaseio.com",
  storageBucket: "mcquillen-react-project.appspot.com",
  messagingSenderId: "122006660498"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0'
  },
  isRunning: true,
  user: {
    name: 'Mark',
    age: 43
  }
});

// var notesRef = firebaseRef.child('notes');
//
// notesRef.on('child_added', (snapshot) =>{
//   console.log('child_added', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_changed', (snapshot) =>{
//   console.log('child_changed', snapshot.key, snapshot.val());
// });
//
// notesRef.on('child_removed', (snapshot) =>{
//   console.log('child_removed', snapshot.key, snapshot.val());
// });
//
// var newNoteRef = notesRef.push({
//   text: 'Walk the dog!'
// });
//
// console.log('Todo id', newNoteRef.key);


// Create a new variable that store refernce to todos array.
// Child added to listen for new todos added.
// Print key and value to screen
//
// Add 2 todos array with push.  Adding text property.
// Leave off all other properties.
//
// After pushing 2 new todos.  Refresh in Chrome browser.
// Make sure callback fired twice. Once for each todo item.


var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => {
  console.log('New todo added', snapshot.key, snapshot.val());
});

todosRef.push({
  text: 'Todo 1'
});

todosRef.push({
  text: 'Todo 2'
});

// ref.child(key).remove();
