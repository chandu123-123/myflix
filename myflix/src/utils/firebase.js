// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(process.env.REACT_APP_FIREBASE_API + "ds");
const firebaseConfig = {
  apiKey: "AIzaSyCxGZVlLzDVOV_LXpR-R54eBUD-NAowQBc",
  authDomain: "myflix-c51f7.firebaseapp.com",
  projectId: "myflix-c51f7",
  storageBucket: "myflix-c51f7.appspot.com",
  messagingSenderId: "241030000611",
  appId: "1:241030000611:web:2c78b64d1897788de8bad6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
