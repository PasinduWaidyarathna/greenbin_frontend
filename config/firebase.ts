import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg85akr0Yz5mp1vUnxDCGGgt5kd7wUVG4",
  authDomain: "greenbin-72350.firebaseapp.com",
  projectId: "greenbin-72350",
  storageBucket: "greenbin-72350.firebasestorage.app",
  messagingSenderId: "1075221607262",
  appId: "1:1075221607262:web:2cce3d1da0d73b40e195cf",
  measurementId: "G-3868NNS8F6",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
