// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCi4btQdvbPj1l8qre-DqsVMKH1aM2Lvr0",
  authDomain: "pwa-foodninja.firebaseapp.com",
  databaseURL: "https://pwa-foodninja.firebaseio.com",
  projectId: "pwa-foodninja",
  storageBucket: "pwa-foodninja.appspot.com",
  messagingSenderId: "12058713617",
  appId: "1:12058713617:web:9d811fb6370febd7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize firestore and save it in variable
const db = firebase.firestore();
