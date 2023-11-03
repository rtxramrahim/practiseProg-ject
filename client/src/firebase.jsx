// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "realestate-b2d6f.firebaseapp.com",
  projectId: "realestate-b2d6f",
  storageBucket: "realestate-b2d6f.appspot.com",
  messagingSenderId: "896071327838",
  appId: "1:896071327838:web:92eb5ba38cd1aeeaa3d4cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);