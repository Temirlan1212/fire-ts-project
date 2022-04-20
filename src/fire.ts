import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

import "firebase/compat/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBIlqCoQFbQFpsRTMa_uYDVZrcq2jpPZ-M",
  authDomain: "auth-2-d5d17.firebaseapp.com",
  projectId: "auth-2-d5d17",
  storageBucket: "auth-2-d5d17.appspot.com",
  messagingSenderId: "207465770838",
  appId: "1:207465770838:web:5d34e08e44c37f049c30f7",
  measurementId: "G-C5JGKQGWSZ",
};
const fire = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const auth = firebase.auth();

// export { db, auth };

export default fire;
