import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,  //can hide with env variables
    authDomain: "catch-of-the-day-rogerh.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-rogerh.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export {firebaseApp};

//This is a default export
export default base;