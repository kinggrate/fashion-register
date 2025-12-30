// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHAtu5rORx3PqacpK2Gm1bqGCkxxwdm6s",
  authDomain: "sonaldesignerboutique-f87ba.firebaseapp.com",
  projectId: "sonaldesignerboutique-f87ba",
  storageBucket: "sonaldesignerboutique-f87ba.firebasestorage.app",
  messagingSenderId: "162041373970",
  appId: "1:162041373970:web:c0bc48d2c98190f596ffcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore reference
