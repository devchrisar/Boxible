// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCK2C9t6ZKE5qXI8xvj-cIftRnoCu-e1OY',
  authDomain: 'boxible-3d5e8.firebaseapp.com',
  projectId: 'boxible-3d5e8',
//   storageBucket: 'boxible-3d5e8.appspot.com',
//   messagingSenderId: '235927310225',
//   appId: '1:235927310225:web:725cc2a26dfa3be6b79430',
//   measurementId: 'G-1QDCQ7QK2Q',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const func = firebase.functions();
