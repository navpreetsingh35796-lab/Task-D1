import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5wEM6w7JdOls6QPkbkJZu9aOEoYoDc8g",
  authDomain: "task-d1-773e4.firebaseapp.com",
  projectId: "task-d1-773e4",
  storageBucket: "task-d1-773e4.firebasestorage.app",
  messagingSenderId: "402620803614",
  appId: "1:402620803614:web:5b9656a708229ae9089c0f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;