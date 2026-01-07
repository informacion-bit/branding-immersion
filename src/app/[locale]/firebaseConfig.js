// Import the necessary functions from Firebase SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Functions to get Firestore and Storage instances
const getDb = () => getFirestore(app);
const getStorageInstance = () => getStorage(app);

// Function to get Analytics instance (only on client-side)
const getAnalyticsInstance = () => {
    if (typeof window !== 'undefined') {
        return getAnalytics(app);
    }
    return null;
}

export { app, getDb, getStorageInstance, getAnalyticsInstance };
