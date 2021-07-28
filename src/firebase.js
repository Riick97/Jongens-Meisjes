import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyBEb4L5tS2WUi0uIIBbZd-udN-8RY0Bki8",
    authDomain: "jongens-meisjes.firebaseapp.com",
    projectId: "jongens-meisjes",
    storageBucket: "jongens-meisjes.appspot.com",
    messagingSenderId: "119135922859",
    appId: "1:119135922859:web:6195abb569d1099da4a5ee",
    measurementId: "G-4V5WTPF9C2"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export let db = firebase.firestore();
export let auth = firebase.auth();
