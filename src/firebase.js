// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importing method -for firebase storage 
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS3SsOBECEqsPWScQ2v_N3DLNa0i92yuk",
  authDomain: "realtor-clone-react-8542a.firebaseapp.com",
  projectId: "realtor-clone-react-8542a",
  storageBucket: "realtor-clone-react-8542a.appspot.com",
  messagingSenderId: "827793020279",
  appId: "1:827793020279:web:a478f065416d0322bf3d72"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//
export const db = getFirestore();
