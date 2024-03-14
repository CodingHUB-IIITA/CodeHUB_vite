// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1XOn5GX9m4qdqpDIi1GJkHGPNqGbBtqA",
  authDomain: "codinghub-bee51.firebaseapp.com",
  projectId: "codinghub-bee51",
  storageBucket: "codinghub-bee51.appspot.com",
  messagingSenderId: "403726960938",
  appId: "1:403726960938:web:c3bb0979c95d98da443653",
  measurementId: "G-QQ443GVG6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;