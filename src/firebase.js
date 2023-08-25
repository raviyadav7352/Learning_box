import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnS2Rt0JsrXSm-1Ny1zTkm0o5t7FCUs2o",
  authDomain: "pdfbank-4e54e.firebaseapp.com",
  projectId: "pdfbank-4e54e",
  storageBucket: "pdfbank-4e54e.appspot.com",
  messagingSenderId: "360525558927",
  appId: "1:360525558927:web:9e71af003b3cd7b881ecfa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage
const analytics = getAnalytics(app);

export { app, db, storage };
