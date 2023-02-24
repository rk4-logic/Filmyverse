// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhseiq1wueUDejDQcS2pFVT3tIcPQwjEA",
  authDomain: "fimyverse.firebaseapp.com",
  projectId: "fimyverse",
  storageBucket: "fimyverse.appspot.com",
  messagingSenderId: "16661172711",
  appId: "1:16661172711:web:d342a95181bede1b54ad42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsref = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;

