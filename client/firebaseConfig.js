// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAg3GLged2o7Nd1TSPfTiY3TUltEkVb3jg",
    authDomain: "shoplocally-ed2ae.firebaseapp.com",
    projectId: "shoplocally-ed2ae",
    storageBucket: "shoplocally-ed2ae.firebasestorage.app",
    messagingSenderId: "979291022855",
    appId: "1:979291022855:web:9834a142b03caa5ee2eca2",
    measurementId: "G-4CB0B4CEN9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
