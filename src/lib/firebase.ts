import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDePGF2Y96KdPFb14Ym7HZzfeO3VqJ2pzo",
  authDomain: "cekilis-28bb9.firebaseapp.com",
  databaseURL: "https://cekilis-28bb9-default-rtdb.firebaseio.com",
  projectId: "cekilis-28bb9",
  storageBucket: "cekilis-28bb9.firebasestorage.app",
  messagingSenderId: "1030448534961",
  appId: "1:1030448534961:web:d27987eb801b1dcb285990",
  measurementId: "G-KD276S34MQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);