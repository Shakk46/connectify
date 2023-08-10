// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8GnHsAaAbishvA3ATgRhnAYKZUXh-L7E",
  authDomain: "kinomania-a0ebf.firebaseapp.com",
  projectId: "kinomania-a0ebf",
  storageBucket: "kinomania-a0ebf.appspot.com",
  messagingSenderId: "529963056871",
  appId: "1:529963056871:web:a1f2517b26fe12b2736c42",
  measurementId: "G-V9H3N446R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

