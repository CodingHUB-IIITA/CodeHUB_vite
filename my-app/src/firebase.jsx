// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZf9H7RCT6dk2grfn4CpyqnEy0DgNv72Q",
  authDomain: "codehub-403113.firebaseapp.com",
  projectId: "codehub-403113",
  storageBucket: "codehub-403113.appspot.com",
  messagingSenderId: "48349157012",
  appId: "1:48349157012:web:434c06383467397d14c681",
  measurementId: "G-CL20C4085Y",
  databaseURL: "https://codehub-403113-default-rtdb.firebaseio.com"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;