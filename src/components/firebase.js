import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-SPZv8Xd7Dc5PLnJ6kvdTu5e1PFy6f_s",
  authDomain: "sportsduniya-assignment.firebaseapp.com",
  projectId: "sportsduniya-assignment",
  storageBucket: "sportsduniya-assignment.firebasestorage.app",
  messagingSenderId: "767078260483",
  appId: "1:767078260483:web:4e9a99d66e729dfe3b5336",
  measurementId: "G-N6YL6Z4CGR"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore with the app instance
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
