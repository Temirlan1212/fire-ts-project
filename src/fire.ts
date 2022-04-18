import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkx9MPeDQCJYZTh1sXeXPRXGKrltRmCK8",
  authDomain: "auth-40ef8.firebaseapp.com",
  databaseURL: "https://auth-40ef8-default-rtdb.firebaseio.com",
  projectId: "auth-40ef8",
  storageBucket: "auth-40ef8.appspot.com",
  messagingSenderId: "456599167506",
  appId: "1:456599167506:web:ced2380f2f024f0db96ecb",
  measurementId: "G-QGJ8DD4VND",
};

const fire = firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const auth = firebase.auth();

// export { db, auth };

export default fire;
