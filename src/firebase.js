import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyBvJUTfvuoyhzV5o-0RBaZswkPv7RDmfUo",
  authDomain: "testtesttestaaa-37182.firebaseapp.com",
  databaseURL: "https://testtesttestaaa-37182.firebaseio.com",
  projectId: "testtesttestaaa-37182",
  storageBucket: "testtesttestaaa-37182.appspot.com",
  messagingSenderId: "182294101262",
  appId: "1:182294101262:web:a78f8f55c315ce9086eb5f"
};

firebase.initializeApp(firebaseConfig);

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 100
};

remoteConfig.fetchAndActivate("test").then(() => {
  console.log(remoteConfig.getNumber("vertion"));
  console.log(JSON.parse(remoteConfig.getString("test")));
});

export default firebase;
