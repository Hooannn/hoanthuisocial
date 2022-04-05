// Import the functions you need from the SDKs you need
import "firebase/auth";

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQGVppJnRXsxAtwPkX_0lH76H41Vg6QEQ",
  authDomain: "socialnetwork-f8365.firebaseapp.com",
  databaseURL: "https://socialnetwork-f8365-default-rtdb.firebaseio.com/",
  projectId: "socialnetwork-f8365",
  storageBucket: "socialnetwork-f8365.appspot.com",
  messagingSenderId: "791017065815",
  appId: "1:791017065815:web:19108d26398f64f9f80212"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.database("https://socialnetwork-f8365-default-rtdb.firebaseio.com/");
//const userId = firebase.auth().currentUser.uid
export default db;