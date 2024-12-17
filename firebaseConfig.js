import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAe1FfykPGwN8pcVN5vZMn4RkzS0BVTJm0",
  authDomain: "workoutapp-cde1e.firebaseapp.com",
  projectId: "workoutapp-cde1e",
  storageBucket: "workoutapp-cde1e.appspot.com", // Fixed incorrect "app" domain in storageBucket
  messagingSenderId: "137503978383",
  appId: "1:137503978383:web:b56b164712d45211cf11fa",
};

// Initialize Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore Database
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
