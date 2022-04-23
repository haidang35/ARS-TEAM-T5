import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAM5ZAEyJsvn6Hj1Oyc68km1yGFVlyB6EQ",
    authDomain: "ars-t5.firebaseapp.com",
    databaseURL: "https://ars-t5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ars-t5",
    storageBucket: "ars-t5.appspot.com",
    messagingSenderId: "178574833191",
    appId: "1:178574833191:web:f89afa411facd1efff0002",
    measurementId: "G-34VPKV80ZE"
  };

const app = initializeApp(firebaseConfig);
// Get a reference to the database service
export const dbFirebase = getDatabase(app);