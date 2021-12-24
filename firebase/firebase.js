// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "uitest-caad1.firebaseapp.com",
    projectId: "uitest-caad1",
    storageBucket: "uitest-caad1.appspot.com",
    messagingSenderId: "821503931708",
    appId: "1:821503931708:web:59150d85d7f784d3141a39",
    measurementId: "G-5142BJMM68"

    /*apiKey: 'AIzaSyBmkXi9IiO_VCWVHLauw8-sF_RRJyM9F3w',
    authDomain: 'spenden-lauf.firebaseapp.com',
    databaseURL: 'https://spenden-lauf.firebaseio.com',
    projectId: 'spenden-lauf',
    storageBucket: 'spenden-lauf.appspot.com',
    messagingSenderId: '849814313937'*/

};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

const firestore = firebase.firestore()

export { auth, firestore };
