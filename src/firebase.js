// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDMtTGrRzK07ZwuqTQ-Gx3YxMA4CY8GrJc",
  authDomain: "financely-app-4280f.firebaseapp.com",
  projectId: "financely-app-4280f",
  storageBucket: "financely-app-4280f.firebasestorage.app",
  messagingSenderId: "863697929126",
  appId: "1:863697929126:web:a5046fb022b44f3a328567",
  measurementId: "G-5XN85WQ1SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };