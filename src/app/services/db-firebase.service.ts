import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


@Injectable({
  providedIn: 'root'
})
export class DbFirebaseService {

  constructor() { }

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebaseConfig = {
  apiKey: "AIzaSyAiPku-zuI-Q5v1dEizwEqi0uI6mjRzD_U",
  authDomain: "burguer-queen-api-client-bdf17.firebaseapp.com",
  projectId: "burguer-queen-api-client-bdf17",
  storageBucket: "burguer-queen-api-client-bdf17.appspot.com",
  messagingSenderId: "932664095195",
  appId: "1:932664095195:web:d39d79946e4cffd863f7fe",
  measurementId: "G-4M3P37EQFY"
};

// Initialize Firebase
 app = initializeApp(this.firebaseConfig);
 analytics = getAnalytics(this.app);

}
