// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEymLYoCj5gIcmH3G9VBxmDAzj9KfJPVw",
  authDomain: "astro-authentication-f00d2.firebaseapp.com",
  projectId: "astro-authentication-f00d2",
  storageBucket: "astro-authentication-f00d2.firebasestorage.app",
  messagingSenderId: "386594872401",
  appId: "1:386594872401:web:5f510bf5d9607c862bac70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const firebase= {
    app,
    auth,
};