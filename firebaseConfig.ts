// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6yQkpIwN2VkFzXNXwaa0kxHk6CKycmOk",
  authDomain: "hydroharmony-iot.firebaseapp.com",
  projectId: "hydroharmony-iot",
  storageBucket: "hydroharmony-iot.appspot.com",
  messagingSenderId: "484029961213",
  appId: "1:484029961213:web:94aad0170beaa577507f94",
  databaseURL: "https://hydroharmony-iot-default-rtdb.firebaseio.com"
};

// Inicializa Firebase
const appFirebase = initializeApp(firebaseConfig);

// Inicializa Auth y Realtime Database
const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

export { appFirebase, auth, database };
