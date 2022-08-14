import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlH8qT_eTjHJetnq52PsFUC6bWX27RtMM",
  authDomain: "lafa-demo.firebaseapp.com",
  projectId: "lafa-demo",
  storageBucket: "lafa-demo.appspot.com",
  messagingSenderId: "790306837549",
  appId: "1:790306837549:web:46533ecf24fa28711894a4",
  measurementId: "G-6SPFKWMBYJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// export const analytics = getAnalytics(app);