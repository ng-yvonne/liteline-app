// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCW0LqZV_YIZH7cGPcPVedsmeZD6kgH1EQ",
  authDomain: "chatroom-12a26.firebaseapp.com",
  projectId: "chatroom-12a26",
  storageBucket: "chatroom-12a26.appspot.com",
  messagingSenderId: "737305268555",
  appId: "1:737305268555:web:73bcec8d8f704400f998ce",
  measurementId: "G-9Y8DKECZK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);