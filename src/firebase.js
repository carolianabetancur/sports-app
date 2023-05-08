import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAbExOveaiv1XncAPqXFcTGC-CJls1daP4",
  authDomain: "carolina-perez.firebaseapp.com",
  projectId: "carolina-perez",
  storageBucket: "carolina-perez.appspot.com",
  messagingSenderId: "711492517263",
  appId: "1:711492517263:web:33e8b7ba8cc36eff2c1ffa"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db}