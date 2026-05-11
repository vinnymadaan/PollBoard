import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6vvW2JOT0XXQN5R3p8OgyB3j4q3J0iJs",

  authDomain:
    "pollflow-4eb98.firebaseapp.com",

  projectId: "pollflow-4eb98",

  storageBucket:
    "pollflow-4eb98.firebasestorage.app",

  messagingSenderId:
    "199412698140",

  appId:
    "1:199412698140:web:06e599e3d5376d58c5a3d9",
};

const app =
  initializeApp(firebaseConfig);

export const auth = getAuth(app);