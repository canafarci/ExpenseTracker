// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiOAL6UKQoz1iTanNTk3xZxU0Sp6z1FCs",
  authDomain: "expense-tracker-app-f16fa.firebaseapp.com",
  databaseURL:
    "https://expense-tracker-app-f16fa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expense-tracker-app-f16fa",
  storageBucket: "expense-tracker-app-f16fa.appspot.com",
  messagingSenderId: "546811591546",
  appId: "1:546811591546:web:d1e47c5d915dbf1c11b4c3",
};

// Initialize Firebase ee
const app = initializeApp(firebaseConfig);

export default app;
