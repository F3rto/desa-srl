import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBk1U33RIzf2csqUh3xoyDUHMMzs8AYmjs",
    authDomain: "desa-srl.firebaseapp.com",
    projectId: "desa-srl",
    storageBucket: "desa-srl.appspot.com",
    messagingSenderId: "482202974367",
    appId: "1:482202974367:web:87437589490b4c4376caaa",
    measurementId: "G-0TJLVK7SED"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);