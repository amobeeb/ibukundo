import 'firebase/firestore'
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDZM9Q0-fQxOWvhivxD0FC88ZJlzw33Zvw",
    authDomain: "ibukundo.firebaseapp.com",
    databaseURL: "https://ibukundo.firebaseio.com",
    projectId: "ibukundo",
    storageBucket: "ibukundo.appspot.com",
    messagingSenderId: "943794869859",
    appId: "1:943794869859:web:4499f327b8ba1ff7a28a56",
    measurementId: "G-81VJ8J27TS"
  };
 

 // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);