import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "wpconnect-3cd79.firebaseapp.com",
  projectId: "wpconnect-3cd79",
  storageBucket: "wpconnect-3cd79.appspot.com",
  messagingSenderId: "946460906291",
  appId: "1:946460906291:web:a79f5a31f21610bad36446",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
