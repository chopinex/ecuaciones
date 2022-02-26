import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_9iSJ4vzCAQ6dk1hcZmfRthmcJ0nhVRU",
  authDomain: "ecuaciones-e11bc.firebaseapp.com",
  projectId: "ecuaciones-e11bc",
  storageBucket: "ecuaciones-e11bc.appspot.com",
  messagingSenderId: "542836814758",
  appId: "1:542836814758:web:44e1c7b77378af7250d567",
  measurementId: "G-87NTNKZTPD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
