import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATKiAOpakwSsUJDIr_5W44OcbzOgFa_UU",
  authDomain: "e-commerce-21e16.firebaseapp.com",
  projectId: "e-commerce-21e16",
  storageBucket: "e-commerce-21e16.firebasestorage.app",
  messagingSenderId: "1074537536954",
  appId: "1:1074537536954:web:088885c628c158bcef5183",
  measurementId: "G-0YTGTKW4JE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;