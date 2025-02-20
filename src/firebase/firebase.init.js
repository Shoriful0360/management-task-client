// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9GowbFzGakS-KNzp1nRbmr2pqzKDxpB4",
  authDomain: "task-management-4ba72.firebaseapp.com",
  projectId: "task-management-4ba72",
  storageBucket: "task-management-4ba72.firebasestorage.app",
  messagingSenderId: "11485158407",
  appId: "1:11485158407:web:5d23f5cd53a40f84cb5ea2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);