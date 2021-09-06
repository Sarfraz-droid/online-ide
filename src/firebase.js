import firebase  from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBT19ToczC11SXGfsevVoaSix0950Zx6u8",
  authDomain: "ide-dbb4c.firebaseapp.com",
  projectId: "ide-dbb4c",
  storageBucket: "ide-dbb4c.appspot.com",
  messagingSenderId: "297410222491",
  appId: "1:297410222491:web:c263605849df45b21f693e",
  measurementId: "G-ZPZ32SZGWJ"
};

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export default firebase;

