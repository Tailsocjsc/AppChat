import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBq3_WNQrn5QcpXRUPpZrMmIhYTC9vL-FE",
    // authDomain: "PROJECT_ID.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://appchat-a1944-default-rtdb.firebaseio.com/",
    projectId: "appchat-a1944",
    // storageBucket: "PROJECT_ID.appspot.com",
    // messagingSenderId: "SENDER_ID",
    appId: "1:32676529111:android:671730482d61890cd3c192",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
  };
  
export default firebase.initializeApp(firebaseConfig)