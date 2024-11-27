import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth from Firebase
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVpI6IfS-Be5Am6ZGlFDJ68MnIjbF9wd0",
  authDomain: "vigilant-ai.firebaseapp.com",
  projectId: "vigilant-ai",
  storageBucket: "vigilant-ai.firebasestorage.app",
  messagingSenderId: "839828152267",
  appId: "1:839828152267:web:d7972a2091e424ee1da04e",
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app); // Initialize auth service
const firestore = getFirestore(app); // Initialize firestore service

// Export services to use in other files
export { auth, firestore };
