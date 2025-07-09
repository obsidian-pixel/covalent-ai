// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5t6H-5TnayerCTlkmYVzK1IBrdwas5xM",
  authDomain: "covalent-ai.firebaseapp.com",
  projectId: "covalent-ai",
  storageBucket: "covalent-ai.firebasestorage.app",
  messagingSenderId: "980686092660",
  appId: "1:980686092660:web:d759b9027016addfda1421",
  measurementId: "G-LMHZ033QSV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
