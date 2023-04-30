// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk1U33RIzf2csqUh3xoyDUHMMzs8AYmjs",
  authDomain: "desa-srl.firebaseapp.com",
  projectId: "desa-srl",
  storageBucket: "desa-srl.appspot.com",
  messagingSenderId: "482202974367",
  appId: "1:482202974367:web:87437589490b4c4376caaa",
  measurementId: "G-0TJLVK7SED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;