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


firebaseRef.update({
  isRunning: null
});

firebaseRef.child('user/age').remove();
