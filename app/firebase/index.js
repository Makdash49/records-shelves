import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyCQ8TrtZN1cNKyu12JSkLG59dWRMmoReek",
    authDomain: "mcquillen-react-project.firebaseapp.com",
    databaseURL: "https://mcquillen-react-project.firebaseio.com",
    storageBucket: "mcquillen-react-project.appspot.com",
    messagingSenderId: "122006660498"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
