// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuEbVyLTHH7ZZUA_8vEHgSq-2XyUBRpBc",
  authDomain: "danspelt-24c87.firebaseapp.com",
  projectId: "danspelt-24c87",
  storageBucket: "danspelt-24c87.appspot.com",
  messagingSenderId: "794908832130",
  appId: "1:794908832130:web:08ee89b6fd84d517a25f9b",
  measurementId: "G-SEWC05GN6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);