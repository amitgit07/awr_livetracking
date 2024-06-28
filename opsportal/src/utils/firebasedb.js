// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7iAGgWt-9t69WS7HcvB0tZ-6XRqyhCHY",
    authDomain: "awrostamani-83daf.firebaseapp.com",
    projectId: "awrostamani-83daf",
    storageBucket: "awrostamani-83daf.appspot.com",
    messagingSenderId: "321075451964",
    appId: "1:321075451964:web:0b7ef8c886fd254ae48b39",
    measurementId: "G-RP946EBCDT",
};

const app = initializeApp(firebaseConfig);
const firebasedb = getFirestore(app);

export { firebasedb };
