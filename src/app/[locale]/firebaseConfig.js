// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjBl7ligfqsG_vLZm1_Vw0T3S7L9IAA28",
  authDomain: "immersion-3a085.firebaseapp.com",
  projectId: "immersion-3a085",
  storageBucket: "immersion-3a085.appspot.com",
  messagingSenderId: "843507731830",
  appId: "1:843507731830:web:2e70589d2f4d1a6f403e57",
  measurementId: "G-EPRWKJ513H"
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
