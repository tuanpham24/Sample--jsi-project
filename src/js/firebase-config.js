
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJXKaXEWcAU9vo5MRb1dS-4BWW5pQ3c9U",
  authDomain: "test-eda03.firebaseapp.com",
  projectId: "test-eda03",
  storageBucket: "test-eda03.appspot.com",
  messagingSenderId: "230330664109",
  appId: "1:230330664109:web:29944231b86bb34d59b224",
  measurementId: "G-NW6QKVP56N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
