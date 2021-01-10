import firebase from 'firebase';

/* enter your firebase info here and rename this to firebase.js */
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();