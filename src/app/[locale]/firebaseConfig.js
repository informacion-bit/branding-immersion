// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBOd6cmfm5yHeBKXTSxF-qWR5LYSJ53xO8",
  authDomain: "immersion-005-7e407.firebaseapp.com",
  projectId: "immersion-005-7e407",
  storageBucket: "immersion-005-7e407.appspot.com",
  messagingSenderId: "597207730044",
  appId: "1:597207730044:web:24a1ef668c6677abe846f9",
  measurementId: "G-NXXTEYLQ3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage (safe on server)
const db = getFirestore(app);
const storage = getStorage(app);

// Conditionally initialize Analytics only in the browser
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Export instances
export { db, storage, analytics };
