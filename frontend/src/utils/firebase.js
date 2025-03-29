// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ZU-_PUnEsRNVAhJ5HvFQ3vVCkJYiXYA",
  authDomain: "y-blogs.firebaseapp.com",
  projectId: "y-blogs",
  storageBucket: "y-blogs.firebasestorage.app",
  messagingSenderId: "761950884250",
  appId: "1:761950884250:web:8b373b850183b16c21ea23",
  measurementId: "G-L8YXTQK11P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
const provider=new GoogleAuthProvider();


export async function googleAuth() {
    try {
        let data = await signInWithPopup(auth,provider);
        // console.log(data);
        return data;
    }catch (error) {
        console.log(error );
    }
}