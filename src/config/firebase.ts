// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtz-P_d0s7n2fWO-pK9Lh6-rGdAQLBJO8",
    authDomain: "ecommercer-app-6123a.firebaseapp.com",
    projectId: "ecommercer-app-6123a",
    storageBucket: "ecommercer-app-6123a.firebasestorage.app",
    messagingSenderId: "1027292497884",
    appId: "1:1027292497884:web:5c3a19d435249e1b3f3119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);