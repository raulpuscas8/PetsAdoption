import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCKsoIx0tlq6tUs77W6tUW0F8yEJSnKYuI",
  authDomain: "petsadoption-e9f83.firebaseapp.com",
  projectId: "petsadoption-e9f83",
  storageBucket: "petsadoption-e9f83.appspot.com",
  messagingSenderId: "1031852919076",
  appId: "1:1031852919076:web:2483d7a5014152daa8cbb1",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export { firebase };
