// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN, ,
  projectId:import.meta.env.VITE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
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