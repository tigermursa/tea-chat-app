// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI-_DEWnow7KXg5HZZkAyXJW0DbkTPsxM",
  authDomain: "tea-chat-d0a15.firebaseapp.com",
  projectId: "tea-chat-d0a15",
  storageBucket: "tea-chat-d0a15.appspot.com",
  messagingSenderId: "905671623216",
  appId: "1:905671623216:web:e8d784b97495baf06ba3f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;

// there change for uploading image after getting the config from firebase
// 1.add import { getStorage } from "firebase/storage";
// 2.export const storage = getStorage();
// 3.export default app;
// 4.add to env
