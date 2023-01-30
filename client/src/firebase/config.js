import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUcaReVEINh5sSefwFHtCRXtrMGmaADtk",
  authDomain: "jobcircle-f62ce.firebaseapp.com",
  projectId: "jobcircle-f62ce",
  storageBucket: "jobcircle-f62ce.appspot.com",
  messagingSenderId: "537164664590",
  appId: "1:537164664590:web:b48f4fe1e5aa66b37bd15f",
  measurementId: "G-19233VGDD5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app