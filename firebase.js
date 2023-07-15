// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};/*
const firebaseConfig = {
  apiKey: "AIzaSyBk1U33RIzf2csqUh3xoyDUHMMzs8AYmjs",
  authDomain: "desa-srl.firebaseapp.com",
  projectId: "desa-srl",
  storageBucket: "desa-srl.appspot.com",
  messagingSenderId: "482202974367",
  appId: "1:482202974367:web:87437589490b4c4376caaa",
  measurementId: "G-0TJLVK7SED",
};*/
//console.log(import.meta.env.VITE_API_KEY)
//console.log(firebaseConfig.apiKey)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;